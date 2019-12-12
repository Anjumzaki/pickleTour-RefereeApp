import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            userName: '',
            Password: '',
            msg: ""
        };
    }
    login(){

        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }

    render() {
        console.log("state",this.state)
        return (
            <Text> on Going Events</Text>
        );
    }
}