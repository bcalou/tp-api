const constants = {
  url: 'https://api.spoonacular.com',
  apiKey: '6a77ee42ea054944ad47d95477605ecd',
  favoritesRecipesList:
    JSON.parse(localStorage.getItem('favoritesRecipes')) || [],
};

export const { url, apiKey, favoritesRecipesList } = constants;
