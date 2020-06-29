import React, {useContext} from "react";
import {ModalContext} from "../context/ModalContext";

const Recipe = ({recipe}) => {

  const {setRecipeID, setOpen} = useContext(ModalContext);

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <p className="card-header font-weight-bold text-truncate">{recipe.strDrink}</p>
        <img src={recipe.strDrinkThumb} alt={`${recipe.strDrink}`} className="card-img-top"/>
        <div className="card-body">
          <button
            className="btn btn-block btn-primary"
            type="button"
            onClick={() => {
              setRecipeID(recipe.idDrink);
              setOpen(true);
            }}
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;