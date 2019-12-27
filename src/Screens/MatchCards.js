import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions,withNavigation  } from 'react-navigation';
import Responsive from 'react-native-lightweight-responsive';

export default class MatchCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actScr: '1'
        };
    }
    // login() {
    //     // this.props.navigation.navigate('MainTabs')
    //     this.props.navigation.dispatch(StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
    //     }))
    // }
    render() {
        console.log('----------------------------------------------------------------------------------------------------------')
        console.log(this.props.data)
        // console.log('saeedi')
        // console.log(this.props.navigation.state.params.item)
        return (
            <View style={styles.cardStyles}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={styles.mcde}>Match No 1 </Text>
                        <Text style={styles.mcde}>Court No 1</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }} >
                            <Text style={styles.head}>Date: </Text>
                            <Text style={styles.inHead}>12-10-2019</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }} >
                            <Text style={styles.head}>Start Time: </Text>
                            <Text style={styles.inHead}>09:00 AM</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#99C5B5', marginBottom: 10, marginTop: 10 }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '48%', marginRight: '4%' }}>
                        <View style={styles.teamName} >
                            <Text style={styles.head}>Team A - </Text>
                            <Text style={styles.head}>Alpha </Text>
                        </View>
                        <View style={styles.teamNames} >
                            <Text style={styles.head1}>Anjum Muneer </Text>
                        </View>
                    </View>
                    <View style={{ width: '48%' }}>
                        <View style={styles.teamName} >
                            <Text style={styles.head}>Team B - </Text>
                            <Text style={styles.head}>Beeta </Text>
                        </View>
                        <View style={styles.teamNames} >
                            <Text style={styles.head1}>Aijaz Ali </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#99C5B5', marginBottom: 10, marginTop: 10 }} />

                    
                    <View style={{ flexDirection: 'row', width: '100%', marginRight: 10 ,justifyContent:'flex-end'}} >
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('ScoreCard',this.props.navigation.state.params.item) }style={styles.mySBtn}>
                            <Text style={styles.myStext}> Start Match</Text>
                        </TouchableOpacity>
                    </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        width: '100%',
        backgroundColor: '#48A080',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginBottom: 10
    },
    head: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: Responsive.font(12)
    },
    head1: {
        color: 'black',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(12)
    },
    inHead: {
        color: '#DCDCDC',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(12)
    },
    mySBtn: {
        backgroundColor: '#2E8465',
        color:'white',
        borderWidth:1,
        borderColor:'white',
        padding: 4,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        alignContent: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    mcde: {
        color: 'white',
        backgroundColor: '#5D5D5D',
        padding: 3,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        fontWeight: 'bold',
        height: 28,
        
        fontSize: Responsive.font(11)
    },
    teamName: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#2E8465',
        padding: 5
    },
    teamNames: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ECECEC',
        padding: 5,
        color: 'black'
    },
    myStext:{
        color:'white',
        fontSize: Responsive.font(12)
    }


});