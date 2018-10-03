
import React, { Component } from 'react';

import { Modal, TouchableHighlight,TouchableOpacity,
 AsyncStorage, Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, Button } from 'react-native';

import { Card, CardSection , Input, Header } from './common'; 

import Moment from 'moment';

export default class Picker extends Component {
 
  constructor(props) {

    super(props);

    this.state = {
      Barcode:'',
      iQty:'',
      isLoading: true,
      text: '',
      req_qty: '',
      ActivityIndicator_Loading: false, 
      modalVisible: false,          
      location:'',
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
      http://192.168.2.68:3000/api/get_Lists/
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
        });
      })
    });
  }
  GetListViewItem (BARCODE,ART_CODE,Lu_In_Code,ART_In_Code,ART_DESC,ART_QTY) {    
      Alert.alert(
        'Stock Detail',
        "Barcode : "+BARCODE+"\nName : "+ART_DESC+"\nCurrent Qty : " + ART_QTY +"\nLU In Code : "+ Lu_In_Code+"\nArt In Code : " + ART_In_Code,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );                                                    
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
    //let req_data =AsyncStorage.getItem('req_data');

//AsyncStorage.getItem('req_data', (res) => {
                    //var req_data

                    // If this is the first time, set up a new array
                    //if (res === null) {
                      // New search data
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
                              if (res.length<1) {
                                      Alert.alert(
                                        'Search',
                                        "Stock not found! Please search another barcode.",
                                        [
                                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                                        ],
                                        { cancelable: false }
                                      )                                                
                              }
                              this.arrayholder = res ;

                            });
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                        //})
                      // New search data
                    /*
                    }else {
                      req_data = JSON.parse(res);
                    }
                    */

                    // Add the new message
                    //req_data.push({
                    //  Barcode: Barcode,
                    //  Req_Qty: iQty
                    //})

                    // Save the messages
                    //AsyncStorage.setItem('req_data', JSON.stringify(req_data), (res) => {})  
                  });                   
            });

  }

    _onPressButton (barcode,artcode,Lu_In_Code,Art_In_Code,artdesc,art_qty) {
      

      AsyncStorage.getItem('username').then((username)=>{
          //alert(username);  
      
          //const { req_qty } = this.state;          
          // Get the data
          //var iQty = rQty
          //var bCode = Barcode
          //const { req_qty } = this.state;
          //console.log(req_qty);
          //console.log(barcode);

          //alert(req_qty);
          //alert(barcode);
          
          //let obj= { barcode: barcode, 
          //           req_qty: req_qty, };
          const { req_qty,location } = this.state;

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
                        uname: username,
                        location: location,
                        Lu_In_Code:Lu_In_Code,
                        Art_In_Code: Art_In_Code,
                      })                    
            }).then((response) => response.json()).then((res) =>
            {
              if (res!==null){
                //alert("Picking quantity Add "+res,"Add"); 
                Alert.alert(
                  'Add',
                  "Scan quantity Add "+res,
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
          
          this.componentDidMount();
          this.textInput.clear();
          this.textInput.focus();
          this.setState({req_qty: '' });          

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

   check_PickList(){
      const cdate = new Date();

      const cre_date = Moment(cdate).format('YYYY-MM-DD')

      let check_data =AsyncStorage.getItem('check_data');

      AsyncStorage.getItem('username').then((username)=>{
                    if (username !== null) {                      
                        AsyncStorage.getItem('token').then((token) => {    
                        return fetch('http://192.168.2.68:3000/api/get_Lists/?uname='+username+'&cdate='+cre_date,
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
                              this.arrayholder = res ;
                            });
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                        })
                    }else {
                      check_data = JSON.parse(res);
                    }

                    AsyncStorage.setItem('check_data', JSON.stringify(check_data), (res) => {})  
                  });     
   }

   toggleModal(visible) {

      this.setState({ modalVisible: visible });
      this.check_PickList();
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
 
    return (
    <View style={styles.MainContainer}>      

      <Header headerText="Scan"/>        
      <TouchableHighlight onPress = {() => {
                      this.setState({modalVisible: true},this.check_PickList())
                  }}>           
         <Text style={styles.textStyle}>Show Scan List</Text>
      </TouchableHighlight>        
      <TextInput            
        placeholder="Set Location"          
        value= {this.state.location}
        style={styles.TextInputStyleClass}       
        onChangeText={location=>this.setState({ location })}            
      />          
      <TextInput 
       ref = {input => { this.textInput = input }}
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
                                onPress={this.GetListViewItem.bind(this,rowData.BARCODE,rowData.ART_CODE,rowData.LU_IN_CODE,rowData.ART_IN_CODE,rowData.ART_DESC,rowData.ART_QTY)} 
                            > 
                                        {rowData.ART_DESC+ " ("+ rowData.ART_QTY+")"} 
                            </Text>

                var input2 =<TextInput                                         
                                 value={this.state.req_qty}
                                 underlineColorAndroid='transparent'
                                 placeholder="Qty"       
                                  returnKeyType = {"go"}              
                                  autoFocus = {true}
                                  onChangeText={req_qty=>this.setState({ req_qty })}            
                                  onSubmitEditing={(req_qty) => this._onPressButton(rowData.BARCODE,rowData.ART_CODE,rowData.LU_IN_CODE,rowData.ART_IN_CODE,rowData.ART_DESC,rowData.ART_QTY)}
                             />

                return (
                    <View>
                    <Card>
                        <CardSection>
                            {input1}
                        </CardSection>
                        <CardSection>
                            {input2}                            
                        </CardSection>
                      </Card>
                    </View>
                );
            }}
 
        />      

        <Modal
           Modal animationType = {"slide"} 
           transparent = {false}
           visible = {this.state.modalVisible}           
           
           onRequestClose={() => { this.modalVisible(false); } }
           >
           <View style = {styles.modal}>
              <Text>Scan List</Text>
              
              <TouchableOpacity
                  onPress={() => {
                      this.setState({modalVisible: false},this.componentDidMount())
                  } }>
                  
                  <Text style={styles.textStyle}>Back</Text>
              </TouchableOpacity>              

                <ListView 
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderSeparator= {this.ListViewItemSeparator}
                    renderRow={(checkData) => {
                        var inputRefs = [];
                        var _focusInput = function(name) {
                            inputRefs[name].focus();
                        };

                        var input1 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {checkData.BARCODE+" : "+checkData.ART_DESC} 
                                    </Text>

                        var input2 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {"Current Stock : "+checkData.ART_QTY } 
                                    </Text>

                        var input3 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {"Request Stock : "+checkData.REQ_QTY } 
                                    </Text>

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
        </Modal>        

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
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5

  }, 
  modal: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
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
   fontSize: 17,
   padding: 5
  },

  TextInputStyleClass:{
   fontSize: 16,     
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