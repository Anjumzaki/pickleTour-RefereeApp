import React, { Component } from 'react';
import { AsyncStorage, StyleSheet,View, Text, ActivityIndicator, ImageBackground, Image } from 'react-native';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';



class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.data=''
    this.state = {
    };
  }


  async getUserData(){
    try{
        let user = await AsyncStorage.getItem('userProfileData')
        // console.log('Here',user)
        this.data= JSON.parse(user)

        if(this.data.length>0){
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
        }
        else{
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        }))
        }
        // console.log(this.data)
  
      }catch(error){
        console.log(error)
      }
}
  NavigateScreen(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        setTimeout(()=>{
            // this.props.navigation.navigate('MainTabs')
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
          }))
        },3000)
      }  
      else{
         this.props.navigation.dispatch(StackActions.reset({
                          index: 0,
                          actions: [NavigationActions.navigate({ routeName: 'Login' })],
                      }))
        // this.props.navigation.navigate('Login')
      }
      //this.props.navigation.navigate(user? 'MainTabs':'Login')
        // console.log('USER',user.uid)
    })
  }
  componentDidMount(){
    setTimeout(() => {
      this.NavigateScreen()
    }, 1000);
      //AsyncStorage.clear()

      // setTimeout(()=>{
      //   firebase.auth().onAuthStateChanged(user=>{
      //     if(user){
      //        this.props.navigation.navigate('MainTabs')

      //     }
      //     else{
      //       this.props.navigation.dispatch(StackActions.reset({
      //         index: 0,
      //         actions: [NavigationActions.navigate({ routeName: 'Login' })],
      //     }))
      //     }
      //   })



      // },3000)
     
  }

  render() {
    return (
      <LinearGradient  colors={[ '#86D6B9','#48A080',]}style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#86d6b9' }}>
        <Image resizeMode='contain' style={{ height:'50%', marginBottom:100, width: '85%'}} source={require('../../assets/NLogo.png')}/>
        <ActivityIndicator size='large' style={{flex:1, alignSelf:'center'}} color='#86D6B9'/>
      </LinearGradient>
    //  <ImageBackground style={{width: '100%', height: '100%', justifyContent:'center'}} source={require('../../assets/splash.png')}>
    //         <ActivityIndicator size='large' style={{flex:1, alignSelf:'center'}}/>
    //  </ImageBackground>
    );
  }
}


export default LoadingScreen;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

{/* <View style={styles.container}>
<Text> Loading </Text>
<ActivityIndicator size='large'/>
</View> */}