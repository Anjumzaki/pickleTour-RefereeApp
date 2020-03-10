import React,{Component} from 'react';
import { Image, TouchableOpacity, Platform, Dimensions, View, Text,AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
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
import RefereeRequestDetails from './Screens/RefereeRequestDetails';
import MyEventsScreen from './Screens/ManageEvents/MyEvents';
import RequestedEventsScreen from './Screens/ManageEvents/RequestedEvents';
import Responsive from 'react-native-lightweight-responsive';
import MyInvitationsScreen from './Screens/ManageEvents/MyInvitations';
import CompletedEventsScreen from './Screens/Dashboard/CompletedEvents';
import UpcomingEventsScreen from './Screens/Dashboard/UpcomingEvents';
import OnGoingEventsScreen from './Screens/Dashboard/OnGoingEvents';
import FindEventsScreen from './Screens/FindEvents';




global.currentScreenIndex = 0;

console.ignoredYellowBox = ['Warning: Each', "Warning: Failed prop type"];
console.disableYellowBox = true;

class NavigationDrawerStructure extends Component {
  
  componentDidMount(){
      this.getUserData()
    }
    async getUserData(){
      try{
        let user = await AsyncStorage.getItem('userProfileData')
        //this.data= JSON.parse(user)
      }catch(error){
        alert(error)
      }
    }
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

  const headerWithTitleManageEvents = navigation => {
    return {
      headerStyle: { backgroundColor: '#48A080' },
      headerTintColor: 'white',
      headerRight: (
        <Text></Text>
      ),
      headerTitleStyle: { alignSelf: 'center' , textAlign:"center", flex:0.8 },
      headerLeft: (
        <NavigationDrawerStructure navigationProps={navigation} />),
      headerTitle: (
        <Text style={{ color: 'white',fontFamily:'open-sans-bold', fontSize: Responsive.font(20) }}>Manage Events</Text>),
      headerTitleContainerStyle:
      {
        justifyContent: "center"
      }
    }
  }

  const headerWithTitleDashboard = navigation => {
    return {
      headerStyle: { backgroundColor: '#48A080' },
      headerTintColor: 'white',
      headerRight: (
        <Text></Text>
      ),
      headerTitleStyle: { alignSelf: 'center' , textAlign:"center", flex:0.8 },
      headerLeft: (
        <NavigationDrawerStructure navigationProps={navigation} />),
      headerTitle: (
        <Text style={{ color: 'white',fontFamily:'open-sans-bold', fontSize: Responsive.font(20) }}>Dashboard</Text>),
      headerTitleContainerStyle:
      {
        justifyContent: "center"
      }
    }
  }


  const DashboardStack = createMaterialTopTabNavigator(
    {
      CompletedEvents:{
        screen:CompletedEventsScreen,
        navigationOptions:{
            header:null
        }
      },
      OnGoingEvents:{
        screen:OnGoingEventsScreen,
        navigationOptions:{
            header:null
        }
      },
      UpcomingEvents:{
        screen:UpcomingEventsScreen,
        navigationOptions:{
            header:null
        }
      },
    },{
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarLabel:({focused})=>{
          const { routeName } = navigation.state;
          let label;
          switch(routeName) {
            case 'CompletedEvents':
              return label = focused ? <Text style={{color:'#9EEACE',fontFamily: 'open-sans-bold',textDecorationLine:'underline',fontSize:Responsive.font(11)}}>Completed Events</Text> : <Text style={{color:'white', fontFamily: 'open-sans-bold',fontSize:Responsive.font(11)}}>Completed Events</Text>
            case 'OnGoingEvents':
              return label = focused ? <Text style={{color:'#9EEACE',fontFamily: 'open-sans-bold',textDecorationLine:'underline',fontSize:Responsive.font(11)}}>Ongoing Events</Text> : <Text style={{color:'white', fontFamily: 'open-sans-bold',fontSize:Responsive.font(11)}}>Ongoing Events</Text>
            case 'UpcomingEvents':
              return label = focused ? <Text style={{color:'#9EEACE',fontFamily: 'open-sans-bold',textDecorationLine:'underline',fontSize:Responsive.font(11)}}>Upcoming Events</Text> : <Text style={{color:'white', fontFamily: 'open-sans-bold',fontSize:Responsive.font(11)}}>Upcoming Events</Text>
          }
          return label
        },
  
      }),
      tabBarOptions: {
        activeTintColor: '#9EEACE',
        inactiveTintColor: '#263238',
        showIcon: false,
        showLabel: true,
        indicatorStyle: {
          borderBottomColor: "#686868",
          borderBottomWidth: 4
        },
        style: {
          backgroundColor: "#686868"
        },
      },
    }
  );
  
  const ManageEventsStack = createMaterialTopTabNavigator(
    {
      MyEvents:{
        screen:MyEventsScreen,
        navigationOptions:{
            header:null
        }
      },
      RequestedEvents:{
        screen:RequestedEventsScreen,
        navigationOptions:{
            header:null
        }
      },
      MyInvitations:{
        screen:MyInvitationsScreen,
        navigationOptions:{
            header:null
        }
      },
    },{
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarLabel:({focused})=>{
          const { routeName } = navigation.state;
          let label;
          switch(routeName) {
            case 'MyEvents':
              return label = focused ? <Text style={{color:'#9EEACE',fontFamily: 'open-sans-bold',textDecorationLine:'underline',fontSize:Responsive.font(11)}}>My Events</Text> : <Text style={{color:'white', fontFamily: 'open-sans-bold',fontSize:Responsive.font(11)}}>My Events</Text>
            case 'RequestedEvents':
              return label = focused ? <Text style={{color:'#9EEACE',fontFamily: 'open-sans-bold',textDecorationLine:'underline',fontSize:Responsive.font(11)}}>Requested Events</Text> : <Text style={{color:'white', fontFamily: 'open-sans-bold',fontSize:Responsive.font(11)}}>Requested Events</Text>
            case 'MyInvitations':
              return label = focused ? <Text style={{color:'#9EEACE',fontFamily: 'open-sans-bold',textDecorationLine:'underline',fontSize:Responsive.font(11)}}>My Invitations</Text> : <Text style={{color:'white', fontFamily: 'open-sans-bold',fontSize:Responsive.font(11)}}>My Invitations</Text>
          }
          return label
        },
  
      }),
      tabBarOptions: {
        activeTintColor: '#9EEACE',
        inactiveTintColor: '#263238',
        showIcon: false,
        showLabel: true,
        indicatorStyle: {
          borderBottomColor: "#686868",
          borderBottomWidth: 4
        },
        style: {
          backgroundColor: "#686868"
        },
      },
    }
  );
  
  const MainStack = createStackNavigator({
    Dashboard:{
        screen:DashboardStack,
        navigationOptions:({ navigation }) =>{
            return headerWithTitleDashboard(navigation)
        }
      },
    FindEvents:{
        screen:HomePage,
        navigationOptions:({ navigation }) =>{
            return headerWithTitle(navigation)
        }
    },
    ManageEvents:{
      screen:ManageEventsStack,
      navigationOptions:({navigation})=>{
        return headerWithTitleManageEvents(navigation)
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
    },
  


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
    drawerWidth: Dimensions.get('window').width / 1.4,
    drawerPosition: "left"
    //edgeWidth: Platform.OS === 'ios' ? undefined :  Dimensions.get("window").width-50,
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