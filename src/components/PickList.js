
import React, { Component } from 'react';

import { TouchableHighlight,
 AsyncStorage, Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, Button, Picker } from 'react-native';

import { Card, CardSection , Input, Header } from './common'; 

export default class MyProject extends Component {
 
  constructor(props) {

    super(props);

    this.state = {
      Barcode:'',
      iQty:'',
      isLoading: true,
      text: '',
      ActivityIndicator_Loading: false, 
    
    }

    this.arrayholder = [] ;
  }

 
  componentDidMount() {
  
    /*  
      AsyncStorage.getItem('token').then((token) => {
        // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
        fetch('http://192.168.XXX.XXX:3001/api/protected/random-quote', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + token }
        })
        .then((response) => response.text())
        .then((quote) => {
          Alert.alert('Chuck Norris Quote', quote)
        })
        .done();
      })
    }
    
    */
      /*
      AsyncStorage.getItem('token').then((token) => {    
      return fetch('http://192.168.2.68:3000/api/protected_things/',
                  {method: "GET", 
                   headers: {
                  'Authorization': 'Bearer ' + token,
                  }
                })
        .then((response) => response.json())
        .then((res) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(res),
          }, function() {

            // In this block you can do something with new state.
            this.arrayholder = res ;

          });
        })
        .catch((error) => {
          console.error(error);
        });
      })
      */
      var text=0;
    AsyncStorage.getItem('username').then((username)=>{
      AsyncStorage.getItem('token').then((token) => {    
      return fetch('http://192.168.2.68:3000/api/protected_detail/?barcode='+text+'&uname='+username,
                  {method: "GET", 
                   headers: {
                  'Authorization': 'Bearer ' + token,
                  }
                })
        .then((response) => response.json())
        .then((res) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          //(r1, r2) => r1 !== r2
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(res),
          }, function() {

            // In this block you can do something with new state.
            this.arrayholder = res ;

          });
        })
        .catch((error) => {
          console.error(error);
        })
      })
    });

  }
  GetListViewItem (BARCODE,ART_CODE,Lu_In_Code,ART_In_Code,ART_DESC,ART_QTY) {    
    alert("Barcode : "+BARCODE+", Name : "+ART_DESC+", Current Qty : " + ART_QTY +", Internal Code: " +ART_In_Code);  
  }
  
   SearchFilterFunction(){
    /*     
     const newData = this.arrayholder.filter(function(item){
         //const itemData = item.ART_DESC.toUpperCase()
         //const textData = text.toUpperCase()
         const itemData = item.BARCODE
         const textData = text

         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
    */
    const { text } = this.state;
    let req_data =AsyncStorage.getItem('req_data');
        AsyncStorage.getItem('username').then((username)=>{
            AsyncStorage.getItem('req_data', (res) => {
                    var req_data

                    // If this is the first time, set up a new array
                    if (res === null) {
                      // New search data
                        AsyncStorage.getItem('token').then((token) => {    
                        return fetch('http://192.168.2.68:3000/api/protected_detail/?barcode='+text+'&uname='+username,
                                    {method: "GET", 
                                     headers: {
                                    'Authorization': 'Bearer ' + token,
                                    }
                                  })
                          .then((response) => response.json())
                          .then((res) => {
                            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                            //(r1, r2) => r1 !== r2
                            this.setState({
                              isLoading: false,
                              dataSource: ds.cloneWithRows(res),
                            }, function() {

                              // In this block you can do something with new state.
                              this.arrayholder = res ;

                            });
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                        })
                      // New search data
                    }else {
                      req_data = JSON.parse(res);
                    }

                    // Add the new message
                    //req_data.push({
                    //  Barcode: Barcode,
                    //  Req_Qty: iQty
                    //})

                    // Save the messages
                    AsyncStorage.setItem('req_data', JSON.stringify(req_data), (res) => {})  
                  })
        });                   
    

  }

    _onPressButton (barcode,artcode,artdesc,art_qty) {
      AsyncStorage.getItem('username').then((username)=>{
          //alert(username);  
      
          const { req_qty } = this.state;
          // Get the data
          //var iQty = rQty
          //var bCode = Barcode

          console.log(req_qty);
          //console.log(barcode);

          //alert(req_qty);
          //alert(barcode);
          
          //let obj= { barcode: barcode, 
          //           req_qty: req_qty, };

          AsyncStorage.getItem('token').then((token) => {    
          return fetch('http://192.168.2.68:3000/api/add_Lists/',
                      {method: "POST", 
                       headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',                        
                      'Authorization': 'Bearer ' + token,
                      },
                      body: JSON.stringify(
                      {
                        barcode : barcode,       
                        art_code : artcode,       
                        art_desc: artdesc,
                        art_qty: art_qty,
                        req_qty: req_qty,
                        uname: username
                      })                    
            }).then((response) => response.json()).then((res) =>
            {
              if (res!==null){
                //alert("Picking quantity Add "+res,"Add"); 
                Alert.alert(
                  'Add',
                  "Picking quantity Add "+res,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )                
              }
                
                //this.setState({ ActivityIndicator_Loading : false });
 
            }).catch((error) =>
            {
                console.error(error); 
                //this.setState({ ActivityIndicator_Loading : false});
            });          
            /*
            .then((response) => response.json())
            .then((res) => {
              let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(res),
              }, function() {

                // In this block you can do something with new state.
                this.arrayholder = res ;

              });
            })
            .catch((error) => {
              console.error(error);
            });
            */

          })


          /*
          AsyncStorage.setItem('req_data',JSON.stringify(obj));

          displayData= async()=>{
              try{
                let req_data =await AsyncStorage.getItem('req_data');
                let parsed=JSON.parse(req_data);
                alert('success');
                //alert(parsed);
              }
              catch(error){
                alert(error);
              }
          }
          */
      });      
      // Retrieve the existing messages
      /*
      AsyncStorage.getItem('obj', (res) => {
                    var req_data

                    // If this is the first time, set up a new array
                    if (res === null) {
                      req_data = [];
                    }else {
                      req_data = JSON.parse(res);
                    }

                    // Add the new message
                    //req_data.push({
                    //  Barcode: Barcode,
                    //  Req_Qty: iQty
                    //})

                    // Save the messages
                    AsyncStorage.setItem('req_data', JSON.stringify(obj), (res) => {})  
                  });
    */                  
    
    }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
 

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    /*
      let username = this.state.services.map( (s, i) => {
                  return <Picker.Item key={i} value={s} label={s} />
              });
    return (
    */
<View style={styles.MainContainer}>
    <Header headerText="Checker"/>  
    <Picker
      selectedValue={this.state.language}
      onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>

      <TextInput 
       style={styles.TextInputStyleClass}       
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"       
        returnKeyType = {"go"}              
        autoFocus = {true}
        onChangeText={text=>this.setState({ text })}            
        onSubmitEditing={(text) => this.SearchFilterFunction(text)}
        />

        <ListView 
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderSeparator= {this.ListViewItemSeparator}
            renderRow={(rowData) => {
                var inputRefs = [];
                var _focusInput = function(name) {
                    inputRefs[name].focus();
                };

                var input1 =<Text 
                                style={styles.rowViewContainer} 
                                onPress={this.GetListViewItem.bind(this,rowData.BARCODE,rowData.ART_CODE,rowData.Lu_In_Code,rowData.ART_In_Code,rowData.ART_DESC,rowData.ART_QTY)} > 
                                        {rowData.ART_DESC+ " ("+ rowData.ART_QTY+")"} 
                            </Text>


                var input2 =<Input            
                              placeholder="Qty"
                              label="Request Quantity"
                              value= {this.state.req_qty}
                              onChangeText={req_qty=>this.setState({ req_qty })}            
                            />    

                var input3=<TouchableHighlight onPress={this._onPressButton.bind(this,rowData.BARCODE,rowData.ART_CODE,rowData.ART_DESC,rowData.ART_QTY)} style={styles.buttonStyle}>
                            <Text style={styles.textStyle}>Add</Text>
                            </TouchableHighlight>

                return (
                    <View>
                    <Card>
                        <CardSection>
                            {input1}
                        </CardSection>
                        <CardSection>
                            {input2}                            
                        </CardSection>
                        <CardSection>
                            {input3}
                        </CardSection>
                      </Card>
                    </View>
                );
            }}
 
        />      
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },  
  textStyle : {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 26,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10

  },  
  buttonStyle:{
    flex:1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor:'#007aff',
    marginLeft: 5,
    marginRight: 5
  },
 MainContainer :{

  justifyContent: 'center',
  flex:1,
  margin: 7,
 
  },
 
 rowViewContainer: {
   fontSize: 27,
   padding: 10
  },

  TextInputStyleClass:{
        
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
        
   }
 
});

/*
import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';

class Picker extends Component {

    async userLogout() {
      try {
        await AsyncStorage.removeItem('token');
        Alert.alert('Logout Success!');
        Actions.Authentication();
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }

    onLogoutPress(){
      AsyncStorage.getItem('token').then((token) => {
        // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
        fetch('http://192.168.XXX.XXX:3001/api/protected/random-quote', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + token }
        })
        .then((response) => response.text())
        .then((quote) => {
          Alert.alert('Chuck Norris Quote', quote)
        })
        .done();
      })
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Welcome                    
                </Text>
                <View style={{margin:20}} />
                <Button
                            onPress={this.props.onLogoutPress}
                            title="Logout"
                     />
                </ScrollView>
                )
    }

}

export default Picker;
*/

/*
import React, { Component } from 'react';

import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform, Navigator} from 'react-native';

class AwesomeProject extends Component {
  
  constructor(props)
  {

    super(props);

    this.state = { 
    isLoading: true
  }
  }

  componentDidMount() {    
       return fetch('http://192.168.2.68:3000/stocks')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetFlatListItem (ART_DESC) {
   
  Alert.alert(ART_DESC);

  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

<View style={styles.MainContainer}>
  
       <FlatList
       
          data={ this.state.dataSource }
          
          ItemSeparatorComponent = {this.FlatListItemSeparator}

          renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item.ART_DESC)} > {item.ART_DESC} </Text>}

          keyExtractor={(item, index) => index}
          
         />
    
    
</View>
            
    );
  }
}

const styles = StyleSheet.create({

MainContainer :{

justifyContent: 'center',
flex:1,
margin: 10,
paddingTop: (Platform.OS === 'ios') ? 20 : 0,

},

FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

});

*/