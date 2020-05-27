const apiKey: string = "344cecf8cf054df1bac5fda39bede732";

export const endpoints: Record<string, string> = {
  recipes: "recipes/search",
};

export const route = (endpoint: string, param: string): string =>
  `https://api.spoonacular.com/${endpoint}?apiKey=${apiKey}&${param}`;
