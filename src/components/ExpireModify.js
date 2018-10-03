
import React, { Component } from 'react';

import { Modal,TouchableHighlight,TouchableOpacity,
 AsyncStorage, Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, Dimensions} from 'react-native';
// import { Button } from 'native-base';
//import DatePicker from 'react-datepicker';
import Moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Card, CardSection , Input, Button, Header } from './common'; 
import DatePicker from 'react-native-datepicker';
import SelectInput from 'react-native-select-input-ios'


export default class ExpireModify extends Component {
 
  constructor(props) {

    super(props);
    

    this.state = {
      Barcode:'',
      iQty:'',
      isLoading: true,
      text: '',
      req_qty: '',
      r_qty: '',
      ActivityIndicator_Loading: false, 
      date:new Date(),
      remark: '',
      modalVisible: false,                
      displayType: 'all',    
      selectedItem:'',  
      items: [{label: 'OOS', value:'OOS'},
              {label: 'Stock Inaccurancy', value:'Stock Inaccurancy'},
              {label: 'Negative Article', value:'Negative Article'}
            ],
    };    
    this.arrayholder = [] ;


  }

  componentDidMount() {

      AsyncStorage.getItem('username').then((username)=>{  
        var text=0;
        //var uname = AsyncStorage.getItem('username');      
        Moment.locale('en');

        const cdate = new Date();
        //const { date }=this.state;

        
        //const cdate = date;


        const cre_date = Moment(cdate).format('YYYY-MM-DD')
        //const cre_date = Moment(date).format('YYYY-MM-DD')


        AsyncStorage.getItem('token').then((token) => {    
        //return fetch('http://192.168.2.68:3000/api/get_Lists/?uname='+username+'&cdate='+cre_date,
        return fetch('http://192.168.2.68:3000/api/get_expire_detail/?barcode='+text+'&uname='+username,
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
              this.arrayholder = res ;
            });
          })
          .catch((error) => {
            console.error(error);
          });
        })
    });
  }

  getPickerOptions() {
    return [
      { value: 'OOS', label: 'OOS'      },
      { value: 'Stock Inaccurancy', label: 'Stock Inaccurancy'     },
      { value: 'Negative Article', label: 'Negative Article'     }      
    ];
  }  
  onSubmitEditingRemark(value){
      this.setState({remark: value});
  }

  confirm_update(){
          const { text } = this.state ;   
      AsyncStorage.getItem('username').then((username) => {          
          AsyncStorage.getItem('token').then((token) => {    
          console.log('Start confirm_all API');
          return fetch('http://192.168.2.68:3000/api/confirm_All/',
                      {method: "POST", 
                       headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',                        
                      'Authorization': 'Bearer ' + token,
                      },
                      body: JSON.stringify(
                      {
                        uname: username,                                                
                        barcode : text,
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
                }).catch((error) =>
                {
                    console.error(error);                 
                });          
          })    
        })
  }
  RequeryData(){
      AsyncStorage.getItem('username').then((username)=>{  
        var text=0;
        //var uname = AsyncStorage.getItem('username');      
        Moment.locale('en');

        //const cdate = new Date();
        const { date }=this.state;

        
        //const cdate = date;


        //const cre_date = Moment(cdate).format('YYYY-MM-DD')
        const cre_date = Moment(date).format('YYYY-MM-DD')


        AsyncStorage.getItem('token').then((token) => {    
        return fetch('http://192.168.2.68:3000/api/get_expire_detail/?barcode='+text+'&uname='+username,
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
    alert("Barcode : "+BARCODE+", Name : "+ART_DESC+", Current Qty : " + ART_QTY +", Internal Code: " +ART_In_Code);  
  }
  
   SearchFilterFunction(){
    const { text } = this.state;
    let req_data =AsyncStorage.getItem('req_data');

AsyncStorage.getItem('req_data', (res) => {
                    var req_data

                    // If this is the first time, set up a new array
                    if (res === null) {
                      // New search data
                  AsyncStorage.getItem('username').then((username)=>{                       
                        AsyncStorage.getItem('token').then((token) => {    
                        return fetch('http://192.168.2.68:3000/api/get_expire_detail/?barcode='+text+'&uname='+username,
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
                    }); 
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
                  });                   
                

  }

    _onPressButton (barcode,cdate) {
        Moment.locale('en');        
        //const { date }=this.state;
            const cre_date = Moment(cdate).format('YYYY-MM-DD') ; 


      let check_data =AsyncStorage.getItem('check_data');
      AsyncStorage.getItem('token').then((token) => {
        AsyncStorage.getItem('username').then((username)=>{
                      if (username !== null) {                      
                          AsyncStorage.getItem('token').then((token) => {    
                          return fetch('http://192.168.2.68:3000/api/get_expire_detail_date/?barcode='+barcode+'&uname='+username+'&cdate='+cre_date,
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
                      })
      });  
      this.setState({req_qty: '' });          
      this.setState({remark: '' });                              
      }

   

      StoreRmrk(){

        const { remark } = this.state;        
        AsyncStorage.getItem("remark").then((remark) => {
            this.setState({"remark": remark});
        }).done();        

        //alert(remark);
      }
      _onConfirmButton(barcode,art_qty,req_qty,edate){

      const cre_date = Moment(edate).format('YYYY-MM-DD')
      const { r_qty,is_doubt,remark,date } = this.state;
      AsyncStorage.getItem('username').then((username)=>{

          AsyncStorage.getItem('token').then((token) => {    

          
          return fetch('http://192.168.2.68:3000/api/add_Edit_Expire/',
                      {method: "POST", 
                       headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',                        
                      'Authorization': 'Bearer ' + token,
                      },
                      body: JSON.stringify(
                      {                                                                       
                        uname: username,
                        barcode: barcode,       
                        req_stock: r_qty, 
                        cdate: cre_date,
                      })                    
            }).then((response) => response.json()).then((res) =>
            {/*
              if (res!==null){
                //alert("Picking quantity Add "+res,"Add"); 
                Alert.alert(
                  'Modify',
                  "Expiry quantity modified "+res,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )                
              }
              */
            }).catch((error) =>
            {
                console.error(error);                 
            });
          
          //})
        })
      });   

      AsyncStorage.getItem('username').then((username) => {          
          //alert('Username '+username + ' Barcode =' + barcode);
          AsyncStorage.getItem('token').then((token) => {    
          
          return fetch('http://192.168.2.68:3000/api/confirm_Exp/',
                      {method: "PUT", 
                       headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',                        
                      'Authorization': 'Bearer ' + token,
                      },
                      body: JSON.stringify(
                      {
                        uname: username,                                                
                        barcode : barcode,
                        cdate: cre_date,
                      })                    
            }).then((response) => response.json()).then((res) =>
            {
              if (res!==null){
                //alert("Picking quantity Add "+res,"Add"); 
                Alert.alert(
                  'Edit',
                  "New expire quantity ("+ r_qty +") was edited.",
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )                
              }
                }).catch((error) =>
                {
                    console.error(error);                 
                });          
          })    
        })         

      //this.componentDidMount();
      this.setState({modalVisible: false});
      this.RequeryData();
      this.setState({r_qty: '' });          
      //this.setState({remark: '' });       


    }

    confirmAll () {      
    
    const { req_qty,r_qty,is_doubt,remark,date,text } = this.state;
      
      AsyncStorage.getItem('username').then((username)=>{          
        console.log('Start add_Confirm_Expire API');
          const cdate = new Date();
          const cre_date = Moment(cdate).format('YYYY-MM-DD') // Current Date
          const ch_date = Moment(date).format('YYYY-MM-DD') // Date from state
          // Insert Into Expire Modify Table
          AsyncStorage.getItem('token').then((token) => {    
          
          return fetch('http://192.168.2.68:3000/api/add_Confirm_Expire/',
                      {method: "POST", 
                       headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',                        
                      'Authorization': 'Bearer ' + token,
                      },
                      body: JSON.stringify(
                      {
                        uname: username,                        
                        barcode : text,
                      })                    
            }).then((response) => response.json()).then((res) =>
            {
              /*
              if (res!==null){
                //alert("Picking quantity Add "+res,"Add"); 
                Alert.alert(
                  'Add',
                  "Confirm all expire stocks "+res,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )                
              }
              */
            }).catch((error) =>
            {
                console.error(error); 
            });              
          })



      });      


      AsyncStorage.getItem('username').then((username) => {          
          //alert('Username '+username + ' Barcode =' + text);
          AsyncStorage.getItem('token').then((token) => {    
          
          return fetch('http://192.168.2.68:3000/api/confirm_All/',
                      {method: "PUT", 
                       headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',                        
                      'Authorization': 'Bearer ' + token,
                      },
                      body: JSON.stringify(
                      {
                        uname: username,                                                
                        barcode : text,
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
                }).catch((error) =>
                {
                    console.error(error);                 
                });          
          })    
        })

      this.RequeryData();
      this.setState({req_qty: '' });          
      this.setState({remark: '' });
      this.setState({date:new Date()});       

    
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
    <Header headerText="Expiry Modification"/>
      <TextInput 
        ref = {input => { this.textInput = input }}
       //ref="search"
       style={styles.SearchInputStyleClass}       
       value={this.state.text}
       underlineColorAndroid='transparent'
       clearTextOnFocus={true}       
       placeholder="Search Here"       
       returnKeyType = {"go"}              
       autoFocus = {true}
       onChangeText={text=>this.setState({ text })}            
       onSubmitEditing={(text) => this.SearchFilterFunction(text)}
        />    
        <CardSection>
        <TouchableHighlight
          onPress={this.confirmAll.bind(this)}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Confirm All</Text>
        </TouchableHighlight>
        </CardSection>

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
                            > 
                                        {
                                          rowData.ART_DESC+"("+rowData.BARCODE+")\n"+                                          
                                          Moment(rowData.EDATE).format('DD-MM-YYYY')+" ("+ rowData.EDESP +")\n"+                                          
                                          "Scan Qty = "+rowData.TOTAL_QTY
                                         }                                   
                            </Text>


                var input2=<TouchableHighlight onPress={() => {
                                                        this.setState({modalVisible: true},this._onPressButton.bind(this,rowData.BARCODE,rowData.EDATE))
                                                              }
                                                        }                         

                              style={styles.buttonStyle}
                            >
                              <Text style={styles.textStyle}>Edit</Text>
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
                      </Card>                      
                    </View>
                );
            }}
 
        />      

        <Modal animationType = {"slide"} 
           transparent = {false}
           visible = {this.state.modalVisible}           
           
           onRequestClose={() => { this.modalVisible(false); } }
        >
           <View style = {styles.modal}>
              <Text style={styles.rowViewContainer} >Editing expire stock</Text>
              
              <TouchableOpacity
                  onPress={() => {
                      this.setState({modalVisible: false},this.RequeryData())
                  } }>
                  
                  <Text style={styles.textStyle}>Back</Text>
              </TouchableOpacity>              

                <ListView 
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderSeparator= {this.ListViewItemSeparator}
                    renderRow={(check_data) => {
                        var inputRefs = [];
                        var _focusInput = function(name) {
                            inputRefs[name].focus();
                        };

                        var input1 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {"Barcode : "+ check_data.BARCODE}
                                    </Text>
                        var input2 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {"Description : "+ check_data.ART_DESC}
                                    </Text>
                        var input3 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {"Expire Date : "+ check_data.EDATE}
                                    </Text>
                        var input4 = <Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {"Expire Total Qty : "+ check_data.TOTAL_QTY}
                                    </Text>

                        var input5 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {"New Expire Qty : "}
                                    </Text>

                        var input6 =<TextInput                
                                         ref={(input) => { this.secondTextInput = input; }}                         
                                         style={styles.TextInputStyleClass}       
                                         value={this.state.r_qty}
                                         underlineColorAndroid='transparent'
                                         placeholder="Qty"       
                                         returnKeyType = {"go"}                                                       
                                         onChangeText={r_qty=>this.setState({ r_qty })}            
                                         onSubmitEditing={(r_qty) => this._onConfirmButton(check_data.BARCODE,check_data.ART_QTY,check_data.REQ_QTY,check_data.EDATE)}
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
                                <CardSection>
                                    {input3}
                                </CardSection>
                                <CardSection>
                                    {input4}
                                </CardSection>
                                <CardSection>
                                    {input5}{input6}
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
 
const SCREEN_WIDTH = Dimensions.get('window').width;
const MARGIN_LARGE = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },  
  selectInput: {
    backgroundColor:          '#F5FCFF',
    borderWidth:              1,
    borderColor:              '#009688',
    marginTop:                MARGIN_LARGE,
    overflow:                 'hidden'
  },
  selectInputInner: {
    height:                   36,
    borderRadius:             4,
  },  
  selectInputSmall: {
    width:                    SCREEN_WIDTH * 0.5 - (MARGIN_LARGE * 2),
  },  
  textStyle : {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5

  },
 MainContainer :{

  justifyContent: 'center',
  flex:1,
  margin: 7,
 
  },
 
 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },

  SearchInputStyleClass:{

   //flex: 1,
   //flexDirection: 'row',
   fontSize: 16,     
   textAlign: 'center',
   height: 50,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 5 ,
   backgroundColor : "#FFFFFF"
        
   },
  btnStyle:{
   marginTop: 5,
   paddingTop: 5,      
   borderWidth: 1,   
   backgroundColor : "red"    
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
  TextInputStyleClass:{

   flex: 1,
   flexDirection: 'row',   
   height: 50,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 5 ,
   backgroundColor : "#FFFFFF"
        
   }
 
});
