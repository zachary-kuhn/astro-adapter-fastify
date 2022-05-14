import type { SSRManifest } from 'astro';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { NodeApp } from 'astro/app/node';
import { polyfill } from '@astrojs/webapi';

polyfill(globalThis, {
	exclude: 'window document',
});

export function createExports(manifest: SSRManifest) {
	const app = new NodeApp(manifest);
	return {
    async handler(req: FastifyRequest, reply: FastifyReply) {
      const route = app.match(req.raw);

      if (route) {
        const response = await app.render(req.raw);

        reply.status(response.status);
        reply.headers(Object.fromEntries(response.headers.entries()));

        return response.body;
      }

      reply.status(404);
    },
	};
}
