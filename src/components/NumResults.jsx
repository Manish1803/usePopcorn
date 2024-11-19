export function NumResults({ movies }) {
  if (!movies || !movies.length) return null;

  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
