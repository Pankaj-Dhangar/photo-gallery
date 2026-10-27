import { useState, useReducer, useEffect, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos.js";
import {
  favouritesReducer,
  initFavourites,
  STORAGE_KEY,
  TOGGLE_FAVOURITE,
} from "../reducers/favouritesReducer.js";
import PhotoCard from "./PhotoCard.jsx";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState("");
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    initFavourites
  );

  // Save favourites to localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // useCallback: keeps the same function reference between renders,
  // so the input's handler isn't recreated every time the component re-renders.
  const handleSearch = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  // useMemo: only re-runs the filter when photos or query change,
  // not when unrelated state (like favourites) changes.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(term));
  }, [photos, query]);

  const toggleFavourite = (id) => dispatch({ type: TOGGLE_FAVOURITE, payload: id });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Photo Gallery</h1>

      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search by author name"
        aria-label="Search photos by author name"
        className="mb-6 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-slate-500 focus:outline-none sm:max-w-sm"
      />

      {loading && (
        <div className="flex justify-center py-16" role="status" aria-label="Loading photos">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
          Could not load photos: {error}. Check your connection and refresh the page.
        </p>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-8 text-slate-500">No photos match “{query}”.</p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={toggleFavourite}
            />
          ))}
        </div>
      )}
    </main>
  );
}
