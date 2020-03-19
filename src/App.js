import React,{ Component } from 'react';
import classes from './App.modules.css';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'

class App extends Component{
  render(){
    return (
      <div className={classes.App}>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
