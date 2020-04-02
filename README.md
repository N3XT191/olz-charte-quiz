unzip map.zip -> put maps/ in public/

run `npm i` to install dependencies

in `src/constants.tsx` set baseURL to `http://localhost:5000/` (or change port if needed. (This is the clients baseURL)

Only change serverURL if using own server (default is `http://localhost:3000`)

To change styles, change/append the `const styles` object in `App.tsx`, `CreateGame.tsx`, `Play.tsx` and `Ranking.tsx`

Apply styles to a div by adding `{...styles.property}`
