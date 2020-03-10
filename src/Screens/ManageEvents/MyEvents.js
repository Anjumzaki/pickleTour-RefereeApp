import React from 'react';
import { ActivityIndicator,FlatList,AsyncStorage, View, Text,  Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import EventCardsMa1 from '../EventCardsMa1'
import Responsive from 'react-native-lightweight-responsive';
import axios from 'axios';
import { withNavigation } from 'react-navigation'


class MyEventsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.data=''
        this.state = {
            actScr: 1,
            eventsData:[],
            reqData:[],
            inviData:[],
            dataOneLoaded:false,
            dataOneFetching:false,
            dataTwoLoaded:false,
            dataTwoFetching:false,
            dataThreeLoaded:false,
            dataThreeFetching:false,
            showMessage:false,
            showTwoMessage:false,
            showThreeMessage:false,
            userIdGlobal:null
        };
    }


    componentDidMount(){
        this.getItem()
        const {navigation}=this.props
        this.focusListener = navigation.addListener('didFocus',()=>{
            if(this.state.eventsData.length==0){
                this.getMyEvents()
            }
        })
        
    }
    componentWillUnmount(){
        this.focusListener.remove()
    }
    async getItem(){

        
            try{
                let user = await AsyncStorage.getItem('userProfileData')
                this.data= JSON.parse(user)
                
              }catch(error){
                console.log(error)
              }
    }
    
    getMyEvents(){
        var myEvents=[]
        this.setState({dataOneFetching:true})
        var userId = this.data.uid
        var gettingUrl = 'http://pickletour.com/api/get/enroll/Events/'
        axios.get(gettingUrl+userId)
        .then((response)=>{
            myEvents = response.data
            if(myEvents.length>0){
                this.setState({
                    eventsData:myEvents,
                    dataOneLoaded:true,
                    showMessage:false,
                    dataOneFetching:false
                })
            }
            else{
                this.setState({
                    dataOneLoaded:false,
                    showMessage:true,
                    dataOneFetching:false
                })
            }
        }).catch((error)=>{
            console.log(error)
        })

    }


       
    render() {
        const {showMessage, showTwoMessage, showThreeMessage} = this.state
        return (
            
                    <View style={{paddingTop:10,  }}>
                        

                        {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:90}}
                                data ={this.state.eventsData}
                                keyExtractor={item => item._id}
                                refreshing={this.state.dataOneFetching}
                                onRefresh={()=>this.getMyEvents()}
                                renderItem={({item})=>(
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetailsScreen',{item}) }}>
                                    <EventCardsMa1 data={item}/>
                                </TouchableOpacity>
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>

                            {showMessage?<Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>No Events found !</Text>: <ActivityIndicator size="large" color="#48A080" />}
                            
                            
                        
                                </View>}

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

export default withNavigation(MyEventsScreen)