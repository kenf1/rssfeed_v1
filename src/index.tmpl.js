import { html, md, fetchFeed, slugify } from './util.js'

const article = (entry) => {
  const title = entry.title.value
  const slug = slugify(title)
  const link = entry.links[0].href
  const timestamp = entry.updated
  const summary = entry.content.value

  return html`
    <article class="article-entry" id="${slug}">
      <h1><a href="${link}">${title}</a></h1>
      <p class="article-entry--lead">
        <a href="#${slug}" rel="noopener noreferrer">
          <time datetime="${timestamp.toISOString()}">
            ${timestamp.toISOString().substring(0, 10)}
          </time>
        </a>
      </p>
      <summary>${md(entry.content.value)}</summary>
    </article>
  `
}

const style = html`
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&display=swap');
    @import url('https://cdn.lineicons.com/2.0/LineIcons.css');
    :root {
      --palette--polar-night: #2e3440;
      --palette--snow-storm: #eceff4;
      --palette--frost: #88c0d0;
      --palette--aurora-purple: #b48ead;
      --palette--aurora-green: #a3be8c;
      --palette--aurora-yellow: #ebcb8b;
      --palette--aurora-orange: #d08770;
      --palette--aurora-red: #bf616a;

      min-height: 100%;
      background: var(--palette--polar-night);
      color: var(--palette--snow-storm);
      font-size: min(3.6vw, 16px);
      font-family: 'Work Sans', 'Open Sans', sans-serif;
      line-height: 1.5;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: none;
      color: var(--palette--aurora-green);
    }
    a:hover {
      color: var(--palette--aurora-yellow);
      opacity: 90%;
    }

    p {
      margin-block: 0.5em;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin-block: 0.5em;
      line-height: 1.2;
      letter-spacing: 0.02em;
    }

    ol,
    ul {
      margin-block: 0.5em;
      line-height: 1.2;
    }

    body {
      display: grid;
      padding: 2em;
      gap: 1em;
    }

    header {
      display: flex;
      gap: 1em;
      justify-content: space-between;
      align-items: baseline;
      font-size: 2em;
      font-weight: bold;
      letter-spacing: 0.025em;
      font-size: 1.2em;
      font-variation-settings: 'wght' 450;
    }
    header .header--title .header--title--accent {
      color: var(--palette--aurora-purple);
    }
    header .header--github a {
      color: var(--palette----palette--snow-storm);
      font-size: 1.5em;
      opacity: 75%;
    }
    header .header--github a:hover {
      opacity: 100%;
    }

    main {
      display: grid;
      gap: 1em;
      place-items: stretch;
    }

    .article-entry .article-entry--lead a {
      color: var(--palette--snow-storm);
      font-size: 0.85em;
      font-weight: 500;
      font-style: italic;
      opacity: 75%;
    }
    .article-entry .article-entry--lead a:hover {
      opacity: 100%;
    }

    .article-entry summary a {
      color: var(--palette--frost);
      line-break: anywhere;
    }

    @media (min-width: 800px) {
      :root {
        font-size: 18px;
      }
      body {
        padding: 4em;
        justify-content: center;
      }
      body > * {
        width: 600px;
        line-height: 2em;
      }
    }
  </style>
`

export default async function (_) {
  const feed = await fetchFeed(
    "https://old.reddit.com/r/tabletennis/new.rss",
    "https://github.com/osmoscraft/osmosfeed/releases.atom",
  )

  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <title>RSS Feed</title>
        <link rel="icon" href="./favicon.png" sizes="any" />
        <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
        <link
          href="https://cdn.lineicons.com/2.0/LineIcons.css"
          rel="stylesheet"
        />
        ${style}

        <link
          rel="alternate"
          type="application/atom+xml"
          href="https://kenf1.github.io/rssfeed/feed.xml"
        />
      </head>

      <body>
        <header>
          <h1 class="header--title">
            RSS Feed
          </h1>
          <div class="header--github">
            <a
              class="lni lni-github"
              href="https://github.com/kenf1/rssfeed"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </header>

        <main>${feed.entries.map(article).join('\n')}</main>
      </body>
    </html>
  `
}
