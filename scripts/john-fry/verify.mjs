import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const out = 'artifacts/john-fry';
fs.mkdirSync(out, { recursive: true });
const report = { status: 'BLOCKED', candidate: process.env.CANDIDATE_SHA || '', target: process.env.TARGET || '', changeId: process.env.CHANGE_ID || '', checks: [], blockers: [] };
const save = () => fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
const fail = message => { report.blockers.push(message); console.error('BLOCKED:', message); };
const excluded = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.expo', 'vendor']);
function discover(dir, depth) {
  if (depth > 3) return [];
  let result = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.isFile() && item.name === 'package.json') result.push(path.join(dir, item.name));
    if (item.isDirectory() && !excluded.has(item.name) && !item.name.startsWith('.')) result.push(...discover(path.join(dir, item.name), depth + 1));
  }
  return result;
}
function run(command, args, cwd, label, timeout = 240000) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', timeout, env: { ...process.env, CI: 'true' }, maxBuffer: 5 * 1024 * 1024 });
  const log = (result.stdout || '') + '\n' + (result.stderr || '');
  const safe = label.replace(/[^a-zA-Z0-9-]/g, '-');
  fs.writeFileSync(path.join(out, safe + '.log'), log.slice(-500000));
  const passed = result.status === 0 && !result.error;
  report.checks.push({ label, passed, exitCode: result.status, error: result.error?.message });
  if (!passed) fail(label + ' failed; see attached log');
  return passed;
}
try {
  const packages = discover('.', 0);
  report.packages = packages;
  if (packages.length === 0) fail('No package.json found within four directory levels; project build not configured');
  const roots = packages.filter(p => !p.includes('/examples/') && !p.includes('/fixtures/') && !p.includes('/templates/'));
  const eligible = [];
  for (const file of roots) {
    let pkg;
    try { pkg = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { fail('Invalid package.json: ' + file); continue; }
    if (!pkg.scripts || !pkg.scripts.build) continue;
    eligible.push({ file, pkg });
  }
  if (!eligible.length) fail('No build-capable app package identified. Configure explicit app roots and commands.');
  if (eligible.length > 3) fail('Multiple build-capable packages detected; select explicit targets to prevent expensive/incorrect builds');
  for (const { file, pkg } of eligible.slice(0, 3)) {
    const cwd = path.dirname(path.resolve(file));
    const label = path.dirname(file).replace(/[^a-zA-Z0-9]/g, '-') || 'root';
    if (!fs.existsSync(path.join(cwd, 'package-lock.json'))) {
      fail(file + ': npm lockfile missing; cannot use reproducible npm ci. Configure its actual package manager.');
      continue;
    }
    if (!run('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], cwd, label + '-install')) continue;
    for (const script of ['lint', 'typecheck', 'test', 'build']) {
      if (pkg.scripts[script]) run('npm', ['run', script, '--', ...(script === 'test' ? ['--run'] : [])], cwd, label + '-' + script);
      else if (script === 'test' || script === 'build') fail(file + ': required ' + script + ' script missing');
    }
  }
  fail('Visual Playwright E2E, security scanning, isolated staging URL and independent Art Director review not yet integrated; cannot approve release');
  report.status = report.blockers.length ? 'BLOCKED' : 'PASS';
} catch (error) { fail('Unexpected verification error: ' + String(error)); }
finally { save(); }
if (report.status !== 'PASS') process.exitCode = 1;
