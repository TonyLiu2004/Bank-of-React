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
  const [description, setDescription] = useState('');
  function handleSubmit (e) {
    e.preventDefault();
    if(amount === 0 || description === "") return;
    let date = new Date().toISOString().slice(0, 10);
    const newCredit = { description, amount, date};
    const updatedCredits = [...creditList, newCredit];
    setCreditList(updatedCredits);
    props.updateCredits(updatedCredits);
    setDescription("");
    setAmount(0);
  };
  function handleAmount (e){
    setAmount(parseInt(e.target.value));
  }

  function handleDescription (e){
    setDescription(e.target.value);
  }

  return (
    <div>
      <h1>Credits</h1>
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
            <label>Description:</label>
            <input type="text" value={description} onChange={handleDescription}/>
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
          <ul key={index}>${credit.amount} : {credit.description} - {credit.date}</ul>
        ))}
      </div>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
    );
};

export default Credits;