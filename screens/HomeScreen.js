import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem('recipes');
        if (storedRecipes) setRecipes(JSON.parse(storedRecipes));
      } catch (error) {
        console.error('Error loading recipes:', error);
      }
    };
    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter(
    recipe =>
      recipe.title.includes(searchQuery) ||
      recipe.ingredients.includes(searchQuery) ||
      recipe.cookTime.toString().includes(searchQuery),
  );

  const handleDelete = async id => {
    try {
      console.log('Deleting recipe with id:', id);
      const newRecipes = recipes.filter(recipe => recipe.id !== id);
      setRecipes(newRecipes);
      await AsyncStorage.setItem('recipes', JSON.stringify(newRecipes));
      console.log('Recipe deleted successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const confirmDelete = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this recipe?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => handleDelete(id)},
      ],
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by title, ingredients, or cook time"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.recipeItem}>
            <Text>{item.title}</Text>
            <Button
              title="View Details"
              onPress={() =>
                navigation.navigate('RecipeDetail', {recipe: item})
              }
            />
            <Button title="Delete" onPress={() => confirmDelete(item.id)} />
          </View>
        )}
      />
      <Button
        title="Add Recipe"
        onPress={() => navigation.navigate('AddRecipe')}
      />
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
  recipeItem: {
    marginBottom: 16,
  },
});

export default HomeScreen;
