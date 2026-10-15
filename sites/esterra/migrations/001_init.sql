PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  deal_type TEXT NOT NULL CHECK (deal_type IN ('buy', 'long_rent', 'daily_rent')),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  price_rub INTEGER NOT NULL CHECK (price_rub > 0),
  price_period TEXT NOT NULL CHECK (price_period IN ('total', 'month', 'night')),
  area_sqm REAL NOT NULL CHECK (area_sqm > 0),
  rooms INTEGER NOT NULL CHECK (rooms >= 0),
  beds INTEGER NOT NULL DEFAULT 0 CHECK (beds >= 0),
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  amenities_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL DEFAULT '',
  consent INTEGER NOT NULL CHECK (consent = 1),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed')),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_properties_deal_status_price ON properties(deal_type, status, price_rub);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(city, district);
CREATE INDEX IF NOT EXISTS idx_inquiries_property_created ON inquiries(property_id, created_at DESC);
