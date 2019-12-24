import React from 'react';
import { View, Text, Button, TouchableHighlight, Image, Platform, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import MainScreen from './Screens/MainScreen'
import CustomSidebarMenu from './CustomSidebarMenu'
import HomePage from './Screens/HomePage'
import ManageEvents from './Screens/ManageEvents'
import EventDetails from './Screens/EventDetails'
import EventSummary from './Screens/EventSummary'
import ScoreCard from './Screens/ScoreCard'
import MatchCards from './Screens/MatchCards'
import LoadingScreen from './Screens/Loading';


const ManageEventsStack = createStackNavigator(
    {
        ManageEvents: ManageEvents,
        EventDetails: EventDetails,
        MatchCards:MatchCards,
        
    },
    {
        initialRouteName: 'ManageEvents',
    }
);

const ScoreCardStack = createStackNavigator({
    ScoreCard: {screen:ScoreCard, navigationOptions: {header: null}}
},
{
    initialRouteName: 'ScoreCard',
})
const MainScreenStack = createStackNavigator(
    {
        MainScreen: MainScreen,
        EventSummary: EventSummary,
        
    },
    {
        initialRouteName: 'MainScreen',
    }
);
const DrawerNavigator = createDrawerNavigator({
    HomePage,
    MainScreenStack,
    ManageEventsStack
},
{
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#86d6b9' },
        headerTintColor: 'white',
        headerLeft:
            <TouchableHighlight onPress={() => navigation.openDrawer()}>
                <Image style={{ width: 35, height: 35, marginLeft: 10 }} source={require('../assets/navigation.png')} />
            </TouchableHighlight >
    }),
    initialRouteName: 'MainScreenStack',
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: 'drawerOpen',
    drawerCloseRoute: 'drawerClose',
    drawerToggleRoute: 'drawerToggle',
});

const RootStack = createStackNavigator(
    {   
        Loading:{screen:LoadingScreen, navigationOptions: {header: null}},
        Login: Login,
        SignUp: SignUp,
        MainTabs: DrawerNavigator,
        ScoreCard:{screen:ScoreCardStack, navigationOptions: {header: null}}
    },
    {
        initialRouteName: 'Loading',
    }
);
const AppContainer = createAppContainer(RootStack);
export default AppContainer