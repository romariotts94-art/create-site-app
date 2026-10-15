import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const migrationPath = new URL('./migrations/001_init.sql', import.meta.url);

export const seedProperties = [
  { id: 1, slug: 'river-line-2', title: 'River Line / 2-комнатная', deal_type: 'buy', city: 'Москва', district: 'Дорогомилово', address: 'Береговой проезд, 8', latitude: 55.747, longitude: 37.515, price_rub: 24900000, price_period: 'total', area_sqm: 58, rooms: 2, beds: 0, image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', description: 'Светлая квартира с видом на воду, спокойным двором и коротким маршрутом до центра.', amenities: ['вид на воду', 'закрытый двор', 'паркинг'] },
  { id: 2, slug: 'atelier-hamovniki', title: 'Atelier House / 3-комнатная', deal_type: 'buy', city: 'Москва', district: 'Хамовники', address: 'Усачёва, 22', latitude: 55.724, longitude: 37.565, price_rub: 42900000, price_period: 'total', area_sqm: 91, rooms: 3, beds: 0, image_url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', description: 'Архитектурная квартира для долгих завтраков, встреч и тихих вечеров.', amenities: ['высокие потолки', 'терраса', 'консьерж'] },
  { id: 3, slug: 'park-studio', title: 'Park Studio / студия', deal_type: 'buy', city: 'Москва', district: 'Раменки', address: 'Мичуринский проспект, 18', latitude: 55.691, longitude: 37.505, price_rub: 12800000, price_period: 'total', area_sqm: 34, rooms: 0, beds: 0, image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', description: 'Компактная студия рядом с парком: минимум лишнего, максимум света.', amenities: ['рядом парк', 'новый дом', 'готовая кухня'] },
  { id: 4, slug: 'patriki-long-rent', title: 'Тихая квартира у Патриарших', deal_type: 'long_rent', city: 'Москва', district: 'Пресненский', address: 'Спиридоньевский переулок, 12', latitude: 55.764, longitude: 37.592, price_rub: 185000, price_period: 'month', area_sqm: 62, rooms: 2, beds: 0, image_url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', description: 'Долгосрочная аренда в тихом переулке с готовым рабочим местом.', amenities: ['можно с животными', 'рабочее место', 'лифт'] },
  { id: 5, slug: 'sokol-long-rent', title: 'Светлая двушка у Сокола', deal_type: 'long_rent', city: 'Москва', district: 'Сокол', address: 'Ленинградский проспект, 74', latitude: 55.806, longitude: 37.512, price_rub: 120000, price_period: 'month', area_sqm: 54, rooms: 2, beds: 0, image_url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85', description: 'Тёплая квартира с быстрым доступом к метро и большим окном.', amenities: ['метро 7 минут', 'гардеробная', 'детская площадка'] },
  { id: 6, slug: 'art-weekend', title: 'Art Weekend / центр', deal_type: 'daily_rent', city: 'Москва', district: 'Арбат', address: 'Сивцев Вражек, 9', latitude: 55.749, longitude: 37.594, price_rub: 9800, price_period: 'night', area_sqm: 43, rooms: 1, beds: 1, image_url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85', description: 'Посуточная квартира для короткого города: театр, прогулка, поздний ужин.', amenities: ['самозаселение', 'кофе', 'центр'] },
  { id: 7, slug: 'water-daily', title: 'Дом у воды на выходные', deal_type: 'daily_rent', city: 'Москва', district: 'Левобережный', address: 'Ленинградское шоссе, 58', latitude: 55.870, longitude: 37.485, price_rub: 14500, price_period: 'night', area_sqm: 76, rooms: 2, beds: 2, image_url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', description: 'Пространство для перезагрузки рядом с водой, с двумя спальнями и кухней.', amenities: ['вид на воду', '2 спальни', 'поздний выезд'] }
];

export function openDatabase(dbPath) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec(fs.readFileSync(migrationPath, 'utf8'));
  seedIfEmpty(db);
  return db;
}

export function seedIfEmpty(db) {
  const count = db.prepare('SELECT COUNT(*) AS count FROM properties').get().count;
  if (Number(count) > 0) return false;
  const now = new Date().toISOString();
  const insert = db.prepare(`INSERT INTO properties (id, slug, title, deal_type, status, city, district, address, latitude, longitude, price_rub, price_period, area_sqm, rooms, beds, image_url, description, amenities_json, created_at, updated_at) VALUES (?, ?, ?, ?, 'published', 'Москва', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  db.exec('BEGIN');
  try { for (const p of seedProperties) insert.run(p.id, p.slug, p.title, p.deal_type, p.district, p.address, p.latitude, p.longitude, p.price_rub, p.price_period, p.area_sqm, p.rooms, p.beds, p.image_url, p.description, JSON.stringify(p.amenities), now, now); db.exec('COMMIT'); } catch (error) { db.exec('ROLLBACK'); throw error; }
  return true;
}

function mapProperty(row) { return { ...row, amenities: JSON.parse(row.amenities_json), amenities_json: undefined }; }

export function listProperties(db, filters = {}) {
  const where = ['status = ?']; const values = ['published'];
  if (filters.deal_type) { where.push('deal_type = ?'); values.push(filters.deal_type); }
  if (filters.q) { where.push('(title LIKE ? OR district LIKE ? OR address LIKE ?)'); const q = `%${filters.q}%`; values.push(q, q, q); }
  if (filters.max_price) { where.push('price_rub <= ?'); values.push(filters.max_price); }
  if (filters.rooms !== undefined && filters.rooms !== '') { if (Number(filters.rooms) >= 3) where.push('rooms >= ?'); else where.push('rooms = ?'); values.push(Number(filters.rooms)); }
  const limit = Math.min(Math.max(Number(filters.limit) || 30, 1), 50); values.push(limit);
  return db.prepare(`SELECT * FROM properties WHERE ${where.join(' AND ')} ORDER BY updated_at DESC, id DESC LIMIT ?`).all(...values).map(mapProperty);
}

export function getProperty(db, id) { const row = db.prepare('SELECT * FROM properties WHERE id = ? AND status = ?').get(id, 'published'); return row ? mapProperty(row) : null; }

export function createInquiry(db, input) {
  const now = new Date().toISOString();
  const result = db.prepare('INSERT INTO inquiries (property_id, name, phone, email, message, consent, status, created_at) VALUES (?, ?, ?, ?, ?, 1, \'new\', ?)').run(input.propertyId, input.name, input.phone, input.email || null, input.message || '', now);
  return { id: Number(result.lastInsertRowid), propertyId: input.propertyId, status: 'new', createdAt: now };
}

export function countInquiries(db) { return Number(db.prepare('SELECT COUNT(*) AS count FROM inquiries').get().count); }
