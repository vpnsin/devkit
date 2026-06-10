import { Router } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

export const healthRouter = Router();

let version = 'unknown';
try {
  const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
  version = pkg.version;
} catch {
  // Fallback if package.json not found
}

healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', version, uptime: process.uptime() });
});
