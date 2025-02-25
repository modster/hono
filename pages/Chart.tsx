import { Hono } from "hono";
import { upgradeWebSocket } from "hono/deno";
import type { FC } from "hono/jsx";

const chart = new Hono();

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

export default function Chart({ data }) {
  useEffect(() => {
    // when Chart mounts, do this
    console.log("Chart mounted");

    // when data updates, do this
    console.log("Data updated", data);

    return () => {
      // when data updates, do this
      // before Chart unmounts, do this
    };
  }, [data]);

  return <svg className="Chart" />;
}
