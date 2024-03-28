/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import NavBar from './components/NavBar'

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 10000.00,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }
  componentDidMount() {
    axios.get('https://johnnylaicode.github.io/api/credits.json')
    .then(response => {
      this.setState({ creditList: response.data }, () => {
        this.calculateBalance();
      });
    })
    .catch(error => {
      console.error(error);
    });

    axios.get('https://johnnylaicode.github.io/api/debits.json')
    .then(response => {
      this.setState({ debitList: response.data }, () => {
        this.calculateBalance();
      });
    })
    .catch(error => {
      console.error(error);
    });
  }
  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  addCredit = (credit) => {
    this.setState({creditList: credit});
    this.state.accountBalance += credit[credit.length -1].amount;
  }

  addDebit = (debit) => {
    this.setState({debitList: debit});
    this.state.accountBalance -= debit[debit.length -1].amount;
  }

  calculateBalance = () => {
    let balance = this.state.accountBalance;
    this.state.creditList.forEach(credit => {
      console.log(credit);
      balance += credit.amount;
    });
    this.state.debitList.forEach(debit => {
      balance -= debit.amount;
    });
    console.log(balance);
    this.setState({accountBalance: balance});
  }
  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} updateCredits={this.addCredit} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} updateDebits={this.addDebit}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react">
        <NavBar accountBalance={this.state.accountBalance} />
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;