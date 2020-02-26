import React from 'react';
import { AsyncStorage,View, Text, TextInput, Dimensions, StyleSheet, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';
import axios from 'axios';
import Responsive from 'react-native-lightweight-responsive';
import DatePicker from 'react-native-datepicker';
import { LinearGradient } from 'expo-linear-gradient';




export default class SignUp extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            date:new Date(),
            datePicked:false,
            email: '',
            firstName: '',
            Password: '',
            confirmPass: '',
            msg: "",
            dob: '',
            gender:'',
            address:'',
            stage1:true,
            phoneNumber:'',
            isDatePickerVisibleForIos:false,
            isDatePickerVisible:false,
            setDatePickerVisibility:false,
            convertedDate:'',
            selectionModal:false
        };
    }
    
    handleSignUp=()=>{
        this.setState({loading:true})
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.Password)
            .then((data)=>{
                const newUser ={
                    uid: data.user.uid,
                    firstName:this.state.firstName,
                    email: this.state.email,
                    password: this.state.confirmPass,
                    dateOfBirth: this.state.dob,
                    gender:this.state.gender,
                }
            
                axios.post('http://pickletour.appspot.com/api/user/add',newUser)
                    .then((data)=>{
                        AsyncStorage.setItem('userProfileData', JSON.stringify(newUser))
                    })
                
                    
            }
            
            )
            .catch((error)=>{
                this.setState({msg:error.message, loading:false})
            })
    }


    render() {
        
        
        const { firstName, email, Password, confirmPass, dob, gender, address, phoneNumber} = this.state
        const enabled = firstName.length >0 && email.length>0 && Password==confirmPass && dob.length>0 && Password.length>0 && confirmPass.length>0 && gender.length>0
        return (

            <LinearGradient colors={[ '#86D6B9','#48A080',]}style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#86d6b9' }}>
                <Modal
                    transparent ={true}
                    animationType='none'
                    visible={this.state.selectionModal}
                >
                    <View style={{   backgroundColor:'white',
                                    opacity:0.9,
                                
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'}}>

                       <View style={{ width:'94.5%', justifyContent: 'center'}}>
                       <ScrollView style={{ backgroundColor:'white',borderColor:'#585858', borderWidth:1, borderRadius:3}} contentContainerStyle={{alignItems:'center', justifyContent: 'center',alignContent:'center'}}>
                           <View style={{justifyContent:'center',borderBottomWidth:1,borderColor:'#585858', paddingVertical:10, backgroundColor:'white', width:'99%'}}>
                           <Text style={{ color:'#276091', alignSelf:'center',fontSize:Responsive.font(14),fontFamily:'open-sans-bold'}}>Select Gender</Text>
                           </View>
                            
                            
                           <TouchableOpacity onPress={()=>this.setState({gender:'Male', selectionModal:false})} style={{justifyContent:'center',borderBottomWidth:1,borderColor:'#585858', paddingVertical:10, backgroundColor:'white', width:'99%'}}><Text style={{color:'#585858',alignSelf:'center', fontSize:Responsive.font(14),fontFamily:'open-sans-bold'}}>Male</Text></TouchableOpacity>
                           <TouchableOpacity onPress={()=>this.setState({gender:'Female', selectionModal:false})} style={{justifyContent:'center',borderBottomWidth:1,borderColor:'#585858', paddingVertical:10, backgroundColor:'white', width:'99%'}}><Text style={{color:'#585858',alignSelf:'center', fontSize:Responsive.font(14),fontFamily:'open-sans-bold'}}>Female</Text></TouchableOpacity>
                            
                            
                            <TouchableOpacity onPress={()=>this.setState({selectionModal:false})} style={{justifyContent:'center', paddingVertical:10, backgroundColor:'white', width:'99%'}}>
                           <Text style={{color:'#FF0000', alignSelf:'center',fontSize:Responsive.font(16),fontFamily:'open-sans-bold'}}>Close</Text>
                           </TouchableOpacity>
                                                      

                        </ScrollView>
                       </View>

                   </View>

                </Modal>

                <KeyboardAwareScrollView enableOnAndroid={true}>
                    {this.state.stage1? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingBottom:10}}>
                        <Text style={{marginTop:Responsive.height(50), marginBottom:Responsive.height(20),fontFamily:'open-sans-bold',color:'white', textShadowOffset:{width:1, height:1},textShadowColor:'black',textShadowRadius:2,fontSize:Responsive.font(35)}}>SignUp</Text>
                        <View style={{flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 50,
                                    marginBottom:10,
                                    width:'95%'
                                    }}>
                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}
                                onChangeText={firstName => this.setState({ firstName })}
                                value={this.state.firstName}
                                placeholder="First Name"    
                                keyboardType="default"
                                returnKeyType="next"
                            />

                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}

                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                placeholder="Email"
                                keyboardType="email-address"
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}

                                onChangeText={Password => this.setState({ Password })}
                                value={this.state.Password}
                                placeholder="Password"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}
                                onChangeText={confirmPass => this.setState({ confirmPass })}
                                value={this.state.confirmPass}
                                placeholder="Confirm Password"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry={true}

                            />
                        </View>
                   
                        <View style={styles.SectionStyle}>
                            <DatePicker
                                 style={styles.forms1}
                                date={this.state.dob} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Date of Birth"
                                allowFontScaling={false}
                                format="DD-MM-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateText: {
                                        fontSize: Responsive.font(14),
                                        fontFamily: 'open-sans-bold',
                                        color: 'black'
                                    },
                                    dateInput: {
                                        borderWidth:0,
                                        placeholderTextColor:'black',
                                    alignItems:'flex-start',
                                    color: 'black',
                                    position:'relative',
                                    paddingBottom:8
                                    },
                                    dateTouchBody:{
                                        color:'black',
                                        
                                    },
                                    placeholderText: {
                                        fontSize: Responsive.font(14),
                                        fontFamily: 'open-sans-bold',
                                        color: 'gray'
                                    }
                                }}
                                onDateChange={dob => {
                                    this.setState({ dob });
                                }}
                            />

                        </View>
                      

                        <View style={styles.SectionStyle}>
                        
                <TouchableOpacity style={styles.DateForms1} onPress={()=>this.setState({selectionModal:true})}>
                        {this.state.gender.length>0 ? <Text style={{fontSize: Responsive.font(14),color: 'black',fontFamily: 'open-sans-bold',}}>{this.state.gender}</Text>: <Text style={{fontSize: Responsive.font(14),color: 'grey',fontFamily: 'open-sans-bold',}}>Select Gender</Text>}
                </TouchableOpacity>
                    </View>

                   {this.state.loading ?<ActivityIndicator size='large'/>
                   :
                    <TouchableOpacity disabled={!enabled} onPress={() =>
                        this.handleSignUp()
                    } style={{
                            fontFamily: 'open-sans-bold',
                            alignItems: 'center',
                            backgroundColor: enabled?'#48D5A0':'#BEBAC5',
                            paddingTop:5,
                            paddingBottom:5,
                            borderRadius: 100,
                            marginTop: 20,
                            paddingLeft:50,
                            paddingRight:50,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                    
                            elevation: 4,
                            
                            
                            }} >
                        <Text style={styles.regButton1}>Confirm</Text>
                    </TouchableOpacity>
                   }
                    <View style={{justifyContent:'center', alignItems:'center', alignSelf:'center', marginTop:10, width:'95%'}}>
                    <Text style={{color:'white', fontFamily:'open-sans-bold', fontSize:Responsive.font(16),alignSelf:'center', textAlign:'center'}}>
                        {this.state.msg}
                        
                    </Text>
                </View>
               
                        </View>:null}
                </KeyboardAwareScrollView>

            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 10,
        

    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    ImageStyle1: {
        padding: 10,
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        height: 10,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    forms: {
        fontSize: Responsive.font(14),
        padding: 8,
        paddingLeft:20,
        width: '95%',
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius:50,
        backgroundColor:'white',
        height: 50,
        fontFamily: 'open-sans-bold',
        color: 'black',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    DateForms1:{
        justifyContent:'center',
        padding: 8,
        paddingLeft:20,
        width: '95%',
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius:50,
        backgroundColor:'white',
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    forms1: {
        // fontSize: 19,
        padding: 8,
        paddingLeft:20,
        width: '95%',
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius:50,
        backgroundColor:'white',
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        
    },
    regButton1: {
        fontSize:Responsive.font(16),
        fontFamily: 'open-sans-bold',
        color: 'white',
    },
    regButton: {
        fontFamily: 'open-sans-bold',
        
        //width: Dimensions.get('window').width - 105,
        alignItems: 'center',
        backgroundColor: '#48D5A0',
        paddingTop:5,
        paddingBottom:5,
        marginBottom:5,
        borderRadius: 100,
        marginTop: 20,
        paddingLeft:50,
        paddingRight:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

    },
    reg: {
        textDecorationLine: 'underline',
        color: '#48A080',
        fontWeight: 'bold',

        fontFamily: 'open-sans-simple',
        fontSize: 20
    },
    reg1: {
        fontFamily: 'open-sans-bold',
        color: 'white',
        fontSize:Responsive.font(22),
        textDecorationLine:'underline',
        textShadowOffset:{width:1, height:1},
        textShadowColor:'black',
        textShadowRadius:2

    }

});