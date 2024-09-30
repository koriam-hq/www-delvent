import { Client, LogLevel } from "@notionhq/client";

interface Env {
  NOTION_API_KEY: string;
}

/**
 * POST /api/wait-list
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const notion = new Client({
      auth: context.env.NOTION_API_KEY,
      logLevel: LogLevel.DEBUG,
      notionVersion: "2022-06-28",
    });

    const body = await context.request.formData();
    const { first_name, last_name, email } = Object.fromEntries(body);
    console.debug({ first_name, last_name, email });

    const database = await notion.databases.retrieve({
      database_id: "11036180efa680c2a08aeecebcb32c71",
      auth: context.env.NOTION_API_KEY,
    });
    console.debug({ database });

    const page = await notion.pages.create({
      parent: { database_id: database.id, type: "database_id" },
      properties: {
        "Email Address": {
          type: "title",
          title: [
            {
              type: "text",
              text: { content: email },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
        },
        "First Name": {
          type: "rich_text",
          rich_text: [
            {
              text: { content: first_name },
              type: "text",
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
        },
        "Last Name": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: { content: last_name },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
        },
        "Waitlist Email Sent": {
          type: "checkbox",
          checkbox: false,
        },
      },
    });

    return new Response(`Form submitted - ${page.id}`, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(e.message, { status: 500 });
  }
};
