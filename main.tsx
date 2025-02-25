/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

const app = new Hono()

const Layout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
      </head>
      <body>
        {props.children}
      </body>
    </html>)
}

const Top: FC<{ messages: string[] }> = (props: {
  messages: string[]
}) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <button hx-post="/clicked" hx-swap="outerHTML" type="button">
        Click Me
      </button>
      <ul>
        {props.messages.map((message, index) => {
          return <li key={index}>{message}!!</li>
        })}
      </ul>
    </Layout>
  )
}

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})
app.get('/clicked', (c) => {
  return c.html(<h1>hoorah!</h1>)
})
app.post('/clicked', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})
export default app