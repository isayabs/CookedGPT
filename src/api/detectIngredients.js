export async function detectIngredientsFromPhoto(photoPath) {
  const formData = new FormData();

  formData.append('image', {
    uri: `file://${photoPath}`,
    type: 'image/jpeg',
    name: 'ingredient.jpg',
  });

  // Have to change the 10.0.2.2 if using real device or iOS simulator, but this works for Android emulator
  const response = await fetch('http://localhost:3001/detect', {
    method: 'POST',
    body: formData,
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Invalid server response: ${text}`);
  }

  if (!response.ok) {
    throw new Error(data?.error || 'Detection failed');
  }

  return data;
}
