# astro-adapter-fastify

An experimental server-side rendering adapter for use with [Fastify](https://www.fastify.io/) servers.

In your `astro.config.mjs` use:

```ts
import { defineConfig } from 'astro/config';
import fastify from 'astro-adapter-fastify';

export default defineConfig({
  adapter: fastify()
});
```

After performing a build there will be a `dist/server/entry.mjs` module that works like a handler function.
For example, you can do:

```ts
import path from 'path';
import Fastify from 'fastify';
import { handler as ssrHandler } from '../dist/server/entry.mjs';

const server = Fastify({});

const start = async () => {
  try {
    server.register(
      import('@fastify/static'),
      {
        root: path.resolve('./dist/client'),
      },
    );
    server.get('/', ssrHandler);
    await server.listen(3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
};
start();
```
