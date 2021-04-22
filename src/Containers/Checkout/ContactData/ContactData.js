import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-order'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input'


class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        // setTimeout(function() { alert('Order Booked ;P '); }, 10);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Av',
                address: {
                    street: 'street 1',
                    zipCode: '123456',
                    country: 'India'
                },
                email: 'abc@gmail.com',
            },
            deliveryMode: 'Fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
                console.log(error)
            });
        // this.purchaseHandlerClosed()
    }
    render() {
        let form = (<form>
            <Input inputtype='input' type="text" name="name" placeholder="Your name" />
            <Input inputtype='input' type="text" name="email" placeholder="Email" />
            <Input inputtype='input' type="text" name="street" placeholder="Street" />
            <Input inputtype='input' type="text" name="postal" placeholder="Postal Code" />

            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter Yout Contact Data..!</h3>
                {form}
            </div>
        )
    }
}

export default ContactData;
