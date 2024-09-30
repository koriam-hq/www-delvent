interface Env {
  // KV: KVNamespace;
}

export default {
  async fetch(request): Promise<Response> {
    const req = new URL(request.url);
    const value = `Hello, ${req.hostname}`;
    return new Response(value);
  },
} satisfies ExportedHandler;
