import React from 'react'
import classes from './Spinner.module.css'

const Spinner = () => (
    <div style={{padding:"30px 0"}}>
        <div className={classes.Loader}>Loading...</div>
    </div>
);

export default Spinner