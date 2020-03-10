import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';
import Responsive from 'react-native-lightweight-responsive';
import { LinearGradient } from 'expo-linear-gradient';
import {Icon} from 'native-base';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.itemDeleted=false
    this.data=''
    this.state = {
      modalVisible: false,
      parsedData:''
    }
    this.items = [
      {
        navOptionIconType: "MaterialIcons", 
        navOptionIconName:"dashboard",
        navOptionName: 'Dashboard',
        screenToNavigate: 'Dashboard',
       },
      {
        navOptionIconType: "MaterialIcons", 
        navOptionIconName:"find-in-page",
        navOptionName: 'Find Events',
        screenToNavigate: 'FindEvents',
      },
      {
        navOptionIconType: "MaterialIcons", 
        navOptionIconName:"settings",
        navOptionName: 'Manage Events',
        screenToNavigate: 'ManageEvents',
      },

      // {
      //   navOptionThumb: require('../assets/Blog_gray.png'),
      //   navOptionName: 'My Profile',
      //   screenToNavigate: 'BlogPosting',
      // },
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
  UNSAFE_componentWillMount(){
    this.getUserData()
  }

  async getUserData(){
    try{
      let user = await AsyncStorage.getItem('userProfileData')
      this.data= JSON.parse(user)
    }catch(error){
      alert(error)
    }
  }

  UserLogout(){
    firebase.auth().signOut().then(function() {
      this.props.navigation.closeDrawer()
      AsyncStorage.removeItem('userProfileData')
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Auth' })],
    }))
    }).catch(function(error) {
    });
  }

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        <LinearGradient 
        colors={['#86D6B9','#48A080', ]}
        style={{ backgroundColor: '#48A080', width: '100%', margin: 0, paddingTop: 40, paddingBottom:40, paddingLeft:20, paddingRight:20 }}>
        
          <Image
            source={require('../assets/User_Icon.png')}
            style={{ width: 50, height: 50,borderRadius:100,marginTop:20 }}
          />
          <Text style={{fontSize:Responsive.font(23),color:'white',fontFamily: 'open-sans-bold'}}>{this.data.firstName}</Text>
          <Text style={{fontSize:Responsive.font(15),color:'white',fontFamily: 'open-sans-bold'}}>{this.data.email}</Text>
        </LinearGradient>
       
        
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
          }}
        />
        
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <TouchableOpacity onPress={() => {
              global.currentScreenIndex = key;
              this.props.navigation.navigate(item.screenToNavigate,this.data);              
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
                <Icon type={item.navOptionIconType} name={item.navOptionIconName}  style={{ alignSelf:'center',fontSize:Responsive.font(25) ,color: '#585858'}}/>
                </View>
                <Text
                  style={{
                    fontSize:Responsive.font(15) ,
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
              <Icon type="SimpleLineIcons" name="logout"  style={{ alignSelf:'center',fontSize:Responsive.font(25) ,color: '#585858'}}/>
              </View>
              <Text 
                style={{
                    fontSize:Responsive.font(15) ,
                    color: 'black',
                    fontFamily: 'open-sans-bold',
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
    // alignItems: 'center',
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