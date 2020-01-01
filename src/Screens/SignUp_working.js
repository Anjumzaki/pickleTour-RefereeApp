import React from 'react';
import { Picker,View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Font from 'expo-font';
import DatePicker from 'react-native-datepicker'
import * as firebase from 'firebase';
import axios from 'axios';


export default class SignUp extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: 'masaeedi@gmail.com',
            userName: 'masaeedi',
            Password: '1234',
            confirmPass: '1234',
            msg: "",
            dob: '',
            gender:'',
            address:'',
        };
    }

    verifyDataBefore=()=>{
        if(this.state.address==='' || this.state.dob==='' || this.state.gender==='' || this.state.email ==='' || this.state.confirmPass==='' || this.state.email==='' || this.state.userName===''){
            this.setState({msg: 'Incomplete form !'})
        }
        else{
            this.handleSignUp()
        }
    }
    
    handleSignUp=()=>{
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.Password)
            .then((data)=>{
                const newUser ={
                    id: data.user.uid,
                    dateOfBirth: this.state.dob,
                    email: this.state.email,
                    password: this.state.confirmPass,
                }
                axios.post('http://pickletour.appspot.com/api/user/add',newUser)
                    .then(this.props.navigation.navigate('Login'))
                    
            }
            
            )
            .catch((error)=>{
                this.setState({msg:'Error occured please try again!'})
            })
    }

    login() {
        // console.log("login")
        // axios
        //     .post('https://blooming-ridge-94645.herokuapp.com/login',{
        //         userName: this.state.userName,
        //         password: this.state.Password
        //     })
        //     .then((response) => { 

        //         console.log("resp1",response.data)
        //         if(response.data === "match"){
        //             this.props.navigation.navigate('MainTabs')
        //             this.props.navigation.dispatch(StackActions.reset({
        //                 index: 0,
        //                 actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        //             }))
        //         }else if(response.data === "wrong"){
        //             this.setState({msg: "password is incorrect"})
        //         }
        //     }).catch((error) => { 
        //     console.log("mongodb get register error",error)
        //     this.setState({msg: "login info is incorrect"})
        //     })
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }

    showPicker = async (stateKey, options) => {
        try {
            const newState = {};
            const { action, year, month, day } = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                const date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
            }
            this.setState(newState);
        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };
    render() {
        // console.log("state", this.state)
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#86d6b9' }}>


                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}>
                        <View style={{flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginBottom:10, marginTop:80}}>
                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}
                                onChangeText={userName => this.setState({ userName })}
                                value={this.state.userName}
                                placeholder="User Name"
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
                                        fontSize: 19,
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
                                        fontSize: 19,
                                        color: 'gray'
                                    }
                                }}
                                onDateChange={dob => {
                                    this.setState({ dob });
                                }}
                            />

                           

                        </View>
                        

                        <View style={{borderWidth: 1,fontSize: 19, margin:10,
                                    borderColor: '#48A080',
                                    width: Dimensions.get('window').width - 105,
                                    borderRadius:20,
                                    backgroundColor:'white',
                                    // padding: 8,
                                    paddingLeft:10,height: 50,paddingRight:20, justifyContent:'center'}}>

                        
                        <Picker
                                selectedValue={this.state.gender}
                                style={{
                                    
                                   height:45,
                                    
                                    backgroundColor:'white',
                                    
                                    fontFamily: 'open-sans-bold',
                                    color: 'black'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ gender: itemValue})
                                }>
                                <Picker.Item label='Select Gender' value=""/>
                                <Picker.Item label='Male' value="male"/>
                                <Picker.Item label='Female' value="female"/>
                            </Picker>
                            </View>
                            <View style={{lexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,marginTop:10}}>
                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}

                                onChangeText={address=> this.setState({ address })}
                                value={this.state.address}
                                placeholder="Address"
                                keyboardType="email-address"
                                returnKeyType="done"
                            />
                        </View>

                        <TouchableOpacity onPress={() =>
                            this.verifyDataBefore()
                        } style={styles.regButton} >
                            <Text style={styles.regButton1} >REGISTER  </Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={{color:'#E48D6A', fontFamily:'open-sans-bold', fontSize:19}}>
                                {this.state.msg}
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop:15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.reg1}>  Already have an Account </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={styles.reg} >LOGIN </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <Button
                            title="Go to Sign up"
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        /> */}
                </KeyboardAwareScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 10

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
        fontSize: 19,
        padding: 8,
        paddingLeft:20,
        width: Dimensions.get('window').width - 105,
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius:50,
        backgroundColor:'white',
        height: 50,
        fontFamily: 'open-sans-bold',
        color: 'black'
    },
    forms1: {
        // fontSize: 19,
        padding: 8,
        paddingLeft:20,
        width: Dimensions.get('window').width - 105,
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius:50,
        backgroundColor:'white',
        height: 50,
        // color: 'black'
    },
    regButton1: {
        fontSize: 22,
        fontFamily: 'open-sans-simple',
        color: 'white'
    },
    regButton: {
        width: Dimensions.get('window').width - 105,
        alignItems: 'center',
        backgroundColor: '#48A080',
        padding: 10,
        borderRadius: 100,
        marginTop: 20

    },
    reg: {
        textDecorationLine: 'underline',
        color: '#48A080',
        fontWeight: 'bold',

        fontFamily: 'open-sans-simple',
        fontSize: 20
    },
    reg1: {
        fontFamily: 'open-sans-simple',
        color: 'white',
        fontSize: 20,

    }

});