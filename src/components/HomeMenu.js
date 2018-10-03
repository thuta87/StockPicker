/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';
import { Header, Button, Card, CardSection, Input, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from './common';
import Picker from './Picker';
import Checker from './Checker';
import Epick from './Expire';
import EpickM from './ExpireModify';

//import { StackNavigator, } from 'react-navigation';
/*
const App = StackNavigator({
  Login: { screen: LoginForm }, 
  Picker: { screen: Picker }, 
  Checker: { screen: Checker }, 
  },{
  	navigationOptions:{
  		header:false,
  }
});

*/

class HomeMenu extends Component{
  static navigationOptions = {
    title: 'Welcome',
  };  
  render(){
    const { navigate } = this.props.navigation;
    return(      	
          <Card>
          <Header headerText="Home Menu"/>
              <CardSection>
                    <Button
                      onPress={()=> navigate('Picker')}                        
                      label="Scan"
                    />                              
              </CardSection>
              <CardSection>
                    <Button
                      onPress={()=> navigate('Checker')}                        
                      label="Pick"
                    />                              
              </CardSection>              
              <CardSection>
                    <Button
                      onPress={()=> navigate('Epick')}                        
                      label="Expiry Listing"
                    />                              
              </CardSection>              
              <CardSection>
                    <Button
                      onPress={()=> navigate('EpickM')}                        
                      label="Expiry Modification"
                    />                              
              </CardSection>              
          </Card>
      );
  }
}

export default HomeMenu;
