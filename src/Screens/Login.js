import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ActivityIndicator, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import Responsive from 'react-native-lightweight-responsive';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            isFetching:false,
            userName: '',
            Password: '',
            msg: "",
            userId:'',
            backtoLogin:false
        };
    }
    componentDidMount(){
        this.setState({
            userName:'',
            Password:''
        })
    }
    async letsHandleLogin(){
        try{
            this.setState({isFetching:true})
            const {userName, Password}= this.state
            let user = await firebase.auth().signInWithEmailAndPassword(userName,Password)
            let url = 'https://pickletour.appspot.com/api/user/get/'+ user.user.uid
            const res = await fetch(url)
            const data = await res.json()
            const newUser ={
                uid: data.uid,
                firstName:data.firstName,
                email: data.email,
                password: data.password,
                dateOfBirth: data.dateOfBirth,
                gender:data.gender,       
            }
            this.storingUserData(newUser)
            
        }catch(error){
            if(error.message.includes('There is no user record')){
                this.setState({isFetching:false,msg:'User not found.'})
            }
            else if(error.message.includes('The password is invalid or')){
                this.setState({isFetching:false,msg:'Incorrect email or password.'})
            }
            else if(error.message.includes('A network error')) {
                
                this.setState({isFetching:false,msg:'An unknown network error has occurred.'})
            }
            else{
                this.setState({isFetching:false,msg:'The email address is badly formatted.'})
            }
           
            
        }
    }

    async storingUserData(user){
        try{
            await AsyncStorage.setItem('userProfileData', JSON.stringify(user))
            setTimeout(()=>{
                this.setState({isFetching:false})
            },3000)
        }catch(error){
            console.log(error)
        }
    }

    render() {
        const { userName, Password  } =this.state
        const enabled = userName.length>0 && Password.length>0
        return (
            <LinearGradient           
            colors={['#86D6B9','#48A080', ]}
            start={[0.5, 0]}
            end={[0.5, 1]}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginTop: Dimensions.get('window').height/3.5}}>
                        <View style={styles.SectionStyle}>
                           <Image resizeMode='contain' style={{ height:'100%',marginBottom:100, width: '100%'}} source={require('../../assets/NLogo.png')}/>
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.forms}
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
                                onChangeText={Password => this.setState({ Password })}
                                value={this.state.Password}
                                placeholderTextColor={'gray'}

                                placeholder="Password"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry={true}
                            />
                        </View>

                        {
                            this.state.isFetching? <ActivityIndicator size='large'/>:
                            <TouchableOpacity onPress={() =>
                                this.letsHandleLogin()
                            } disabled={!enabled} style={{fontFamily: 'open-sans-bold',
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
                                <Text style={styles.regButton1} >Sign in</Text>
                            </TouchableOpacity>
                        
                        }
                          <View style={{marginTop:Dimensions.get('window').height/20}}>
                            <Text style={{color:'white', fontFamily:'open-sans-bold', fontSize:Responsive.font(16), alignSelf:'center', textAlign:'center'}}>
                                {this.state.msg}
                            </Text>
                        </View>
                        {/* <View style={{marginTop:20}}>
                            <Text style={styles.forgButton}>Forgot Password?</Text>
                        </View> */}
                      
                    </View>
                    <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 30, marginBottom: 30, opacity:0.6, width:'80%', alignSelf:'center' }} />
                    <View style={{ alignItems: 'center', marginTop:Dimensions.get('window').height/20 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                            <Text style={styles.reg1}>Don't have an account?</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingLeft: 20,
        width: '90%',
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius: 50,
        backgroundColor: 'white',
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
    regButton1: {
        fontSize:Responsive.font(16),
        fontFamily: 'open-sans-bold',
        color: 'white',
        
        
    },
    regButton: {
        fontFamily: 'open-sans-bold',
        
        //width: Dimensions.get('window').width - 105,
        alignItems: 'center',
        // backgroundColor: '#48D5A0',
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
        color: '#D0EEE3',
        fontSize:Responsive.font(16),
        textDecorationLine:'underline',
        

    },
    forgButton:{
        fontFamily: 'open-sans-bold',
        color: '#D0EEE3',
        fontSize:Responsive.font(16),
        // textShadowOffset:{width:0.5, height:0.5},
        // textShadowColor:'black',
        // textShadowRadius:1
        
    }
});