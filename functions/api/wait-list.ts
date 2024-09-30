import { Client } from "@notionhq/client";

interface Env {
  NOTION_API_KEY: string;
}

/**
 * POST /api/wait-list
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    console.debug({ context });
    console.debug({ NOTION_API_KEY: context.env.NOTION_API_KEY });
    const notion = new Client({ auth: context.env.NOTION_API_KEY });

    const body = await context.request.formData();
    const { first_name, last_name, email } = Object.fromEntries(body);
    console.debug({ first_name, last_name, email });

    const user = await notion.users.list({});
    console.debug({ user });

    // const database = await notion.databases.retrieve({
    //   database_id: "11036180efa680c2a08aeecebcb32c71",
    // });
    // console.debug({ database });

    return new Response("No Response", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(e.message, { status: 500 });
  }
};
