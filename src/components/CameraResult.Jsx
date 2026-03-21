import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function CameraResult() {

    const [result, setResult] = React.useState(null);
    const [editing, setEditing] = React.useState(false);

    // Call this when a photo is taken, e.g. from the camera component:
    // onPhotoTaken({ uri: 'file://...', text: 'detected text' })
    function onPhotoTaken(photo) {
        setResult(photo);
        setEditing(false);
    }

    function handleEdit() {
        setEditing(true);
    }

    function handleKeep() {
        // proceed with the result (upload, save, navigate, etc.)
        // placeholder action:
        console.log('Kept photo', result);
    }

    // If there's no result, show a simple "No result" message
    if (!result) {
        return (
            <View style={styles.center}>
                <Text style={styles.noResultText}>No result</Text>
            </View>
        );
    }

    // If user chose to edit, show a minimal edit UI
    if (editing) {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Edit Photo</Text>
                <Image source={{ uri: result.uri }} style={styles.preview} />
                <TouchableOpacity style={styles.button} onPress={() => setEditing(false)}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Default: show the captured result and ask if editing is needed
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Photo Result</Text>
            <Image source={{ uri: result.uri }} style={styles.preview} />
            <Text style={styles.detectedText}>{result.text || 'No text detected'}</Text>

            <Text style={styles.prompt}>Would you like to edit this photo?</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleKeep}>
                    <Text style={styles.buttonText}>Keep</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const styles = StyleSheet.create({
        center: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
        },
        container: {
            padding: 16,
        },
        heading: {
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 8,
        },
        preview: {
            width: '100%',
            height: 300,
            resizeMode: 'cover',
            marginBottom: 12,
            backgroundColor: '#eee',
        },
        detectedText: {
            marginBottom: 8,
        },
        prompt: {
            marginTop: 8,
            marginBottom: 8,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        button: {
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor: '#007AFF',
            borderRadius: 6,
            marginRight: 8,
        },
        buttonText: {
            color: '#fff',
            fontWeight: '600',
        },
        noResultText: {
            fontSize: 16,
            color: '#666',
        },
    });
    
}