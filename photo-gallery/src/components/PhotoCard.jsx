export default function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="aspect-[4/3] w-full bg-slate-200 object-cover"
      />
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <p className="truncate text-sm font-medium">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className="rounded-full p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${
              isFavourite
                ? "fill-rose-500 stroke-rose-500"
                : "fill-none stroke-slate-400 hover:stroke-rose-500"
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
