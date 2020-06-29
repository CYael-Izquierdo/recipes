import React, {Fragment, useContext, useEffect, useState} from 'react';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import {ModalContext} from "../context/ModalContext";
import ClipLoader from "react-spinners/ClipLoader";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalRecipe = () => {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const {setRecipeID, recipe, setRecipe, open, setOpen} = useContext(ModalContext);

  const handleClose = () => {
    setOpen(false);
    setRecipe({});
    setRecipeID(null)
  };

  const showIngredients = () => {
    let ingredients =[];
    for (let i = 1; i < 16; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(<li>{recipe[`strIngredient${i}`]} - {recipe[`strMeasure${i}`]}</li>);
      }
    }
    return ingredients;
  }

  useEffect(() => {
    if (Object.keys(recipe).length === 0 && open === false) return;
    setOpen(true);
  }, [recipe, open, setOpen]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        {Object.keys(recipe).length === 0 ?
          <div className="container">
            <div className="justify-content-center row">
              <ClipLoader
                size={70}
                color="#EB6864"
              />
            </div>
          </div>
          :
          <Fragment>
            <h2>{recipe.strDrink}</h2>
            <h3 className="mt-4">Instructions:</h3>
            <p>{recipe.strInstructions}</p>
            <img src={recipe.strDrinkThumb} alt="" className="img-fluid my-4"/>
            <h3>Ingredients</h3>
            <ul>
              {showIngredients()}
            </ul>
          </Fragment>
        }
      </div>
    </Modal>
  );
}

export default ModalRecipe;