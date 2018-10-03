/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';
import Home from './components/HomeMenu';
import Picker from './components/Picker';
import Checker from './components/Checker';
import Epick from './components/Expire';
import EpickM from './components/ExpireModify';


//import { StackNavigator, } from 'react-navigation';

const Application = StackNavigator({
  Login: { screen: LoginForm }, 
  Home: { screen: Home }, 
  Picker: { screen: Picker }, 
  Checker: { screen: Checker }, 
  Epick: { screen: Epick }, 
  EpickM: { screen: EpickM },
  },{
  	navigationOptions:{
  		header:false,
  }
});


class App extends Component{
  render(){
    return(      	
        <Application />              
      );
  }
}

export default App;
