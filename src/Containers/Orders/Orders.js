import React, {Component} from 'react';
import Order from '../../Components/Order/Order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{
    state = {
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res=>{
            const fetchedOrders=[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }            
            this.setState({loading:false, orders:fetchedOrders})
        })
        .catch(err=>{
            this.setState({loading:false})
        })
    }

    render(){
        return(
            <div>
                <h1 style={{textAlign:'center'}}>ORDERS</h1>
                <hr style={{
                                width:'40%',
                                border:'1px solid black', 
                                marginBottom:'20px'}}/>
                {this.state.orders.map(order=>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);