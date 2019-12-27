import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ActivityIndicator,SafeAreaView, ScrollView, AsyncStorage, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import Responsive from 'react-native-lightweight-responsive';
import EventCards from './EventCards'
import axios from 'axios'
export default class MainScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.userId=''
        this.state = {
            actScr: 1,
            seLoc: '',
            compData: [],
            upData:[],
            onData:[],
            dataOneLoaded:false,
            dataTwoLoaded:false,
            dataThreeLoaded:false,
            loading: true,
            dataFound: false,
        };
    }
    componentDidMount(){
        this.getItem()
    }
    
    async getItem(){
        try{
            this.userId =await AsyncStorage.getItem('userId')
            // this.getAllData(this.userId)
            this.getOneData(this.userId)
            this.getTwoData(this.userId)
            this.getThreeData(this.userId)
            // console.log('User ID:  ',this.userId)
        }catch (error){
            console.log('error')
        }
    }

    getOneData= (userId)=>{

        // var prevData = []
        // var con = this.state.counter
        // if(this.state.dropChanged){
        //     this.setState({
        //         dataOneLoaded
        //         // loading:true,
        //         // dataFound:false,
        //         // counter:0,
        //         // dropChanged:false

        //     })
        //     con = 0
        // }
        // else{
        //     prevData = this.state.tourData
        // }

        var newData = [];
       //var gettingUrl = 'https://pickletour.appspot.com/api/get/completed/Events/'+this.userId
        var gettingUrl = 'http://pickletour.com/api/get/league/page/0'
        
        axios.get(gettingUrl)
        .then((response)=>{
            newData = response.data
            // console.log(newData)
            var allData = [...newData]
            // var con = this.state.counter
            if (newData.length > 0) {
                this.setState({
                    compData: allData,
                    // loading: false,
                    dataOneLoaded:true,
                    // counter: con + 1
                })
            }
            else {
                this.setState({
                    // tourData: allData,
                    // loading: false,
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
            // console.log(newData)
            var allData = [...newData]
            // var con = this.state.counter
            if (newData.length > 0) {
                this.setState({
                    onData: allData,
                    // loading: false,
                    dataTwoLoaded:true,
                    // counter: con + 1
                })
            }
            else {
                this.setState({
                    // tourData: allData,
                    // loading: false,
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
            // console.log(newData)
            var allData = [...newData]
            // var con = this.state.counter
            if (newData.length > 0) {
                this.setState({
                    upData: allData,
                    // loading: false,
                    dataThreeLoaded:true,
                    // counter: con + 1
                })
            }
            else {
                this.setState({
                    // tourData: allData,
                    // loading: false,
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
                        <Text style={this.state.actScr==1?styles.selectedtopBarText:styles.topBarText}>Completed Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==2?styles.selectedtopBarText:styles.topBarText}>Ongoing Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==3?styles.selectedtopBarText:styles.topBarText}>Upcoming Events </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>
                {/* <ScrollView style={{  marginBottom: 50 }}> */}
                    {this.state.actScr == 1 ? 
                        <View style={{ padding: 10 }}>
                            {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:100}}
                                keyExtractor={item => item._id}
                                data ={this.state.compData}
                                renderItem={({item})=>(
                                    // <TouchableOpacity onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                    <EventCards navigation={this.props.navigation} data={item}/>
                                    // </TouchableOpacity>
                                )}
                            />:<ActivityIndicator/>}
                               
                            
                            
                            {/* <EventCards />
                            <EventCards />
                            <EventCards /> */}
                        </View> : null}
                    {this.state.actScr == 2 ? <View style={{ padding: 10 }}>
                    {this.state.dataTwoLoaded?<FlatList
                                style={{marginBottom:100}}
                                keyExtractor={item => item._id}
                                data ={this.state.onData}
                                renderItem={({item})=>(
                                    // <TouchableOpacity onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                    <EventCards navigation={this.props.navigation} data={item}/>
                                    // </TouchableOpacity>
                                )}
                            />:<ActivityIndicator/>}
                    </View> : null}
                    {this.state.actScr == 3 ? <View style={{ padding: 10 }}>
                    {this.state.dataThreeLoaded?<FlatList
                                style={{marginBottom:100}}
                                keyExtractor={item => item._id}
                                data ={this.state.upData}
                                renderItem={({item})=>(
                                    // <TouchableOpacity onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                    <EventCards navigation={this.props.navigation} data={item}/>
                                    // {/* </TouchableOpacity> */}
                                )}
                            />:<ActivityIndicator/>}
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
        // backgroundColor: '#48A080',
    },
    divider: { width: '100%', height: 10, backgroundColor: 'white' }
});