
import React, { Component } from 'react';

import { Modal, TouchableHighlight,TouchableOpacity,
 AsyncStorage, Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, Button,Dimensions } from 'react-native';

import { Card, CardSection , Input, Header } from './common'; 

import Moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';

import ModalDropdown from 'react-native-modal-dropdown';
import SelectInput from 'react-native-select-input-ios';


export default class Expire extends Component {
 
  constructor(props) {

    super(props);
    /*
    state = {
        visibleModal : false,
    };    
    */
    this.state = {
      Barcode:'',
      iQty:'',
      isLoading: true,
      text: '',
      req_qty: '',
      ActivityIndicator_Loading: false, 
      modalVisible: false,          
      date:new Date(),
      ex_type:'',
      items: [{label: 'Expire Date', value:'1'},
              {label: 'No Date', value:'2'},
              {label: 'Manufacture Date', value:'3'}
            ],      
    }

    this.arrayholder = [] ;
  }

 
  componentDidMount() {
  
      var text=0;
      //this.state.text=text;
    AsyncStorage.getItem('username').then((username)=>{      
      AsyncStorage.getItem('token').then((token) => {    
      return fetch('http://192.168.2.68:3000/api/expire_info/?barcode='+text+'&uname='+username,
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
    })
  }

  GetListViewItem (BARCODE,ART_CODE,ART_DESC,ART_IN_CODE,LU_IN_CODE,ART_QTY) {    
    alert("Barcode : "+BARCODE+"\nName : "+ART_DESC+"\nCurrent Qty : " + ART_QTY +"\nInternal Code: " +ART_IN_CODE+"\nLU Code"+LU_IN_CODE);  
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
                        return fetch('http://192.168.2.68:3000/api/expire_info/?barcode='+text+'&uname='+username,
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
                      // New search data
                    }else {
                      req_data = JSON.parse(res);
                    }

                     // Save the messages
                    AsyncStorage.setItem('req_data', JSON.stringify(req_data), (res) => {})  
                  });                   
    

  }

    _onPressButton (barcode,artcode,artdesc,cinr,cinl) {


      AsyncStorage.getItem('username').then((username)=>{

          var nday = new Date().getDate();
          var nmonth = new Date().getMonth() + 1;
          var nyear = new Date().getFullYear();

          var ndate= nyear+'-'+nmonth+'-'+nday;
          
          const { req_qty,ex_type } = this.state;
          /*
          if (date===null) {
            const { edate }= ndate;
          }else{
            const { edate }= Moment(date).format('YYYY-MM-DD');
          }

          alert(edate);
          */
          estatus=parseInt(ex_type,10);         
          
          if (estatus===2){              
              this.setState({date:new Date()});
          }

          const { date } = this.state;

          var edate = Moment(date).format('YYYY-MM-DD');

          alert(edate);

          console.log(req_qty);
          AsyncStorage.getItem('token').then((token) => {    
          return fetch('http://192.168.2.68:3000/api/add_Expire/',
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
                        req_qty: req_qty,
                        uname: username,
                        edate: edate,
                        ex_type: estatus,
                        artcinr: cinr,
                        artcinl: cinl,
                      })                    
            }).then((response) => response.json()).then((res) =>
            {
              if (res!==null){
                //alert("Picking quantity Add "+res,"Add"); 
                Alert.alert(
                  'Expire',
                  "Expire quantity Add "+res,
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
 
          })

          this.componentDidMount();
          //this.ref.search.value();
          this.textInput.clear();
          //this.ref.search.focus();
          this.textInput.focus();
          this.setState({req_qty: '' });          
          this.setState({date:new Date()}); 
          this.setState({ex_type: ''});
          
      });  

    }
    //Expire Type Picker Start
    getPickerOptions() {
      return [
        { value: '1', label: 'Expire Date'      },
        { value: '2', label: 'No Date'     },
        { value: '3', label: 'Manufacture Date'     }      
      ];
    } 
    onSubmitExType(value){
        this.setState({ex_type: value});
    }

    StoreExType(){

      const { ex_type } = this.state;        
      AsyncStorage.getItem("ex_type").then((ex_type) => {
          this.setState({"ex_type": ex_type});
      }).done();        

      //alert(remark);
    }
    //Expire Type Picker End
   check_ExpireList(){
      const cdate = new Date();

      const cre_date = Moment(cdate).format('YYYY-MM-DD')

      let check_data =AsyncStorage.getItem('check_data');

      AsyncStorage.getItem('username').then((username)=>{
                    if (username !== null) {                      
                        AsyncStorage.getItem('token').then((token) => {    
                        return fetch('http://192.168.2.68:3000/api/get_Expire_Lists/?uname='+username+'&cdate='+cre_date,
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
      alert(visible);
      /*
      if (visible===false){
        this.setState({ modalVisible: false });
      }else{
        this.setState({ modalVisible: visible });
      }
      */
      this.setState({ modalVisible: visible });
      this.check_ExpireList();
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

      <Header headerText="Expire Listing"/> 

      <TouchableHighlight onPress = {() => {
                      this.setState({modalVisible: true},this.check_ExpireList())
                  }}>           
         <Text style={styles.textStyle}>Show Expire List</Text>
      </TouchableHighlight>        
      <TextInput 
        ref = {input => { this.textInput = input }}
       //ref="search"
       style={styles.TextInputStyleClass}       
       value={this.state.text}
       underlineColorAndroid='transparent'
       clearTextOnFocus={true}       
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
                                onPress={this.GetListViewItem.bind(this,rowData.BARCODE,rowData.ART_CODE,rowData.ART_DESC,rowData.ART_IN_CODE,rowData.LU_IN_CODE,rowData.ART_QTY)} 
                            > 
                                        {rowData.ART_DESC+ " ("+ rowData.ART_QTY+")"} 
                            </Text>
                var input2 = <Text 
                                style={styles.rowViewContainer} 
                            > 
                                        {"Status : "}
                            </Text>                            
                var input3 =<SelectInput
                                      value={this.state.ex_type}
                                      mode={'dropdown'}
                                      options={this.getPickerOptions()}
                                      onCancelEditing={() => console.log('onCancel')}
                                      onSubmitEditing={this.onSubmitExType.bind(this)}
                                      style={[styles.selectInput, styles.selectInputSmall]}                                      
                                    />                            

                var input4 =<DatePicker
                                style={{width: 300}}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                  dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                  },
                                  dateInput: {
                                    marginLeft: 36
                                  }
                                  // ... You can check the source to find the other keys. 
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />     

                var input5 =<Text 
                                style={styles.rowViewContainer} 
                                onPress={this.GetListViewItem.bind(this,rowData.BARCODE,rowData.ART_CODE,rowData.ART_DESC,rowData.ART_IN_CODE,rowData.LU_IN_CODE,rowData.ART_QTY)} 
                            > 
                                        {"Current Stock : "+ rowData.ART_QTY} 
                            </Text>


                var input6 =<TextInput                                         
                                 value={this.state.req_qty}
                                 underlineColorAndroid='transparent'
                                 placeholder="Qty"       
                                  returnKeyType = {"go"}              
                                  autoFocus = {true}
                                  onChangeText={req_qty=>this.setState({ req_qty })}            
                                  onSubmitEditing={(req_qty) => this._onPressButton(rowData.BARCODE,rowData.ART_CODE,rowData.ART_DESC,rowData.ART_IN_CODE,rowData.LU_IN_CODE)}
                             />

                return (
                    <View>
                    <Card>
                        <CardSection>
                            {input1}
                        </CardSection>
                        <CardSection>
                            {input2}{input3}                            
                        </CardSection>                        
                        <CardSection>
                            {input4}                            
                        </CardSection>                                                
                        <CardSection>
                            {input5}                            
                        </CardSection>                                                                        
                        <CardSection>
                            {input6}                            
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
              <Text>Expire List</Text>
              
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
                    renderRow={(check_data) => {
                        var inputRefs = [];
                        var _focusInput = function(name) {
                            inputRefs[name].focus();
                        };

                        var input1 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {check_data.BARCODE+" : "+check_data.ART_DESC} 
                                    </Text>

                        var input2 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                            {
                                                  "Expired Date : "+Moment(check_data.EXPIRE_DATE).format('DD-MM-YYYY')                                             
                                            }
                                    </Text>


                        var input3 =<Text 
                                        style={styles.rowViewContainer} 
                                    > 
                                                {"Expired Qty : "+check_data.REQ_QTY } 
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
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5
  }, 
  modal: {
    flex: 1,
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
        
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
        
   }
 
});
