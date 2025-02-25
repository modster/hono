import { Hono } from "hono";
import { upgradeWebSocket } from "hono/deno";

export function AsyncComponent() {
  return (
    <div>
      <h1>Async Component</h1>
    </div>
  );
}
