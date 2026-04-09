import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {
  fetchRandomMeals,
  fetchRandomDrinks,
  fetchByMealCategory,
  fetchByMealArea,
  fetchMainMeals,
  searchMeals,
  searchDrinks,
} from '../api/recipes';

import { CATEGORIES, CUISINE_FILTERS } from '../constants/filters';
import { CategoryPill } from '../components/home-screen/CategoryPill';
import { CuisinePill } from '../components/home-screen/CuisinePill';
import { RecipeCard } from '../components/home-screen/RecipeCard';
import { ListCard } from '../components/home-screen/ListCard';

export default function Home({ onOpenRecipe, toggleFavorite, isFavorited }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loadingHome, setLoadingHome] = useState(true);

  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryResults, setCategoryResults] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const [activeCuisine, setActiveCuisine] = useState(null);
  const [cuisineResults, setCuisineResults] = useState([]);
  const [loadingCuisine, setLoadingCuisine] = useState(false);

  const debounceTimer = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const [t, l] = await Promise.all([
          fetchRandomMeals(5),
          fetchRandomMeals(5),
        ]);
        setTrending(t);
        setLatest(l);
      } catch (e) {
        console.error('Home load error:', e);
      } finally {
        setLoadingHome(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (query.length <= 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    debounceTimer.current = setTimeout(async () => {
      try {
        const [meals, drinks] = await Promise.all([
          searchMeals(query),
          searchDrinks(query),
        ]);
        const unique = Array.from(
          new Map(
            [...meals, ...drinks].map(i => [`${i.source}-${i.id}`, i]),
          ).values(),
        );
        setSearchResults(unique);
      } catch (e) {
        console.error('Search error:', e);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 600);

    return () => clearTimeout(debounceTimer.current);
  }, [query]);

  const clearAll = () => {
    setActiveCategory(null);
    setCategoryResults([]);
    setActiveCuisine(null);
    setCuisineResults([]);
  };

  const handleCategoryPress = async cat => {
    if (activeCategory?.id === cat.id) {
      setActiveCategory(null);
      setCategoryResults([]);
      return;
    }
    setActiveCategory(cat);
    setActiveCuisine(null);
    setCuisineResults([]);
    setQuery('');
    setLoadingCategory(true);
    try {
      let results = [];
      if (cat.strategy === 'meal-category') {
        results = await fetchByMealCategory(cat.mealDbKey);
      } else if (cat.strategy === 'meal-main') {
        results = await fetchMainMeals(cat.id === 'c3' ? 30 : 0);
      } else if (cat.strategy === 'cocktail') {
        results = await fetchRandomDrinks(20);
      }
      setCategoryResults(results);
    } catch (e) {
      console.error('Category fetch error:', e);
      setCategoryResults([]);
    } finally {
      setLoadingCategory(false);
    }
  };

  const handleCuisinePress = async filter => {
    if (activeCuisine?.value === filter.value) {
      setActiveCuisine(null);
      setCuisineResults([]);
      return;
    }
    setActiveCuisine(filter);
    setActiveCategory(null);
    setCategoryResults([]);
    setQuery('');
    setLoadingCuisine(true);
    try {
      const results =
        filter.type === 'meal-category'
          ? await fetchByMealCategory(filter.value)
          : await fetchByMealArea(filter.value);
      setCuisineResults(results);
    } catch (e) {
      console.error('Cuisine filter error:', e);
      setCuisineResults([]);
    } finally {
      setLoadingCuisine(false);
    }
  };

  const isSearchActive = query.length > 2;
  const isCatActive = activeCategory !== null;
  const isCuisineActive = activeCuisine !== null;
  const isFiltered = isCatActive || isCuisineActive;
  const filteredLabel = activeCategory?.name ?? activeCuisine?.label;
  const filteredResults = isCatActive ? categoryResults : cuisineResults;
  const loadingFiltered = isCatActive ? loadingCategory : loadingCuisine;

  // Helper so we don't repeat these props on every ListCard
  const cardProps = item => ({
    item,
    onPress: onOpenRecipe,
    toggleFavorite,
    isFavorited: isFavorited?.(item.id, item.source) ?? false,
  });

  if (loadingHome) {
    return (
      <View style={styles.fullCenter}>
        <ActivityIndicator size="large" color="#C76649" />
        <Text style={styles.loadingText}>Loading recipes…</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image source={require('../../res/barTop.png')} style={styles.banner} />

      {/* Search bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes and drinks…"
          placeholderTextColor="#999"
          value={query}
          onChangeText={text => {
            setQuery(text);
            clearAll();
          }}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => setQuery('')}
            style={styles.clearBtn}
          >
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category pills */}
      <Text style={styles.filterLabel}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {CATEGORIES.map(cat => (
          <CategoryPill
            key={cat.id}
            cat={cat}
            active={activeCategory?.id === cat.id}
            onPress={() => handleCategoryPress(cat)}
          />
        ))}
      </ScrollView>

      {/* Cuisine & diet pills */}
      <Text style={styles.filterLabel}>Cuisine & Diet</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {CUISINE_FILTERS.map(f => (
          <CuisinePill
            key={f.value}
            filter={f}
            active={activeCuisine?.value === f.value}
            onPress={() => handleCuisinePress(f)}
          />
        ))}
      </ScrollView>

      {/* Search results */}
      {isSearchActive ? (
        <>
          <Text style={styles.sectionTitle}>
            {isSearching ? 'Searching…' : `Results for "${query}"`}
          </Text>
          {isSearching ? (
            <ActivityIndicator
              size="large"
              color="#C76649"
              style={styles.spinner}
            />
          ) : searchResults.length === 0 ? (
            <Text style={styles.noResults}>No results found.</Text>
          ) : (
            searchResults.map(item => (
              <ListCard
                key={`${item.source}-${item.id}`}
                {...cardProps(item)}
              />
            ))
          )}
        </>
      ) : // Filter results
      isFiltered ? (
        <>
          <View style={styles.filterHeader}>
            <Text style={styles.sectionTitle}>{filteredLabel}</Text>
            <TouchableOpacity onPress={clearAll} style={styles.clearFilterBtn}>
              <Text style={styles.clearFilterText}>✕ Clear</Text>
            </TouchableOpacity>
          </View>
          {loadingFiltered ? (
            <ActivityIndicator
              size="large"
              color="#C76649"
              style={styles.spinner}
            />
          ) : filteredResults.length === 0 ? (
            <Text style={styles.noResults}>No results found.</Text>
          ) : (
            filteredResults.map(item => (
              <ListCard
                key={`${item.source}-${item.id}`}
                {...cardProps(item)}
              />
            ))
          )}
        </>
      ) : (
        // Home feed
        <>
          <Text style={styles.sectionTitle}>Trending Recipes</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hScroll}
          >
            {trending.map(item => (
              <RecipeCard
                key={`trending-${item.id}`}
                item={item}
                onPress={onOpenRecipe}
                toggleFavorite={toggleFavorite}
                isFavorited={isFavorited?.(item.id, item.source) ?? false}
              />
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Discover Recipes</Text>
          {latest.map(item => (
            <ListCard key={`latest-${item.id}`} {...cardProps(item)} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { paddingBottom: 24 },
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: { color: '#aaa', fontSize: 14 },
  banner: { height: 62, width: '100%' },

  searchBar: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },
  clearBtn: { paddingLeft: 8 },
  clearBtnText: { fontSize: 14, color: '#aaa' },

  filterLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  pillRow: { paddingHorizontal: 16, gap: 8 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  hScroll: { paddingHorizontal: 16, gap: 12 },
  spinner: { marginTop: 40 },
  noResults: { marginHorizontal: 16, color: '#888', fontSize: 15 },

  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
  },
  clearFilterBtn: { marginTop: 24, marginBottom: 12 },
  clearFilterText: { color: '#C76649', fontSize: 14, fontWeight: '600' },
});
