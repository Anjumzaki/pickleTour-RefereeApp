import React from 'react';
import { Modal, View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Responsive from 'react-native-lightweight-responsive';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';
export default class ToBeRequestedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1',
            modalVisible:false
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
        // console.log(this.props.data.division)
    }
    closeModal(){
        this.setState({modalVisible:false})
    }
    request(){
        this.setState({modalVisible:true})
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
        console.log(this.props.user)
        return (
            <View style={styles.cardStyles}>
                <Modal animationType='slide'
                       visible={this.state.modalVisible}>
                           <View style={{flex:1, alignContent:'center', alignItems:'center',justifyContent:'center', backgroundColor: '#86d6b9' }}>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} placeholder="Name" placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} placeholder="Email Address" placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} placeholder="Phone Number" placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} placeholder="Address" placeholderTextColor={'gray'}/>
                                <TouchableOpacity onPress={()=>console.log('Pressed')} style={{fontFamily: 'open-sans-simple',
                                                                                                width: Dimensions.get('window').width - 105,
                                                                                                alignItems: 'center',
                                                                                                backgroundColor: '#48A080',
                                                                                                padding: 10,
                                                                                                borderRadius: 100,
                                                                                                marginTop: 60,}}>
                                    <Text style={{color:'white',fontFamily:'open-sans-simple',fontSize:Responsive.font(22)}}>Confirm</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={()=>this.setState({modalVisible:false})} style={{fontFamily: 'open-sans-simple',
                                                                                                            width: Dimensions.get('window').width - 105,
                                                                                                            alignItems: 'center',
                                                                                                            backgroundColor: '#48A080',
                                                                                                            padding: 10,
                                                                                                            borderRadius: 100,
                                                                                                            marginTop: 20,}}>
                                    <Text style={{color:'white',fontFamily:'open-sans-simple',fontSize:Responsive.font(22)}}>Close</Text>
                                    </TouchableOpacity>
                           </View>
                        

                </Modal>
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
                        <TouchableOpacity onPress={()=>this.request()} style={{backgroundColor:'#2E8465', borderRadius:10, borderWidth:1, borderColor:'white', paddingHorizontal:15, paddingVertical:2}}>
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
        fontSize: Responsive.font(12)

    },
    buttonText:{
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(10)

    },
    inHead: {
        color: '#DCDCDC',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(12)

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