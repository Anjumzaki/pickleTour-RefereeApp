import React from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator, AsyncStorage, FlatList, TouchableOpacity, Alert } from 'react-native';
import Responsive from 'react-native-lightweight-responsive';
import EventCards from '../EventCards'
import axios from 'axios'
import { withNavigation } from 'react-navigation'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import { ThemeConsumer } from 'react-native-elements';

class CompletedEventsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.userData=''
        this.userId=''
        this.state = {
            actScr: 1,
            seLoc: '',
            compData: [],
            upData:[],
            onData:[],
            dataOneLoaded:false,
            dateOneFetching:false,
            dataTwoLoaded:false,
            dataTwoFetching:false,
            dataThreeLoaded:false,
            dataThreeFetching:false,
            loading: true,
            dataFound: false,
            showButton:false,
            showMessage:false,
            showTwoMessage:false,
            showThreeMessage:false
        };
    }
//     sendPushNotifications = () =>{
//         let response = fetch('https://exp.host/--/api/v2/push/send',{
//             method:'POST',
//             headers:{
//                 Accept:'application/json',
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify({
//                 to:'ExponentPushToken[PaqkdbClpiSykGH5CuXDv5]',
//                 sound:'default',
//                 title:'Demo',
//                 body:'Notification'

//             }
// )            
//         })
//     }

    // registerForPushNotificationsAsync = async ()=>{
    //     const { status:existingStatus } = await Permissions.getAsync(
    //     Permissions.NOTIFICATIONS
    //     );
    //     let finalStatus =  existingStatus
    //     if(existingStatus!='granted'){
    //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    //     finalStatus = status
    //     }
    //     if(finalStatus !=='granted'){
    //     return
    //     }
    //     let token = await Notifications.getExpoPushTokenAsync();
    //     this.showingAlert(token)

    // }

   
    async componentDidMount(){
       
        // await this.registerForPushNotificationsAsync()
        this.getUserData()
        const {navigation}=this.props
        this.focusListener = navigation.addListener('didFocus',()=>{
            if(this.state.compData.length==0){
                this.getCompletedData()
            }
        })
    }
    componentWillUnmount(){
        this.focusListener.remove()
    }

    
    getCompletedData(){
        this.setState({dateOneFetching:true})
        var compEvents=[];
        var userId = this.userData.uid
        var gettingUrl = 'http://pickletour.com/api/get/completed/Events/'
        axios.get(gettingUrl+userId)
        .then((response)=>{
            compEvents = response.data
            if(compEvents.length>0){
                this.setState({
                    compData:compEvents,
                    dataOneLoaded:true,
                    dateOneFetching:false
                })
            }
            else{
                this.setState({
                    dataOneLoaded:false,
                    showMessage:true,
                    dateOneFetching:false
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    
    async getUserData(){
        try{
            let user = await AsyncStorage.getItem('userProfileData')
            let parsed = JSON.parse(user)
            this.userData= parsed
        }catch(error){
            console.log(error)
        }
    }
    

    render() {
        const {showMessage, showTwoMessage, showThreeMessage} = this.state
        return (
            <View>
                    
                        <View style={{ paddingTop:10 }}>
                            {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:100}}
                                keyExtractor={item => item._id}
                                refreshing={this.state.dateOneFetching}
                                onRefresh={()=>this.getCompletedData()}
                                data ={this.state.compData}
                                renderItem={({item})=>(
                                    <EventCards navigation={this.props.navigation} data={item} />
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                                    {showMessage?<Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Completed Events not found !</Text>: <ActivityIndicator size="large" color="#48A080" />}
                                </View>
                            }
                            
                        </View>
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
        color:'#9EEACE',
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

export default withNavigation(CompletedEventsScreen)