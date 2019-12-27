import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';
export default class ToBeRequestedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1'
        };
    }
    // login() {
    //     this.props.navigation.navigate('MainTabs')
    //     this.props.navigation.dispatch(StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
    //     }))
    // }
    componentDidMount(){
        // console.log(this.props)
        console.log(this.props.data.division)
    }

    request(){
        //for creating a request for registration
        // Object ={
        //     address:  this.state.address,
        //     dob: this.state.dob,
        //     fName: this.state.fName,
        //     email: this.state.email,
        //     gender: this.state.gender,
        //     phone: this.state.phone,
        //     divisionName: this.state.divisionName,
        //     tournamentId: this.state.tournament._id,
        //     tournamentName: this.state.tournament.tournamentName,
        //     tournamentStartDate: this.state.tournament.tStartDate,
        //     address:  this.state.tournament.address,
        //     type:  this.state.tournament.type,                
        //     userId:  this.props.user.uid,
        //     isPaid: false
        // }

        // const refereeData={

        // }
        // var postingUrl = ''

        // axios.post(postingUrl,refereeData)
        // .then(()=>{

        // })
        // getData= (userId)=>{
       

        //     var newData = [];
           
        //     var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
            
        //     axios.get(gettingUrl)
        //     .then((response)=>{
        //         newData = response.data
        //         var allData = [...newData]
        //         if (newData.length > 0) {
        //             this.setState({
        //                 tourData: allData,
        //                 dataLoaded:true,
        //             })
        //         }
        //         else {
        //             this.setState({
        //                 dataLoaded:false,
        //             })
        //         }
        //     }).catch((error)=>{
        //         console.log(error)
        //     })
        // }


    }

    render() {
        const tournament = this.props.data
        return (
            <View style={styles.cardStyles}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Name: </Text>
                        <Text style={styles.inHead}>{tournament.tournamentName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '30%', marginRight: 20 }} >
                        <Text style={styles.head}>Date: </Text>
                        <Text style={styles.inHead}>12-10-2019</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }} >
                    <Text style={styles.head}>Address : </Text>
                    <Text style={styles.inHead}>{tournament.address}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Event Type : </Text>
                        <Text style={styles.inHead}>{tournament.type}</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Division : </Text>
                        <Text style={styles.inHead}>
                        {/* <Text>{tournament.nameofDivision}</Text> */}
                            {tournament.division ? tournament.division.map((item) => {
                                <Text>{item.nameOfDivision}</Text>
                            }) :<Text>{item.nameOfDivision}</Text>}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity onPress={()=>this.request()} style={{backgroundColor:'#2E8465', borderRadius:10, borderWidth:1, borderColor:'white', paddingHorizontal:6}}>
                            <Text style={styles.buttonText}>Request</Text>
                        </TouchableOpacity>
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
    buttonText:{
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 14
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