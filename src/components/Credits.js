/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
const Credits = (props) => {
  const [creditList, setCreditList] = useState(props.credits);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  function handleSubmit (e) {
    e.preventDefault();
    if(amount === 0 || name === "") return;
    const newCredit = { name, amount };
    const updatedCredits = [...creditList, newCredit];
    setCreditList(updatedCredits);
    props.updateCredits(updatedCredits);
    setName("");
    setAmount(0);

    console.log(props.credits)
  };
  function handleAmount (e){
    setAmount(parseInt(e.target.value));
  }

  function handleName (e){
    setName(e.target.value);
  }

  return (
    <div>
      <h1>Credits</h1>
      <br/>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center',
        padding: '10px',
        width: '40%',
        margin: '0 auto', 
      }}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={handleName}/>
          </div>
          <div>
            <label>Amount:</label>
            <input type="number" value={amount} onChange={handleAmount}/>
          </div>
          <button>Add Credit</button>
      </form>  

      <div style={{
        margin: '0 auto',
        textAlign:"left",
        width: '40%',
      }}>
        {props.credits.slice().reverse().map((credit, index) => (
          <ul key={index}>{credit.name}: {credit.amount}</ul>
        ))}
      </div>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
    );
};

export default Credits;