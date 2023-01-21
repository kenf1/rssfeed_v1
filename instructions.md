## Update Instructions

### RSS Links

Add links to the following files:

- `src/feed.xml.tmpl.js`

```
export default async function (_) {
  const feed = await fetchFeed(
    "INSERT LINK HERE",
  )
```

- `src/index.tmpl.js`

```
export default async function (_) {
  const feed = await fetchFeed(
    "INSERT LINK HERE",
  )
```

Make sure to end the line with a `,`.

### Site Title

Edit text in the `<title>` and `<h1 class="header--title">` tags in `src/index.tmpl.js` along with `<title>` tag in `src/feed.xml.tmpl.js`.

### Site Links

Edit text in `<link href=` tag in `src/feed.xml.tmpl.js` and `<a class="lni lni-github"` in `src/index.tmpl.js`.