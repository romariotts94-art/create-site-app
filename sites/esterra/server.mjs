import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDatabase, listProperties, getProperty, createInquiry } from './db.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultStaticRoot = path.resolve(here, '../../dist');
const defaultDbPath = path.resolve(here, 'data/esterra.db');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

function json(res, status, payload) { const body = JSON.stringify(payload); res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(body); }
function readBody(req) { return new Promise((resolve, reject) => { let raw = ''; req.on('data', chunk => { raw += chunk; if (raw.length > 10000) req.destroy(new Error('Payload too large')); }); req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(Object.assign(new Error('Invalid JSON'), { status: 400 })); } }); req.on('error', reject); }); }
function validInquiry(input) { const errors = {}; if (!Number.isInteger(Number(input.propertyId))) errors.propertyId = 'Выберите объект.'; if (typeof input.name !== 'string' || input.name.trim().length < 2 || input.name.trim().length > 80) errors.name = 'Имя должно содержать от 2 до 80 символов.'; if (typeof input.phone !== 'string' || !/^\+?[0-9 ()-]{10,20}$/.test(input.phone.trim())) errors.phone = 'Укажите корректный телефон.'; if (input.email && (typeof input.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))) errors.email = 'Укажите корректный email.'; if (input.message !== undefined && (typeof input.message !== 'string' || input.message.length > 1000)) errors.message = 'Сообщение слишком длинное.'; if (input.consent !== true) errors.consent = 'Нужно согласие на обработку заявки.'; return errors; }

export function createApp({ dbPath = defaultDbPath, staticRoot = defaultStaticRoot } = {}) {
  const db = openDatabase(dbPath);
  const inquiryRate = new Map();
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname.startsWith('/api/esterra/')) {
        if (req.method === 'GET' && url.pathname === '/api/esterra/health') return json(res, 200, { ok: true, service: 'esterra-api', database: 'sqlite' });
        if (req.method === 'GET' && url.pathname === '/api/esterra/properties') return json(res, 200, { data: listProperties(db, { deal_type: url.searchParams.get('deal_type') || '', q: url.searchParams.get('q') || '', max_price: url.searchParams.get('max_price') || '', rooms: url.searchParams.get('rooms') || '', limit: url.searchParams.get('limit') || '' }) });
        const match = url.pathname.match(/^\/api\/esterra\/properties\/(\d+)$/);
        if (req.method === 'GET' && match) { const item = getProperty(db, Number(match[1])); return item ? json(res, 200, { data: item }) : json(res, 404, { error: 'Объект не найден.' }); }
        if (req.method === 'POST' && url.pathname === '/api/esterra/inquiries') { const origin = req.headers.origin; if (origin && new URL(origin).host !== req.headers.host) return json(res, 403, { error: 'Недопустимый источник запроса.' }); const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim(); const now = Date.now(); const recent = (inquiryRate.get(ip) || []).filter(time => now - time < 10 * 60 * 1000); if (recent.length >= 10) return json(res, 429, { error: 'Слишком много заявок. Попробуйте позже.' }); inquiryRate.set(ip, [...recent, now]); let input; try { input = await readBody(req); } catch (error) { return json(res, error.status || 400, { error: error.message }); } const errors = validInquiry(input); const property = getProperty(db, Number(input.propertyId)); if (!property) errors.propertyId = 'Объект недоступен.'; if (Object.keys(errors).length) return json(res, 422, { error: 'Проверьте форму.', fields: errors }); const inquiry = createInquiry(db, { ...input, propertyId: property.id, name: input.name.trim(), phone: input.phone.trim(), email: input.email?.trim(), message: input.message?.trim() }); return json(res, 201, { data: inquiry }); }
        return json(res, 404, { error: 'API route not found.' });
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Method not allowed.' });
      let relative = decodeURIComponent(url.pathname.replace(/^\/+/, '')) || 'index.html';
      if (relative.endsWith('/')) relative += 'index.html';
      const file = path.resolve(staticRoot, relative);
      if (!file.startsWith(path.resolve(staticRoot) + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return json(res, 404, { error: 'Page not found.' });
      res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(file).pipe(res);
    } catch (error) { json(res, 500, { error: 'Внутренняя ошибка сервиса.' }); }
  });
  server.db = db;
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) { const port = Number(process.env.PORT || 4175); const server = createApp(); server.listen(port, () => console.log(`ESTERRA listening on http://127.0.0.1:${port}/esterra/`)); }
