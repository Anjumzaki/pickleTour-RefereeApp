import React,{Component} from 'react';
import { Image, TouchableOpacity, Platform, Dimensions, View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import MainScreen from './Screens/MainScreen'
import CustomSidebarMenu from './CustomSidebarMenu'
import HomePage from './Screens/HomePage'
import ManageEvents from './Screens/ManageEvents'
import EventDetails from './Screens/EventDetails'
import EventSummary from './Screens/EventSummary'
import ScoreCard from './Screens/ScoreCard'
import LoadingScreen from './Screens/Loading';
import RefereeRequest from './Screens/RefereeRequest';
import InvitationDetails from './Screens/InvitationDetails';
import EventDetailsTwo from './Screens/EventDetailsTwo';
import RefereeRequestDetails from './Screens/RefereeRequestDetails';


global.currentScreenIndex = 0;

console.ignoredYellowBox = ['Warning: Each', "Warning: Failed prop type"];
console.disableYellowBox = true;

class NavigationDrawerStructure extends Component {
    toggleDrawer = () => {
      this.props.navigationProps.toggleDrawer();
    }
  
    render() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)} style={{width: 70, alignItems: "flex-end", flexDirection: "row"}}>
            <Image
              source={require('../assets/navigation.png')}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      )
    }
  }

  const headerWithTitle = navigation => {
    return {
      headerStyle: { backgroundColor: '#48A080' },
      headerTintColor: 'white',
      headerRight: (
        // <NavigationDrawerStructure navigationProps={navigation} />
        <Text></Text>
      ),
      headerTitleStyle: { alignSelf: 'center' , textAlign:"center", flex:0.8 },
      headerLeft: (
        <NavigationDrawerStructure navigationProps={navigation} />),
      headerTitleContainerStyle:
      {
        justifyContent: "center"
      }
    }
  }

  const MainStack = createStackNavigator({
    Dashboard:{
        screen:MainScreen,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
      },
    FindEvents:{
        screen:HomePage,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
    },
    ManageEventsScreen:{
        screen:ManageEvents,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
    },
    EventDetailsScreen:{
        screen:EventDetails,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
    },
    RefereeRequestDetailsScreen:{
        screen:RefereeRequestDetails,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
    },
    EventSummaryScreen:{
        screen:EventSummary,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
    },
    RefereeRequestScreen:{
        screen:RefereeRequest,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
    },
    InvitationDetailsScreen:{
        screen:InvitationDetails,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
    },
    ScoreCardScreen:{
        screen:ScoreCard,
        navigationOptions: {
            header: null
        }
    }

  })

  const AuthStack = createStackNavigator({
    LoginScreen:{
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
    SignUpScreen:{
        screen:SignUp,
        navigationOptions:{
            header:null
        }
    },
  })

  const SplashStack = createStackNavigator({
    Splash: {
      screen: LoadingScreen,
      navigationOptions: {
        header: null
      }
    }
  })

  const DrawerNaigator= createDrawerNavigator({
      Home:{
          screen:MainStack
      }
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get('window').width / 1.6,
    drawerPosition: "left",
    edgeWidth: Platform.OS === 'ios' ? undefined :  Dimensions.get("window").width-15,
  })

  let Navigator = createAppContainer(
      createSwitchNavigator(
          {
              Splash: SplashStack,
              Auth:AuthStack,
              Drawer:DrawerNaigator
          },{
              initialRouteName:'Splash'
          }
      )
  )

  const AppContainer = createAppContainer(Navigator)
  export default AppContainer