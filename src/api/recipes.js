const MEAL_BASE = 'https://www.themealdb.com/api/json/v1/1';
const COCKTAIL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1';

const EXCLUDE_FROM_MAIN = new Set(['Breakfast', 'Dessert', 'Side']);

// ─── In-memory cache ──────────────────────────────────────────────────────────
// Keyed by "meal-{id}" or "cocktail-{id}" for detail lookups,
// and "list-{type}-{key}" for filtered lists.
// Cleared when the app restarts — intentional, keeps data reasonably fresh.

const cache = new Map();

function cacheGet(key) {
  return cache.get(key) ?? null;
}

function cacheSet(key, value) {
  cache.set(key, value);
  return value;
}

// ─── Normalizers ──────────────────────────────────────────────────────────────

export function normalizeMeal(meal) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory ?? '',
    area: meal.strArea ?? '',
    thumb: meal.strMealThumb ?? null,
    source: 'meal',
  };
}

export function normalizeDrink(drink) {
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    category: drink.strCategory ?? '',
    area: drink.strAlcoholic ?? '',
    thumb: drink.strDrinkThumb ?? null,
    source: 'cocktail',
  };
}

// ─── Detail fetches (cached) ──────────────────────────────────────────────────

export async function fetchMealById(id) {
  const key = `meal-${id}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  const res = await fetch(`${MEAL_BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals?.[0] ?? null;

  if (meal) cacheSet(key, meal);
  return meal;
}

export async function fetchDrinkById(id) {
  const key = `cocktail-${id}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  const res = await fetch(`${COCKTAIL_BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  const drink = data.drinks?.[0] ?? null;

  if (drink) cacheSet(key, drink);
  return drink;
}

// ─── List fetches (cached) ────────────────────────────────────────────────────

export async function fetchByMealCategory(category) {
  const key = `list-cat-${category}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  const res = await fetch(
    `${MEAL_BASE}/filter.php?c=${encodeURIComponent(category)}`,
  );
  const data = await res.json();
  const list = (data.meals ?? [])
    .slice(0, 30)
    .map(m => ({ ...normalizeMeal(m), category }));

  return cacheSet(key, list);
}

export async function fetchByMealArea(area) {
  const key = `list-area-${area}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  const res = await fetch(
    `${MEAL_BASE}/filter.php?a=${encodeURIComponent(area)}`,
  );
  const data = await res.json();
  const list = (data.meals ?? [])
    .slice(0, 30)
    .map(m => ({ ...normalizeMeal(m), area }));

  return cacheSet(key, list);
}

export async function fetchMainMeals(sliceOffset = 0) {
  // Cache each offset separately (Lunch vs Dinner)
  const key = `list-main-${sliceOffset}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  const catRes = await fetch(`${MEAL_BASE}/categories.php`);
  const catData = await catRes.json();
  const validCats = (catData.categories ?? [])
    .map(c => c.strCategory)
    .filter(c => !EXCLUDE_FROM_MAIN.has(c));

  const picked = validCats.sort(() => 0.5 - Math.random()).slice(0, 6);
  const pools = await Promise.all(picked.map(c => fetchByMealCategory(c)));
  const all = pools.flat().sort(() => 0.5 - Math.random());
  const list = all.slice(sliceOffset, sliceOffset + 30);

  return cacheSet(key, list);
}

// ─── Random fetches (not cached — intentionally fresh each session) ───────────

export async function fetchRandomMeals(count = 5) {
  const promises = Array.from({ length: count }, () =>
    fetch(`${MEAL_BASE}/random.php`).then(r => r.json()),
  );
  const results = await Promise.all(promises);
  return results.map(r => normalizeMeal(r.meals[0]));
}

export async function fetchRandomDrinks(count = 20) {
  const promises = Array.from({ length: count }, () =>
    fetch(`${COCKTAIL_BASE}/random.php`).then(r => r.json()),
  );
  const results = await Promise.all(promises);
  return results.map(r => normalizeDrink(r.drinks[0]));
}

// ─── Search (not cached — queries vary too much) ──────────────────────────────

export async function searchMeals(query) {
  const res = await fetch(
    `${MEAL_BASE}/search.php?s=${encodeURIComponent(query)}`,
  );
  const data = await res.json();
  return (data.meals ?? []).map(normalizeMeal);
}

export async function searchDrinks(query) {
  const res = await fetch(
    `${COCKTAIL_BASE}/search.php?s=${encodeURIComponent(query)}`,
  );
  const data = await res.json();
  return (data.drinks ?? []).map(normalizeDrink);
}
