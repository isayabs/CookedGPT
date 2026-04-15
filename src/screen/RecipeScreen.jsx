import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { fetchMealById, fetchDrinkById } from '../api/recipes';

// Extract the YouTube video ID from a full URL or bare ID string
function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/,
  );
  return match ? match[1] : url.length === 11 ? url : null;
}

export default function RecipeScreen({
  recipeId,
  source,
  toggleFavorite,
  isFavorited,
  onBack,
}) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    setVideoPlaying(false); // stop video when navigating to a new recipe
    async function load() {
      try {
        setLoading(true);
        const data =
          source === 'meal'
            ? await fetchMealById(recipeId)
            : await fetchDrinkById(recipeId);
        setRecipe(data);
      } catch (e) {
        console.error('Recipe fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [recipeId, source]);

  const onStateChange = useCallback(state => {
    if (state === 'ended') setVideoPlaying(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#C76649" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Recipe not found.</Text>
      </View>
    );
  }

  // ─── Parse ────────────────────────────────────────────────────────────────

  const name = recipe.strMeal || recipe.strDrink || '';
  const thumb = recipe.strMealThumb || recipe.strDrinkThumb || null;
  const category = recipe.strCategory ?? '';
  const area = recipe.strArea ?? '';
  const youtubeId = extractYouTubeId(recipe.strYoutube);

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing?.trim()) {
      ingredients.push(`${measure?.trim() ?? ''} ${ing.trim()}`.trim());
    }
  }

  const raw = recipe.strInstructions ?? '';
  let steps = [];
  if (/step\s*\d+/i.test(raw)) {
    steps = raw
      .split(/step\s*\d+/i)
      .map(s => s.trim())
      .filter(Boolean);
  } else {
    steps = raw
      .split(/\r?\n|\.\s+/)
      .map(s => s.trim())
      .filter(Boolean);
  }

  const snapshot = { name, thumb, category, area };
  const favorited = isFavorited(recipeId, source);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero image — hidden when YouTube player is shown */}
      {!youtubeId &&
        (thumb ? (
          <Image source={{ uri: thumb }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        ))}

      {/* YouTube player */}
      {youtubeId && (
        <View style={styles.videoWrapper}>
          <YoutubePlayer
            height={220}
            play={videoPlaying}
            videoId={youtubeId}
            onChangeState={onStateChange}
          />
        </View>
      )}

      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          {category ? <Text style={styles.category}>{category}</Text> : null}
          {area ? <Text style={styles.area}>{area}</Text> : null}
        </View>

        <TouchableOpacity
          onPress={() => toggleFavorite(recipeId, source, snapshot)}
          style={styles.heartBtn}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.heartIcon}>
            {favorited ? '❤️' : '🤍' + '\u300A'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Watch button (only shown when there's a video but it's not playing) */}
      {youtubeId && !videoPlaying && (
        <TouchableOpacity
          style={styles.watchBtn}
          onPress={() => setVideoPlaying(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.watchBtnText}>▶ Watch Video</Text>
        </TouchableOpacity>
      )}

      {/* Ingredients */}
      {ingredients.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsWrap}>
            {ingredients.map((item, i) => (
              <View key={`ing-${i}`} style={styles.ingredientChip}>
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Instructions */}
      {steps.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {steps.map((step, i) => (
            <View key={`step-${i}`} style={styles.stepRow}>
              <Text style={styles.stepNumber}>{i + 1}.</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const ACCENT = '#C76649';

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { paddingBottom: 32 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: '#aaa', fontSize: 16 },

  image: { height: 220, width: '100%' },
  imagePlaceholder: { height: 220, backgroundColor: '#ddd', width: '100%' },

  videoWrapper: {
    width: '100%',
    backgroundColor: '#000',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  headerText: { flex: 1 },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  category: { fontSize: 13, color: ACCENT, fontWeight: '600', marginBottom: 2 },
  area: { fontSize: 12, color: '#999' },

  heartBtn: {
    paddingTop: 4,
    paddingLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    minHeight: 36,
  },
  heartIcon: { fontSize: 28, lineHeight: 34 },

  watchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: ACCENT,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  watchBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 16,
  },

  ingredientsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  ingredientChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  ingredientText: { fontSize: 13, color: '#333' },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  stepNumber: { fontWeight: '700', marginRight: 8, color: ACCENT },
  stepText: { flex: 1, color: '#444', lineHeight: 20 },
});
