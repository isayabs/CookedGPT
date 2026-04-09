export const CATEGORIES = [
  {
    id: 'c1',
    name: 'Breakfast',
    emoji: '🍳',
    strategy: 'meal-category',
    mealDbKey: 'Breakfast',
  },
  { id: 'c2', name: 'Lunch', emoji: '🥗', strategy: 'meal-main' },
  { id: 'c3', name: 'Dinner', emoji: '🍝', strategy: 'meal-main' },
  {
    id: 'c4',
    name: 'Snacks',
    emoji: '🍿',
    strategy: 'meal-category',
    mealDbKey: 'Side',
  },
  {
    id: 'c5',
    name: 'Desserts',
    emoji: '🍰',
    strategy: 'meal-category',
    mealDbKey: 'Dessert',
  },
  { id: 'c6', name: 'Drinks', emoji: '🥤', strategy: 'cocktail' },
];

export const CUISINE_FILTERS = [
  {
    label: 'Vegetarian',
    value: 'Vegetarian',
    emoji: '🥦',
    type: 'meal-category',
  },
  { label: 'Vegan', value: 'Vegan', emoji: '🌱', type: 'meal-category' },
  { label: 'Seafood', value: 'Seafood', emoji: '🐟', type: 'meal-category' },
  { label: 'Thai', value: 'Thai', emoji: '🇹🇭', type: 'meal-area' },
  { label: 'Italian', value: 'Italian', emoji: '🇮🇹', type: 'meal-area' },
  { label: 'Japanese', value: 'Japanese', emoji: '🇯🇵', type: 'meal-area' },
  { label: 'Mexican', value: 'Mexican', emoji: '🇲🇽', type: 'meal-area' },
  { label: 'Indian', value: 'Indian', emoji: '🇮🇳', type: 'meal-area' },
  { label: 'Greek', value: 'Greek', emoji: '🇬🇷', type: 'meal-area' },
  { label: 'Chinese', value: 'Chinese', emoji: '🇨🇳', type: 'meal-area' },
  { label: 'French', value: 'French', emoji: '🇫🇷', type: 'meal-area' },
  { label: 'American', value: 'American', emoji: '🇺🇸', type: 'meal-area' },
  { label: 'Spanish', value: 'Spanish', emoji: '🇪🇸', type: 'meal-area' },
  { label: 'Turkish', value: 'Turkish', emoji: '🇹🇷', type: 'meal-area' },
  { label: 'Vietnamese', value: 'Vietnamese', emoji: '🇻🇳', type: 'meal-area' },
];
