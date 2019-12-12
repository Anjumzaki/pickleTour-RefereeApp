import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import EventCards from './EventCards'

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actScr: 1
        };
    }
    login() {

        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }

    render() {
        console.log("state", this.state)
        return (
            <View>
                <View style={styles.wrapTopSty}>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 1 })} style={this.state.actScr == 1 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={styles.topBarText}>  Completed Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={styles.topBarText}>  Ongoing Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={styles.topBarText}>  Upcoming Events </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>
                <ScrollView style={{  marginBottom: 50 }}>
                    {this.state.actScr == 1 ? <View style={{ padding: 10 }}>
                        <EventCards />
                        <EventCards />
                        <EventCards />
                        <EventCards />
                    </View> : null}
                    {this.state.actScr == 2 ? <View style={{ padding: 10 }}>
                        <EventCards />
                        <EventCards />
                        <EventCards />
                        <EventCards />
                        <EventCards />
                        <EventCards />
                        <EventCards />
                        <EventCards />
                    </View> : null}
                    {this.state.actScr == 3 ? <View style={{ padding: 10 }}>
                        <EventCards />
                    </View> : null}
                </ScrollView>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    topBarSty: {
        height: 40,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    wrapTopSty: {
        backgroundColor: '#686868',
        flexDirection: 'row',
    },
    topBarText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
    },
    topBarStyAct: {
        height: 40,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#48A080'
    },
    divider: { width: '100%', height: 10, backgroundColor: 'white' }
});