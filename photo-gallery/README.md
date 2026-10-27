# Photo Gallery

React + Vite + Tailwind CSS photo gallery using the Picsum Photos API.

## Run

```bash
npm install
npm run dev
```

## Structure

- `src/hooks/useFetchPhotos.js` – custom hook, returns `{ photos, loading, error }`
- `src/reducers/favouritesReducer.js` – `useReducer` reducer + localStorage initialiser
- `src/components/Gallery.jsx` – uses the hook, search (`useCallback` + `useMemo`), favourites
- `src/components/PhotoCard.jsx` – card with photo, author, heart button
