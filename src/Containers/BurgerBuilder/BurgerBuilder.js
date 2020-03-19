import React, { Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControlls from '../../Components/Burger/BuildControls/BuildControlls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICING = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={ ... }
    // }
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        basePrice : 4,
        purchasing:false
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        
        const priceAddition = INGREDIENT_PRICING[type];
        const basePrice = this.state.basePrice;
        const updatedPrice = basePrice + priceAddition;
        
        this.setState({basePrice:updatedPrice, ingredients:updatedIngredients})
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        
        const priceDeduction = INGREDIENT_PRICING[type];
        const basePrice = this.state.basePrice;
        const updatedPrice = basePrice - priceDeduction;
        
        this.setState({basePrice:updatedPrice, ingredients:updatedIngredients})
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseHandlerClosed = () => {
        this.setState({purchasing:false})
    }

    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandlerClosed}>
                    <OrderSummary ingredients={this.state.ingredients} price={this.state.basePrice} />    
                </Modal>
                {/* <div>Burger</div> */}
                <Burger ingredients={this.state.ingredients}/>
                <BuildControlls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.basePrice}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;