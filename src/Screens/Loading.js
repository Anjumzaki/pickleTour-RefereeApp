import React, { Component } from 'react';
import { StyleSheet,View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import firebase from 'firebase';


class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
      firebase.auth().onAuthStateChanged(user =>{
          this.props.navigation.navigate(user? 'MainTabs':'Login')
          // console.log('USER',user.uid)
      })
  }

  render() {
    return (
     <ImageBackground style={{width: '100%', height: '100%', justifyContent:'center'}} source={require('../../assets/splash.png')}>
            <ActivityIndicator size='large'/>
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