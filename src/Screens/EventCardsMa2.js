import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
export default class EventCardsMa2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1'
        };
    }
    login() {
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }

    request(){
        
    }

    render() {
        // const tournament = this.props.data
        return (
            <View style={styles.cardStyles}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Name: </Text>
                        {/* <Text style={styles.inHead}>{tournament.tournamentName}</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row', width: '30%', marginRight: 20 }} >
                        <Text style={styles.head}>Date: </Text>
                        <Text style={styles.inHead}>12-10-2019</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }} >
                    <Text style={styles.head}>Address : </Text>
                    {/* <Text style={styles.inHead}>{tournament.address}</Text> */}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Event Type : </Text>
                        {/* <Text style={styles.inHead}>{tournament.type}</Text> */}
                    </View>

                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Division : </Text>
                        {/* <Text style={styles.inHead}>
                            {tournament.division ? tournament.division.map((item) => {
                                <Text>{item.nameOfDivision}</Text>
                            }) : null}
                        </Text> */}
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={styles.head}>REQUESTED </Text>
                    </View>
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
        fontSize: 15
    },
    inHead: {
        color: '#DCDCDC',
        fontFamily: 'open-sans-bold',
        fontSize: 14
    },
    mySBtn: {
        backgroundColor: 'white',
        padding: 4,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
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


});