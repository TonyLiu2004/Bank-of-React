/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
const Debits = (props) => {
  // Create the list of Debit items
  const [debitList, setDebitList] = useState(props.debits);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  // let debitsView = () => {
  //   const { debits } = props;
  //   return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
  //     let date = debit.date.slice(0,10);
  //     return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
  //   });
  // }
  function handleSubmit (e) {
    e.preventDefault();
    if(amount === 0 || description === "") return;
    let date = new Date().toISOString();
    const newDebit = { description, amount, date};
    const newDebits = [...debitList, newDebit];
    setDebitList(newDebits);
    props.updateDebits(newDebits);
    setDescription("");
    setAmount(0);
  };

  function handleDescription (e){
    setDescription(e.target.value);
  }

  function handleAmount (e){
    const inputValue = parseFloat(e.target.value);
      const formattedValue = Math.floor(inputValue * 100) / 100;
      setAmount(parseFloat(formattedValue));
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
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
          <input type="text" name="description" value={description} onChange={handleDescription}/>
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" name="amount" value={amount} onChange={handleAmount} />
        </div>
        <button type="submit">Add Debit</button>
      </form>
      <div style={{
        margin: '0 auto',
        textAlign:"left",
        width: '40%',
      }}>
        {props.debits.slice().reverse().map((debit, index) => (
          <ul key={index}>${debit.amount} : {debit.description} - {debit.date}</ul>
        ))}
      </div>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;