import React, {createContext, useEffect, useState} from "react";
import Axios from "axios"

// Create context
export const CategoriesContext = createContext();

// Provider, store functions and states
const CategoriesProvider = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const  url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
      const response = await Axios.get(url);
      setCategories(response.data.drinks)
    }
    getCategories().catch(
      error => console.log(error)
    );
  }, []);

  return(
    <CategoriesContext.Provider
      value={{
        categories
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesProvider;