import React, { Component } from "react";
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControlls from '../../Components/Burger/BuildControls/BuildControlls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
        ingredients:null,
        basePrice : 4,
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get('https://react-my-burger-9774d.firebaseio.com/ingredients.json')
            .then(response=>{
                this.setState({ingredients:response.data})
            })
            .catch(err=>{
                this.setState({error:true})
            });
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

    purchaseHandlerContinue = () => {
        // this.setState({loading:true})
        // // setTimeout(function() { alert('Order Booked ;P '); }, 10);
        // const order ={
        //     ingredients:this.state.ingredients,
        //     price:this.state.basePrice.toFixed(2),
        //     customer:{
        //         name: 'Av',
        //         address:{
        //             street:'street 1',
        //             zipCode:'123456',
        //             country:'India'
        //         },
        //         email:'abc@gmail.com',
        //     },
        //     deliveryMode:'Fastest'
        // }
        // axios.post('/orders.json',order)
        //     .then(response=>{
        //         this.setState({loading:false, purchasing:false})
        //         console.log(response)
        //     })
        //     .catch(error=>{
        //         this.setState({loading:false, purchasing:false})
        //         console.log(error)
        //     });
        // this.purchaseHandlerClosed()
        const queryParams=[];

        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '='+ encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price="+this.state.basePrice)
        const queryString =queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        })
    }

    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
    
        let burger = this.state.error?<p>Ingredients can't be loaded.!</p>:<Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControlls 
                        counts={this.state.ingredients}
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        price={this.state.basePrice}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.basePrice}
            purchaseCanceled={this.purchaseHandlerClosed}
            purchaseContinue={this.purchaseHandlerContinue} />

            if(this.state.loading){
                orderSummary = <Spinner />
            }
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandlerClosed}>
                        {orderSummary}
                </Modal>
                {/* <div>Burger</div> */}
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);