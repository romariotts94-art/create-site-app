import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createApp } from '../server.mjs';
import { countInquiries } from '../db.mjs';

async function runningServer() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'esterra-'));
  const dbPath = path.join(directory, 'esterra.db');
  const server = createApp({ dbPath, staticRoot: path.resolve('dist') });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  return { server, dbPath, base: `http://127.0.0.1:${address.port}` };
}

test('health and seeded property list are available', async () => {
  const app = await runningServer();
  try {
    const health = await fetch(`${app.base}/api/esterra/health`);
    assert.equal(health.status, 200);
    assert.deepEqual((await health.json()).database, 'sqlite');
    const response = await fetch(`${app.base}/api/esterra/properties?deal_type=buy&max_price=30000000`);
    const payload = await response.json();
    assert.equal(response.status, 200);
    assert.ok(payload.data.length >= 1);
    assert.ok(payload.data.every(item => item.deal_type === 'buy' && item.price_rub <= 30000000));
  } finally { app.server.close(); app.server.db.close(); }
});

test('property detail and missing object states are correct', async () => {
  const app = await runningServer();
  try {
    const found = await fetch(`${app.base}/api/esterra/properties/1`);
    assert.equal(found.status, 200);
    assert.equal((await found.json()).data.id, 1);
    const missing = await fetch(`${app.base}/api/esterra/properties/9999`);
    assert.equal(missing.status, 404);
  } finally { app.server.close(); app.server.db.close(); }
});

test('invalid inquiry is rejected and valid inquiry persists', async () => {
  const app = await runningServer();
  try {
    const invalid = await fetch(`${app.base}/api/esterra/inquiries`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ propertyId: 1, name: 'A', phone: 'bad', consent: false }) });
    assert.equal(invalid.status, 422);
    const valid = await fetch(`${app.base}/api/esterra/inquiries`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ propertyId: 1, name: 'Роман', phone: '+7 999 000-00-00', email: 'roman@example.com', message: 'Хочу узнать про просмотр.', consent: true }) });
    const payload = await valid.json();
    assert.equal(valid.status, 201);
    assert.ok(payload.data.id > 0);
    assert.equal(countInquiries(app.server.db), 1);
  } finally { app.server.close(); app.server.db.close(); }
});

test('inquiry remains after reopening the same SQLite database', async () => {
  const app = await runningServer();
  const body = { propertyId: 2, name: 'Анна', phone: '+7 900 000-00-00', consent: true };
  try { const response = await fetch(`${app.base}/api/esterra/inquiries`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }); assert.equal(response.status, 201); } finally { await new Promise(resolve => app.server.close(resolve)); app.server.db.close(); }
  const reopened = createApp({ dbPath: app.dbPath, staticRoot: path.resolve('dist') });
  try { assert.equal(countInquiries(reopened.db), 1); } finally { reopened.db.close(); }
});

test('static catalog and ESTERRA routes are served by the integrated server', async () => {
  const app = await runningServer();
  try {
    const catalog = await fetch(`${app.base}/index.html`);
    const site = await fetch(`${app.base}/esterra/index.html`);
    const catalogMarkup = await catalog.text();
    assert.equal(catalog.status, 200);
    assert.match(catalogMarkup, /href="\.\/esterra\/index\.html"/);
    assert.match(catalogMarkup, />ESTERRA<\/h3>/);
    assert.equal(site.status, 200);
    assert.match(await site.text(), /ESTERRA/);
  } finally { app.server.close(); app.server.db.close(); }
});
