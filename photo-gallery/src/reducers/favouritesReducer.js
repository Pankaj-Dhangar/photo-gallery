export const STORAGE_KEY = "photo-gallery-favourites";

export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";

// Lazy initialiser: reads saved favourite ids from localStorage (runs once).
export function initFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// State is an array of favourited photo ids.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
}
