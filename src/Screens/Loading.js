import React, { Component } from 'react';
import { AsyncStorage, StyleSheet,View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import firebase from 'firebase';


class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
      //AsyncStorage.clear()
      firebase.auth().onAuthStateChanged(user =>{
        if(user){
          setTimeout(()=>{
              this.props.navigation.navigate('MainTabs')
          },3000)
        }  
        else{
          this.props.navigation.navigate('Login')
        }
        //this.props.navigation.navigate(user? 'MainTabs':'Login')
          // console.log('USER',user.uid)
      })
  }

  render() {
    return (
     <ImageBackground style={{width: '100%', height: '100%', justifyContent:'center'}} source={require('../../assets/splash.png')}>
            <ActivityIndicator size='large' style={{flex:1, alignSelf:'center'}}/>
     </ImageBackground>
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