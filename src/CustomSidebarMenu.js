import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Button , AsyncStorage} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firebase from 'firebase';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.itemDeleted=false
    this.state = {
      modalVisible: false,
    }
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: require('../assets/Blog_gray.png'),
        navOptionName: 'Dashboard',
        screenToNavigate: 'MainScreen',
      },
      {
        navOptionThumb: require('../assets/Video_gray.png'),
        navOptionName: 'Find Events',
        screenToNavigate: 'HomePage',
      },
      {
        navOptionThumb: require('../assets/Contact_Us_gray.png'),
        navOptionName: 'Manage Events',
        screenToNavigate: 'ManageEvents',
      },

      {
        navOptionThumb: require('../assets/Blog_gray.png'),
        navOptionName: 'My Profile',
        screenToNavigate: 'BlogPosting',
      },
    ];
  }
  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }
  closeAndLogout() {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate('Login')
    this.props.navigation.closeDrawer()
  }

  UserLogout(){
    firebase.auth().signOut().then(function() {
      this.props.navigation.navigate('Login')
    }).catch(function(error) {
      // An error happened.
    });
  }

  // async deleteItem(){
  //   try{
  //     // await AsyncStorage.removeItem('userId');
  //     this.UserLogout()
  //   }catch(error){

  //   }
  // }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style={{ backgroundColor: '#48A080', alignItems:'center', width: '100%', margin: 0, padding: 20 }}>
        
          <Image
            source={require('../assets/User_Icon.png')}
            style={{ width: 50, height: 50,borderRadius:100,marginTop:20 }}
          />
          <Text style={{fontSize:23,color:'white',fontFamily: 'open-sans-bold'}}>Anjum Zaki</Text>
          <Text style={{fontSize:17,color:'white',fontFamily: 'open-sans-bold'}}>zakianjummuneer@gmail.com</Text>
        </View>
       
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <TouchableOpacity onPress={() => {
              global.currentScreenIndex = key;
              this.props.navigation.navigate(item.screenToNavigate);
            }}
              key={key}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: global.currentScreenIndex === key ?  '#86d6b9' : '#ffffff',
                }}

              >
                <View style={{ marginRight: 10, marginLeft: 20 }}>
                  <Image source={item.navOptionThumb} style={{ width: 30, height: 30 }} color="#808080" />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: global.currentScreenIndex === key ? 'white' : 'black',
                    fontFamily: 'open-sans-bold',
                  }}
                >
                  {item.navOptionName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => this.UserLogout()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: '#ffffff',
              }}

            >
              <View style={{ paddingRight: 10, paddingLeft: 20 }}>
                <Image source={require('../assets/logout_Gray.png')} style={{ width: 30, height: 30 }}  />
              </View>
              <Text 
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ff7400',
  },
  contentTitle:{
    fontSize:23
  },
  yesOrNO: {
    marginLeft: 20,
     marginRight: 20,
      marginTop: 30,
      borderRadius:20,
      width:50
  }
});