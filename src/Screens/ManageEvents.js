import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import EventCardsMa1 from './EventCardsMa1'
import EventCardsMa2 from './EventCardsMa2'
import EventCardsMa3 from './EventCardsMa3'



export default class MainScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
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
                        <Text style={styles.topBarText}>  My Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={styles.topBarText}>  Requested Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={styles.topBarText}>  My Invitatios </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>
                <ScrollView style={{ marginBottom: 50 }}>
                    {this.state.actScr == 1 ? <View style={{ padding: 10 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetails') }}>
                            <EventCardsMa1 />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetails') }}>
                            <EventCardsMa1 />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetails') }}>
                            <EventCardsMa1 />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetails') }}>
                            <EventCardsMa1 />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetails') }}>
                            <EventCardsMa1 />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetails') }}>
                            <EventCardsMa1 />
                        </TouchableOpacity>

                    </View> : null}
                    {this.state.actScr == 2 ? <View style={{ padding: 10 }}>
                        <EventCardsMa2 />
                        <EventCardsMa2 />
                        <EventCardsMa2 />
                        <EventCardsMa2 />
                        <EventCardsMa2 />

                        <EventCardsMa2 />
                        <EventCardsMa2 />
                        <EventCardsMa2 />
                        <EventCardsMa2 />
                        <EventCardsMa2 />
                    </View> : null}
                    {this.state.actScr == 3 ? <View style={{ padding: 10 }}>
                        <EventCardsMa3 />
                        <EventCardsMa3 />
                        <EventCardsMa3 />
                        <EventCardsMa3 />
                        <EventCardsMa3 />
                        <EventCardsMa3 />
                        <EventCardsMa3 />
                        <EventCardsMa3 />
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