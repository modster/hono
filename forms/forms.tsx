import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

const forms = new Hono();

forms.use(
  jsxRenderer(({ children, Layout }) => {
    return (
      <Layout>
        <div>{children}</div>
      </Layout>
    );
  }),
);

forms.get("/forms", (c) => {
  return c.html(
    <form action="/forms" method="post">
      <input type="text" name="name" />
      <input type="submit" value="Submit" />
    </form>,
  );
});

forms.post("/forms", async (c) => {
  const body = await c.req.parseBody();
  console.log(body);
  return c.json(body);
});

export default forms;
