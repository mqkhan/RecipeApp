import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RecipeDetailScreen = ({route}) => {
  const {recipe} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.subtitle}>Ingredients:</Text>
      <Text>{recipe.ingredients}</Text>
      <Text style={styles.subtitle}>Cook Time:</Text>
      <Text>{recipe.cookTime} minutes</Text>
      <Text style={styles.subtitle}>Instructions:</Text>
      <Text>{recipe.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default RecipeDetailScreen;
