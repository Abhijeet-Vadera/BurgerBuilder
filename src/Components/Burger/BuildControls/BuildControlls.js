import React from 'react'
import classes from './BuildControlls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controlls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Meat', type : 'meat'},
];

const BuildControlls = (props)=>(
    <div className={classes.BuildControlls}>
        <h1>Current Price : <strong>{props.price.toFixed(2)}</strong></h1>
        {controlls.map(ctrl=>(
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label + " : " + props.counts[ctrl.type]}
                added={()=>props.ingredientAdded(ctrl.type)}
                removed={()=>props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={props.price<=4}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default BuildControlls;