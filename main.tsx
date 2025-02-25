import { Hono } from "hono";
import { upgradeWebSocket } from "hono/deno";
import type { FC } from "hono/jsx";
import forms from "./forms/forms.tsx";
import type { Context } from "hono";

const home = new Hono().basePath("/");

const Layout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>HTMX + HONO + DENO</title>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
        <link href="/dist/styles.css" rel="stylesheet" />
      </head>
      <body class="bg-slate-900 text-sky-50 font-serif p-4">
        <div class="size-full b-slate-900">
          {props.children}
        </div>
      </body>
    </html>
  );
};

const Hoorah: FC<{ htmxEl: string }> = ({ htmxEl }) => {
  return (
    <Layout>
      <button hx-post="/clicked" hx-swap="outerHTML" type="button">
        {htmxEl}
      </button>
    </Layout>
  );
};

home.get("/", (c) => {
  const htmxEl = "Click Me";
  return c.html(<Hoorah htmxEl={htmxEl} />);
});

home.get("/clicked", (c) => {
  const htmxEl = "Good Evening";
  return c.html(<Hoorah htmxEl={htmxEl} />);
});

home.post("/clicked", (c) => {
  const htmxEl = "Good Morning";
  return c.html(
    <button hx-get="/" hx-swap="outerHTML" type="button">
      {htmxEl}
    </button>,
  );
});

home.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  }),
);

const notFound = (c: Context) => {
  return c.text("404 Not Found", 404);
};

const app = new Hono();

app.route("/", home);

app.route("/", forms);

app.all("*", notFound);
export default app;
