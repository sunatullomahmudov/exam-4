import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
export function applicationsPlugin() {
  let queue = Promise.resolve();
  let root;
  function middleware(request, response, next) {
    if (request.url?.split('?')[0] !== '/api/applications') return next();
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (request.method !== 'POST') {
      response.statusCode = 405;
      response.end(JSON.stringify({ error: 'Метод не поддерживается' }));
      return;
    }
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 16384) {
        response.statusCode = 413;
        response.end(JSON.stringify({ error: 'Слишком большой запрос' }));
        request.destroy();
      }
    });
    request.on('end', async () => {
      if (response.writableEnded) return;
      try {
        const data = JSON.parse(body);
        const phone = String(data.phone || '').trim();
        if (!/^[+0-9 ()-]{10,22}$/.test(phone) || phone.replace(/\D/g, '').length < 10) {
          response.statusCode = 400;
          response.end(JSON.stringify({ error: 'Некорректный номер телефона' }));
          return;
        }
        const record = {
          id: randomUUID().slice(0, 8),
          createdAt: new Date().toISOString(),
          name: String(data.name || '').slice(0, 80),
          phone,
          kind: String(data.kind || 'Заявка').slice(0, 100),
          carId: data.carId || null,
          details: data.details || {},
          gift: data.gift || null,
          message: String(data.message || '').slice(0, 1000),
        };
        const task = queue
          .catch(() => {})
          .then(async () => {
            const directory = join(root, 'server', 'data');
            const filename = join(directory, 'applications.json');
            await mkdir(directory, { recursive: true });
            let list = [];
            try {
              list = JSON.parse(await readFile(filename, 'utf8'));
            } catch (error) {
              if (error.code !== 'ENOENT') throw error;
            }
            list.push(record);
            await writeFile(filename + '.tmp', JSON.stringify(list, null, 2), 'utf8');
            await rename(filename + '.tmp', filename);
          });
        queue = task;
        await task;
        response.statusCode = 201;
        response.end(JSON.stringify({ id: record.id }));
      } catch {
        response.statusCode = 500;
        response.end(JSON.stringify({ error: 'Не удалось сохранить заявку' }));
      }
    });
  }
  return {
    name: 'local-applications-api',
    configResolved(config) {
      root = config.root;
    },
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
