import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDatabase, seedProperties } from './db.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const db = openDatabase(path.join(here, 'data/esterra.db'));
console.log(`ESTERRA seed ready: ${seedProperties.length} published sample properties`);
db.close();
