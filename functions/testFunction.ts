// interface Env {
//     KV: KVNamespace;
//   }
  
  export const onRequest: PagesFunction<Env> = async (context) => {
    //const value = await context.env.KV.get("example");
    const value = "Hello, world!";
    return new Response(value);
  };