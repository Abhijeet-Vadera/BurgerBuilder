import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
    
    let Ingredients=[];

    for(let IngredientName in props.ingredients){
        Ingredients.push({
            name:IngredientName,
            amount:props.ingredients[IngredientName]
        });
    }

    const ingredientOutput = Ingredients.map(ig=>{
        return <span
                className={[classes.Ingredients, classes[`${ig.name}`]].join(' ')}
                key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return(
        <div className={classes.Order}>
            <p><strong>INGREDIENTS :<hr></hr></strong>{ingredientOutput}<hr></hr></p>
            <p>Price : <strong>USD {props.price} </strong></p>
        </div>
    );
};

export default order
