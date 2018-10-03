import { AsyncStorage, Alert} from 'react-native';
import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Header, Button, Card, CardSection, Input, ActivityIndicator, ScrollView, TouchableOpacity } from './common';
//import Login from './LoginForm';

import Home from './HomeMenu';
import HomeChk from './HomeMenuChk';
import HomeExp from './HomeMenuExp';

class LoginForm extends Component{

	state = { username: '', password: '', isLoggingIn: false, message: '' };


	constructor(props){
		super(props);
		this.state = {
			username: '', password: '', isLoggingIn: false, message: ''
		}
	}


	async saveItem(item, selectedValue) {
	try {
	  await AsyncStorage.setItem(item, selectedValue);
	} catch (error) {
	  console.error('AsyncStorage error: ' + error.message);
	}
	}	


	onButtonPress(){
		
		const { username,password } = this.state;		
		var proceed = false;
		if (this.state.username && this.state.password) {		        
				fetch("http://192.168.2.68:3000/api/logins/", {		        	
		            method: "POST", 
		            headers: {
		              'Accept': 'application/json',
		              'Content-Type': 'application/json'
		            },
		            //body: formBody
		            body: JSON.stringify({
					         username:this.state.username,
					         password:this.state.password
					      })
		          })

		        .then((response) => response.json())
				.then((res) => {				  
				  //alert(res.token);
				  if (res.token && res.user.username) {
				  	//alert("User : " + res.user.full_name);
					//this.setState({
					//         clientToken: res.token,
					//        });				  	
					this.saveItem('username', res.user.username),
				    this.saveItem('token', res.token)
				    //alert('Token Setup Success!', 'Click the button to confirm token set success!'),					
				    	//Start
				    		//alert(rst1);
		    		var usr = res.user.username;
		    		var word1= 'OPR';

		    		//if (!RegExp('\\b'+ word1 +'\\b').test(usr)) {
		    			/*
		    		if (usr.search('OPR')>0) {
		    			var vMenu="HomeExp";	
		    			//var n=usr.search('OPR');
		    			//alert(n);		    		
		    		}else{
		    			var vMenu="HomeChk";	
		    		}				  
		    			alert(vMenu);
		    			*/
						this.props.navigation.navigate("Home");	
						//End


				  }
				  else {
				  	alert(res.message);
				  }
				  
				  //alert(response);				  
				})
				.catch((error) => {
				    console.error(error);
				});		
				var uname =AsyncStorage.getItem('username');
				/*
                Alert.alert(
                  'Login',
                  "Access granted!",
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                ) 
                */               
		}else{
                Alert.alert(
                  'Login',
                  "Please input username or password to login!",
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )                				
		}
		//http://192.168.2.68:3000/api/logins/

	}

	render(){		
		return(			
			<Card>			
			<Header headerText="Stock Picker Version 1.0.2"/>
				<CardSection>
					<Input 						
						placeholder="GSM username"
						label="Username"
						value= {this.state.username}
						onChangeText={username=>this.setState({ username })}						
					/>					
				</CardSection>

				<CardSection>
					<Input 
						secureTextEntry
						placeholder="GSM password"
						label="Password"
						value= {this.state.password}
						onChangeText={password=>this.setState({ password })}						
					/>	
				</CardSection>

				<CardSection>
					<Button
						onPress={this.onButtonPress.bind(this)}		
						label="Log In"
					/>						
				</CardSection>
			</Card>
		);
	}

}

export default LoginForm;