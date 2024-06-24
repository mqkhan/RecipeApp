import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRecipeScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSave = async () => {
    const newRecipe = {
      id: Date.now(),
      title,
      ingredients,
      cookTime,
      instructions,
    };

    try {
      const storedRecipes = await AsyncStorage.getItem('recipes');
      const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      const updatedRecipes = [...recipes, newRecipe];
      await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        style={styles.input}
        placeholder="Cook Time (in minutes)"
        value={cookTime}
        onChangeText={setCookTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
      />
      <Button title="Save Recipe" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default AddRecipeScreen;
