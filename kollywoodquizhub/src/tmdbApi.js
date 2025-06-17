//
// TMDB API Utility for KollywoodQuizHub
//
// Provides reusable functions for interacting with TheMovieDB API.
// Designed for fetching Kollywood (Tamil) movie data with error handling.
//

// Note: In a production build, API keys shouldn't be hardcoded. 
// For frontend-only projects or public APIs, this can suffice, but consider .env files or server proxies for sensitive keys.

// PUBLIC_INTERFACE
/** Fetch Kollywood (Tamil-language) movies using TMDB API.
 *  Parameters are optional.
 *  @param {Object} options - { page?: number, query?: string }
 *  @returns {Promise<Object>} TMDB API response.
 */
export async function fetchKollywoodMovies(options = {}) {
  // Tamil language: "ta", region: "IN", sort by popularity, genre whitelisting is optional.
  const apiBase = "https://api.themoviedb.org/3";
  const endpoint = options.query
    ? "/search/movie"
    : "/discover/movie";

  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: "ta",        // Tamil
    region: "IN",
    sort_by: "popularity.desc",
    with_original_language: "ta", // Tamil original language
    include_adult: "false",
    page: options.page || 1,
  });

  // If searching, add the query
  if (options.query) {
    params.set("query", options.query);
  }

  // To include only movies (not TV shows)
  // Optionally, can filter by genre (Kollywood = Tamil cinema, not a fixed TMDB genre!)
  // You can use genre IDs if wanting to only show Indian movies, but language is best proxy here.

  const url = `${apiBase}${endpoint}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    // Could set up centralized error reporting/logging if desired.
    console.error("[TMDB API] Failed to fetch Kollywood movies:", err);
    return { error: err.message };
  }
}

// --- Private: API Key (abstract from direct UI use)
const TMDB_API_KEY = "5bc67d3b06aecbd18121a3cbbc16eb59";
