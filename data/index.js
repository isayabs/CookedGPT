// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'c1', name: 'Breakfast', emoji: '🍳' },
  { id: 'c2', name: 'Lunch',     emoji: '🥗' },
  { id: 'c3', name: 'Dinner',    emoji: '🍝' },
  { id: 'c4', name: 'Snacks',    emoji: '🍿' },
  { id: 'c5', name: 'Desserts',  emoji: '🍰' },
  { id: 'c6', name: 'Drinks',    emoji: '🥤' },
];

// ─── Ingredients ──────────────────────────────────────────────────────────────

export const ALL_INGREDIENTS = [
  // Proteins
  'Chicken', 'Beef', 'Salmon', 'Pork', 'Lamb', 'Shrimp', 'Prawns', 'Tuna',
  'Bacon', 'Ham', 'Tofu', 'Eggs',

  // Vegetables
  'Garlic', 'Onion', 'Red Onion', 'Tomato', 'Spinach', 'Broccoli', 'Mushroom',
  'Carrot', 'Bell Pepper', 'Zucchini', 'Cucumber', 'Avocado', 'Potato',
  'Sweet Potato', 'Corn', 'Peas', 'Cabbage', 'Celery', 'Leek', 'Asparagus',
  'Olives', 'Chili', 'Jalapeño', 'Spring Onion', 'Broccolini', 'Bok Choy',
  'Eggplant', 'Kale', 'Lettuce', 'Romaine', 'Arugula', 'Beetroot',

  // Grains & Carbs
  'Pasta', 'Rice', 'Bread', 'Quinoa', 'Oats', 'Flour', 'Ramen Noodles',
  'Tortilla', 'Pita Bread', 'Couscous', 'Arborio Rice', 'Chia Seeds',
  'Ladyfingers', 'Corn Chips', 'Granola', 'Croutons', 'Lentils', 'Chickpeas',

  // Dairy
  'Butter', 'Cheese', 'Cream', 'Milk', 'Yoghurt', 'Parmesan', 'Mozzarella',
  'Feta Cheese', 'Cream Cheese', 'Mascarpone', 'Ricotta',

  // Herbs & Spices
  'Ginger', 'Basil', 'Oregano', 'Cumin', 'Paprika', 'Coriander', 'Thyme',
  'Rosemary', 'Turmeric', 'Garam Masala', 'Cinnamon', 'Cardamom', 'Mint',
  'Parsley', 'Black Pepper', 'Sesame Seeds', 'Vanilla',

  // Sauces & Condiments
  'Soy Sauce', 'Olive Oil', 'Sesame Oil', 'Tomato Sauce', 'Coconut Milk',
  'Chicken Stock', 'Beef Stock', 'BBQ Sauce', 'Tahini', 'Hummus',
  'Balsamic Vinegar', 'Apple Cider Vinegar', 'White Wine', 'Mayonnaise',
  'Hot Sauce', 'Oyster Sauce', 'Fish Sauce', 'Worcestershire Sauce',

  // Fruits
  'Banana', 'Mango', 'Lemon', 'Lime', 'Pineapple', 'Mixed Berries',
  'Watermelon', 'Strawberries', 'Blueberries', 'Raspberries', 'Acai',

  // Baking & Sweeteners
  'Sugar', 'Brown Sugar', 'Honey', 'Maple Syrup', 'Chocolate', 'Cocoa Powder',
  'Baking Powder', 'Coffee', 'Matcha', 'Chai Tea', 'Gelatin',
  'Protein Powder', 'Almond Milk',

  // Nuts & Seeds
  'Almonds', 'Walnuts', 'Peanuts', 'Cashews', 'Pine Nuts',
];

// ─── Recipes ──────────────────────────────────────────────────────────────────

export const ALL_RECIPES = [
  // ── Breakfast ──
  {
    id: 'b1', name: 'Banana Pancakes', time: '20 min', calories: 390,
    category: 'Breakfast',
    ingredients: ['Banana', 'Eggs', 'Flour', 'Butter', 'Milk', 'Vanilla', 'Maple Syrup'],
  },
  {
    id: 'b2', name: 'Avocado Toast', time: '10 min', calories: 310,
    category: 'Breakfast',
    ingredients: ['Avocado', 'Bread', 'Lemon', 'Olive Oil', 'Eggs', 'Tomato', 'Chili'],
  },
  {
    id: 'b3', name: 'Eggs Benedict', time: '25 min', calories: 480,
    category: 'Breakfast',
    ingredients: ['Eggs', 'Bacon', 'Bread', 'Butter', 'Lemon', 'Balsamic Vinegar'],
  },
  {
    id: 'b4', name: 'Acai Bowl', time: '10 min', calories: 340,
    category: 'Breakfast',
    ingredients: ['Acai', 'Banana', 'Mixed Berries', 'Granola', 'Honey', 'Coconut Milk', 'Almond Milk'],
  },
  {
    id: 'b5', name: 'French Toast', time: '15 min', calories: 420,
    category: 'Breakfast',
    ingredients: ['Bread', 'Eggs', 'Milk', 'Butter', 'Cinnamon', 'Vanilla', 'Maple Syrup'],
  },
  {
    id: 'b6', name: 'Greek Yoghurt Parfait', time: '5 min', calories: 270,
    category: 'Breakfast',
    ingredients: ['Yoghurt', 'Mixed Berries', 'Granola', 'Honey'],
  },
  {
    id: 'b7', name: 'Overnight Oats', time: '5 min', calories: 310,
    category: 'Breakfast',
    ingredients: ['Oats', 'Milk', 'Yoghurt', 'Mixed Berries', 'Honey', 'Chia Seeds'],
  },
  {
    id: 'b8', name: 'Smashed Avo & Feta', time: '10 min', calories: 360,
    category: 'Breakfast',
    ingredients: ['Avocado', 'Feta Cheese', 'Bread', 'Lemon', 'Olive Oil', 'Chili', 'Tomato'],
  },
  {
    id: 'b9', name: 'Shakshuka', time: '25 min', calories: 380,
    category: 'Breakfast',
    ingredients: ['Eggs', 'Tomato', 'Bell Pepper', 'Onion', 'Garlic', 'Cumin', 'Paprika', 'Chili'],
  },
  {
    id: 'b10', name: 'Blueberry Muffins', time: '30 min', calories: 340,
    category: 'Breakfast',
    ingredients: ['Blueberries', 'Flour', 'Sugar', 'Butter', 'Eggs', 'Milk', 'Baking Powder', 'Vanilla'],
  },

  // ── Lunch ──
  {
    id: 'lu1', name: 'Greek Salad', time: '15 min', calories: 280,
    category: 'Lunch',
    ingredients: ['Tomato', 'Cucumber', 'Feta Cheese', 'Olives', 'Red Onion', 'Olive Oil', 'Oregano'],
  },
  {
    id: 'lu2', name: 'Veggie Wrap', time: '15 min', calories: 330,
    category: 'Lunch',
    ingredients: ['Tortilla', 'Spinach', 'Avocado', 'Tomato', 'Cucumber', 'Hummus', 'Bell Pepper'],
  },
  {
    id: 'lu3', name: 'Chicken Caesar Salad', time: '20 min', calories: 420,
    category: 'Lunch',
    ingredients: ['Chicken', 'Romaine', 'Parmesan', 'Croutons', 'Lemon', 'Garlic', 'Mayonnaise'],
  },
  {
    id: 'lu4', name: 'Tuna Melt', time: '15 min', calories: 460,
    category: 'Lunch',
    ingredients: ['Tuna', 'Bread', 'Cheese', 'Mayonnaise', 'Celery', 'Onion'],
  },
  {
    id: 'lu5', name: 'Caprese Sandwich', time: '10 min', calories: 380,
    category: 'Lunch',
    ingredients: ['Bread', 'Mozzarella', 'Tomato', 'Basil', 'Olive Oil', 'Balsamic Vinegar'],
  },
  {
    id: 'lu6', name: 'Lentil Soup', time: '35 min', calories: 310,
    category: 'Lunch',
    ingredients: ['Lentils', 'Onion', 'Garlic', 'Carrot', 'Tomato', 'Cumin', 'Olive Oil', 'Chicken Stock'],
  },
  {
    id: 'lu7', name: 'Quinoa Buddha Bowl', time: '25 min', calories: 440,
    category: 'Lunch',
    ingredients: ['Quinoa', 'Avocado', 'Spinach', 'Tomato', 'Cucumber', 'Tahini', 'Lemon', 'Chickpeas'],
  },
  {
    id: 'lu8', name: 'BLT Club Sandwich', time: '15 min', calories: 530,
    category: 'Lunch',
    ingredients: ['Bread', 'Bacon', 'Lettuce', 'Tomato', 'Mayonnaise'],
  },
  {
    id: 'lu9', name: 'Tom Yum Soup', time: '30 min', calories: 290,
    category: 'Lunch',
    ingredients: ['Shrimp', 'Mushroom', 'Lemongrass', 'Chili', 'Lime', 'Fish Sauce', 'Coconut Milk', 'Ginger'],
  },
  {
    id: 'lu10', name: 'Falafel Wrap', time: '20 min', calories: 410,
    category: 'Lunch',
    ingredients: ['Chickpeas', 'Tortilla', 'Tahini', 'Cucumber', 'Tomato', 'Spinach', 'Lemon', 'Cumin', 'Coriander'],
  },

  // ── Dinner ──
  {
    id: 'd1', name: 'Spicy Ramen', time: '25 min', calories: 520,
    category: 'Dinner',
    ingredients: ['Ramen Noodles', 'Chicken', 'Soy Sauce', 'Ginger', 'Garlic', 'Spinach', 'Eggs', 'Chili', 'Sesame Oil'],
  },
  {
    id: 'd2', name: 'Chicken Stir Fry', time: '30 min', calories: 450,
    category: 'Dinner',
    ingredients: ['Chicken', 'Soy Sauce', 'Garlic', 'Ginger', 'Broccoli', 'Carrot', 'Bell Pepper', 'Sesame Oil', 'Oyster Sauce'],
  },
  {
    id: 'd3', name: 'Beef Tacos', time: '20 min', calories: 590,
    category: 'Dinner',
    ingredients: ['Beef', 'Tortilla', 'Tomato', 'Onion', 'Cheese', 'Coriander', 'Lime', 'Chili', 'Paprika'],
  },
  {
    id: 'd4', name: 'Mushroom Risotto', time: '40 min', calories: 480,
    category: 'Dinner',
    ingredients: ['Mushroom', 'Arborio Rice', 'Butter', 'Parmesan', 'Onion', 'Garlic', 'White Wine', 'Chicken Stock'],
  },
  {
    id: 'd5', name: 'Lemon Herb Salmon', time: '25 min', calories: 410,
    category: 'Dinner',
    ingredients: ['Salmon', 'Lemon', 'Garlic', 'Olive Oil', 'Thyme', 'Rosemary', 'Butter'],
  },
  {
    id: 'd6', name: 'BBQ Pulled Pork', time: '60 min', calories: 640,
    category: 'Dinner',
    ingredients: ['Pork', 'BBQ Sauce', 'Onion', 'Garlic', 'Brown Sugar', 'Apple Cider Vinegar', 'Paprika', 'Cumin'],
  },
  {
    id: 'd7', name: 'Pasta Carbonara', time: '25 min', calories: 580,
    category: 'Dinner',
    ingredients: ['Pasta', 'Eggs', 'Parmesan', 'Bacon', 'Garlic', 'Black Pepper'],
  },
  {
    id: 'd8', name: 'Butter Chicken', time: '45 min', calories: 560,
    category: 'Dinner',
    ingredients: ['Chicken', 'Butter', 'Cream', 'Tomato Sauce', 'Garlic', 'Ginger', 'Garam Masala', 'Onion', 'Turmeric', 'Paprika'],
  },
  {
    id: 'd9', name: 'Garlic Prawn Linguine', time: '20 min', calories: 510,
    category: 'Dinner',
    ingredients: ['Prawns', 'Pasta', 'Garlic', 'Butter', 'Lemon', 'Parsley', 'Chili', 'Olive Oil', 'White Wine'],
  },
  {
    id: 'd10', name: 'Lamb Kofta', time: '30 min', calories: 490,
    category: 'Dinner',
    ingredients: ['Lamb', 'Garlic', 'Onion', 'Cumin', 'Coriander', 'Paprika', 'Eggs', 'Mint'],
  },
  {
    id: 'd11', name: 'Teriyaki Salmon Bowl', time: '25 min', calories: 530,
    category: 'Dinner',
    ingredients: ['Salmon', 'Rice', 'Soy Sauce', 'Honey', 'Garlic', 'Ginger', 'Sesame Seeds', 'Spring Onion', 'Broccoli'],
  },
  {
    id: 'd12', name: 'Prawn Pad Thai', time: '20 min', calories: 540,
    category: 'Dinner',
    ingredients: ['Prawns', 'Ramen Noodles', 'Eggs', 'Spring Onion', 'Bean Sprouts', 'Peanuts', 'Lime', 'Fish Sauce', 'Soy Sauce'],
  },
  {
    id: 'd13', name: 'Beef Bolognese', time: '50 min', calories: 610,
    category: 'Dinner',
    ingredients: ['Beef', 'Pasta', 'Tomato Sauce', 'Onion', 'Garlic', 'Carrot', 'Celery', 'Red Wine', 'Parmesan'],
  },
  {
    id: 'd14', name: 'Chicken Tikka Masala', time: '40 min', calories: 570,
    category: 'Dinner',
    ingredients: ['Chicken', 'Tomato Sauce', 'Cream', 'Onion', 'Garlic', 'Ginger', 'Garam Masala', 'Cumin', 'Paprika', 'Yoghurt'],
  },
  {
    id: 'd15', name: 'Vegetable Curry', time: '35 min', calories: 420,
    category: 'Dinner',
    ingredients: ['Sweet Potato', 'Chickpeas', 'Spinach', 'Coconut Milk', 'Tomato', 'Onion', 'Garlic', 'Ginger', 'Turmeric', 'Cumin', 'Coriander'],
  },

  // ── Snacks ──
  {
    id: 's1', name: 'Hummus & Pita', time: '5 min', calories: 220,
    category: 'Snacks',
    ingredients: ['Hummus', 'Pita Bread', 'Olive Oil', 'Paprika', 'Cucumber'],
  },
  {
    id: 's2', name: 'Guacamole & Chips', time: '10 min', calories: 290,
    category: 'Snacks',
    ingredients: ['Avocado', 'Lime', 'Tomato', 'Red Onion', 'Coriander', 'Chili', 'Corn Chips'],
  },
  {
    id: 's3', name: 'Cheese & Crackers', time: '5 min', calories: 240,
    category: 'Snacks',
    ingredients: ['Cheese', 'Crackers', 'Grapes'],
  },
  {
    id: 's4', name: 'Energy Balls', time: '15 min', calories: 180,
    category: 'Snacks',
    ingredients: ['Oats', 'Honey', 'Peanuts', 'Chia Seeds', 'Chocolate', 'Coconut Milk'],
  },
  {
    id: 's5', name: 'Stuffed Mushrooms', time: '20 min', calories: 200,
    category: 'Snacks',
    ingredients: ['Mushroom', 'Cream Cheese', 'Garlic', 'Parmesan', 'Parsley', 'Bread'],
  },
  {
    id: 's6', name: 'Roasted Chickpeas', time: '30 min', calories: 160,
    category: 'Snacks',
    ingredients: ['Chickpeas', 'Olive Oil', 'Cumin', 'Paprika', 'Garlic'],
  },

  // ── Desserts ──
  {
    id: 'de1', name: 'Chocolate Lava Cake', time: '20 min', calories: 540,
    category: 'Desserts',
    ingredients: ['Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla'],
  },
  {
    id: 'de2', name: 'Tiramisu', time: '30 min', calories: 490,
    category: 'Desserts',
    ingredients: ['Mascarpone', 'Eggs', 'Sugar', 'Coffee', 'Ladyfingers', 'Cocoa Powder', 'Vanilla'],
  },
  {
    id: 'de3', name: 'Lemon Tart', time: '45 min', calories: 410,
    category: 'Desserts',
    ingredients: ['Lemon', 'Eggs', 'Butter', 'Sugar', 'Flour', 'Cream'],
  },
  {
    id: 'de4', name: 'Churros', time: '25 min', calories: 380,
    category: 'Desserts',
    ingredients: ['Flour', 'Butter', 'Eggs', 'Sugar', 'Cinnamon'],
  },
  {
    id: 'de5', name: 'Mango Panna Cotta', time: '20 min', calories: 320,
    category: 'Desserts',
    ingredients: ['Mango', 'Cream', 'Sugar', 'Gelatin', 'Vanilla', 'Coconut Milk'],
  },
  {
    id: 'de6', name: 'Banana Foster', time: '15 min', calories: 440,
    category: 'Desserts',
    ingredients: ['Banana', 'Butter', 'Brown Sugar', 'Cinnamon', 'Vanilla', 'Maple Syrup'],
  },

  // ── Drinks ──
  {
    id: 'dr1', name: 'Mango Lassi', time: '5 min', calories: 210,
    category: 'Drinks',
    ingredients: ['Mango', 'Yoghurt', 'Milk', 'Sugar', 'Cardamom'],
  },
  {
    id: 'dr2', name: 'Matcha Latte', time: '5 min', calories: 150,
    category: 'Drinks',
    ingredients: ['Matcha', 'Milk', 'Sugar', 'Vanilla', 'Almond Milk'],
  },
  {
    id: 'dr3', name: 'Watermelon Smoothie', time: '5 min', calories: 130,
    category: 'Drinks',
    ingredients: ['Watermelon', 'Lime', 'Mint', 'Honey'],
  },
  {
    id: 'dr4', name: 'Iced Chai', time: '5 min', calories: 180,
    category: 'Drinks',
    ingredients: ['Chai Tea', 'Milk', 'Cinnamon', 'Cardamom', 'Ginger', 'Sugar', 'Almond Milk'],
  },
  {
    id: 'dr5', name: 'Pineapple Detox Juice', time: '10 min', calories: 110,
    category: 'Drinks',
    ingredients: ['Pineapple', 'Lime', 'Mint', 'Ginger', 'Honey'],
  },
  {
    id: 'dr6', name: 'Berry Protein Shake', time: '5 min', calories: 260,
    category: 'Drinks',
    ingredients: ['Mixed Berries', 'Banana', 'Protein Powder', 'Milk', 'Honey', 'Almond Milk'],
  },
];

// ─── Home page curated lists ───────────────────────────────────────────────────

export const TRENDING = ALL_RECIPES.filter(r =>
  ['d1', 'b2', 'd2', 'lu1', 'd3'].includes(r.id)
);

export const LATEST = ALL_RECIPES.filter(r =>
  ['d4', 'b1', 'd5', 'lu2', 'd6'].includes(r.id)
);
