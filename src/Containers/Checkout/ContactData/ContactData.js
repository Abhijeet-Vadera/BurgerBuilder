import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'

class ContactData extends Component{
    
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        }
    }
    componentDidMount(){
        console.log('under Contact Data');
        
    }
    render(){
        console.log("xdfghjk");
        return(
            <div className={classes.ContactData}>
                <h3>Enter Yout Contact Data..!</h3>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>

                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;
