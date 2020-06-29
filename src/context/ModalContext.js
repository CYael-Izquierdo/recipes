import React, {createContext, useEffect, useState} from "react";
import Axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  const [recipeID, setRecipeID] = useState(null);
  const [recipe, setRecipe] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      if (!recipeID) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

      const response = await Axios.get(url);
      setRecipe(response.data.drinks[0]);
    }
    getRecipe().catch();
  }, [recipeID]);

  return (
    <ModalContext.Provider
      value={{
        setRecipeID,
        recipeID,
        recipe,
        setRecipe,
        open,
        setOpen
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;