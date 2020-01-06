import React from 'react';
import { ActivityIndicator,FlatList,AsyncStorage, View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import EventCardsMa1 from './EventCardsMa1'
import EventCardsMa2 from './EventCardsMa2'
import Responsive from 'react-native-lightweight-responsive';
import EventCardsMa3 from './EventCardsMa3'
import axios from 'axios';


export default class MainScreen extends React.Component {
    static navigationOptions = {
        header: null,
        
    }
    constructor(props) {
        super(props);
        this.data=''
        this.state = {
            actScr: 1,
            eventsData:[],
            reqData:[],
            inviData:[],
            dataOneLoaded:false,
            dataTwoLoaded:false,
            dataThreeLoaded:false
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
        this.getItem()
    }
    async getItem(){

        
            try{
                let user = await AsyncStorage.getItem('userProfileData')
                // console.log('Here',user)
                this.data= JSON.parse(user)
                // console.log(this.data)
                this.getMyEvents(this.data.uid)
          
              }catch(error){
                console.log(error)
              }
        
        // try{
        //     this.userId =await AsyncStorage.getItem('userId')
        //     // this.getAllData(this.userId)
        //     this.getOneData(this.userId)
        //     this.getTwoData(this.userId)
        //     this.getThreeData(this.userId)
        //     // console.log('User ID:  ',this.userId)
        // }catch (error){
        //     console.log('error')
        // }
    }


    getMyEvents(userId){
        var myEvents=[]
        var gettingUrl = 'http://pickletour.com/api/get/enroll/Events/'
        axios.get(gettingUrl+userId)
        .then((response)=>{
            myEvents = response.data
            console.log(myEvents)
            if(myEvents.length>0){
                this.setState({
                    eventsData:myEvents,
                    dataOneLoaded:true
                })
            }
            else{
                this.setState({
                    dataOneLoaded:false
                })
            }
        }).catch((error)=>{
            console.log(error)
        })

    }

    getOneData= (userId)=>{
        // console.log('here')
        var newData = [];
        var gettingUrl = 'http://pickletour.com/api/get/league/page/0'
        
        axios.get(gettingUrl)
        .then((response)=>{
            newData = response.data
            var allData = [...newData]
            if (newData.length > 0) {
                this.setState({
                    eventsData: allData,
                    dataOneLoaded:true,
                })
            }
            else {
                this.setState({
                    dataOneLoaded:false,
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }


    getTwoData= (userId)=>{
       

        var newData = [];
       
        var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
        
        axios.get(gettingUrl)
        .then((response)=>{
            newData = response.data
            var allData = [...newData]
            if (newData.length > 0) {
                this.setState({
                    reqData: allData,
                    dataTwoLoaded:true,
                })
            }
            else {
                this.setState({
                    dataTwoLoaded:false,
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }



    getThreeData= (userId)=>{
       

        var newData = [];
       
        var gettingUrl = 'http://pickletour.com/api/get/recreational/page/0'
        
        axios.get(gettingUrl)
        .then((response)=>{
            newData = response.data
            var allData = [...newData]
         
            if (newData.length > 0) {
                this.setState({
                    inviData: allData,
                 
                    dataThreeLoaded:true,
                 
                })
            }
            else {
                this.setState({
                    dataThreeLoaded:false,
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    
    render() {
        // console.log("state", this.state)
        return (
            <View>
                <View style={styles.wrapTopSty}>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 1 })} style={this.state.actScr == 1 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==1?styles.selectedtopBarText:styles.topBarText}>My Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==2?styles.selectedtopBarText:styles.topBarText}>Requested Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==3?styles.selectedtopBarText:styles.topBarText}>My Invitatios </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>
                {/* <ScrollView style={{ marginBottom: 50 }}> */}
                    {this.state.actScr == 1 ? <View style={{ padding: 10 }}>
                        

                        {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:100}}
                                data ={this.state.eventsData}
                                keyExtractor={item => item._id}
                                renderItem={({item})=>(
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetails',{item}) }}>
                                    <EventCardsMa1 data={item}/>
                                </TouchableOpacity>
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color="#48A080" />
                        </View>}

                    </View> : null}
                    {this.state.actScr == 2 ? <View style={{ padding: 10 }}>
                    {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:100}}
                                data ={this.state.reqData}
                                keyExtractor={item => item._id}
                                renderItem={({item})=>(
                                    <EventCardsMa2  />
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color="#48A080" />
                        </View>}
                    </View> : null}
                    {this.state.actScr == 3 ? <View style={{ padding: 10 }}>
                    {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:100}}
                                keyExtractor={item => item._id}
                                data ={this.state.inviData}
                                renderItem={({item})=>(
                                    <EventCardsMa3 />
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color="#48A080" />
                        </View>}
                    </View> : null}
                {/* </ScrollView> */}
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
        fontSize:Responsive.font(12)
    },
    selectedtopBarText:{
        color:'#8ACCB4',
        fontFamily: 'open-sans-bold',
        textDecorationLine:'underline',
        fontSize:Responsive.font(12)
    },
    topBarStyAct: {
        height: 40,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    divider: { width: '100%', height: 10, backgroundColor: 'white' }
});