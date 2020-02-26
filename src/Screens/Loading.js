import React, { Component } from 'react';
import { AsyncStorage, StyleSheet,ActivityIndicator, Image } from 'react-native';
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
  
      }catch(error){
        console.log(error)
      }
}
  NavigateScreen(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        setTimeout(()=>{
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
      }
    })
  }
  componentDidMount(){
    setTimeout(() => {
      this.NavigateScreen()
    }, 1000);    
  }

  render() {
    return (
      <LinearGradient  colors={[ '#86D6B9','#48A080',]}style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#86d6b9' }}>
        <Image resizeMode='contain' style={{ height:'50%', marginBottom:100, width: '85%'}} source={require('../../assets/NLogo.png')}/>
        <ActivityIndicator size='large' style={{flex:1, alignSelf:'center'}} color='#86D6B9'/>
      </LinearGradient>
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