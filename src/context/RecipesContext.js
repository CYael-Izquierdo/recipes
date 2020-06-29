import React, {createContext, useState, useEffect} from "react";
import Axios from "axios";

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  const [searchRecipes, setSearchRecipes] = useState({
    ingredient: "",
    category: ""
  });
  const [recipes, setRecipes] = useState([]);
  const {ingredient, category} = searchRecipes;

  useEffect(() => {
    const getRecipes = async () => {
     const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}&i=${ingredient}`;

     const response = await Axios.get(url);
      setRecipes(response.data.drinks);
    }
    if (ingredient==="" || ingredient==="") return;
    getRecipes().catch(error => console.log(error));
  }, [searchRecipes]);

  return (
    <RecipesContext.Provider
      value={{
        setSearchRecipes,
        recipes
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;

