import React from 'react';
import { ActivityIndicator, View, Text, Button, BackHandler, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, FlatList, Modal, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
// import MatchCards from './MatchCards';
import axios from 'axios'
import Responsive from 'react-native-lightweight-responsive';
import {Icon} from 'native-base'


// tournament details and schedule----------------------------------------------
export default class InvitationDetails extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        // this.BracketTypes=null
        this.DivisionData=''
        this.state = {
            actScr: '1',
            tourData:[],
            dataLoaded:false,
            startDate:null,
            endDate:null,
            params:null,
            selectedValue:'',
            selectionModal:false,
            buttonDisabled:true,
            modalVisible:false,
            isSuccessFull:false,
            address:'',
            phoneNumber:'',
            incomData:false,
            submitted:false,
            arrayLocation:0,
            finallyComplete:false,

        };
    }
  
    componentDidMount(){    
        //this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const tournamentInfo = this.props.navigation.getParam('item')
        // console.log(tournamentInfo)
        // this.BracketTypes = bracketTypes
        let date=this.convertDate(tournamentInfo.tStartDate)
        this.setState({startDate:date})

        let endate=this.convertDate(tournamentInfo.tEndDate)
        this.setState({endDate:endate})
    }
    handleBackPress = () => {
        console.log('Here')
    }



    componentWillUnmount(){
        //this.backHandler.remove()

    }
    convertDate(date){
        var d= new Date(date)
        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
        var year = d.getFullYear()
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        return [day, month, year].join('/');
    }

   



    async sendingData(obj){
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }
        try{
            // console.log(obj)0
            let url ='https://pickletour.appspot.com/api/referee/register'
            const res = await fetch(url, config)
            const data = await res.json()
            // console.log(data)
            if(data.message =='referee Registered'){
                this.setState({finallyComplete:true})

                setTimeout(()=>{
                    //this.setState({modalVisible:false})
                    this.props.navigation.goBack()
                },3000)
            }
            //console.log(data)
        }catch(error){

        }
    }
    render() {
        const { state, navigate } = this.props.navigation;
        const user = this.props.navigation.getParam('user')

        const { address, phoneNumber, incomData, submitted, isSuccessFull, selected, finallyComplete } = this.state
    
        // console.log(this.BracketTypes)
        const tournamentInfo = this.props.navigation.getParam('item')
        
        return (
            <View>
                    <View style={{ padding: 10 }}>
                        <FlatList
                            
                            data ={this.state.tourData}
                            extraData={this.props}
                            keyExtractor={item => item._id}
                            ListHeaderComponent={()=>(
                                <View>
                                        <View style={styles.cardStyles}>
                                        <View style={{ flexDirection: 'row' , paddingLeft:10, paddingTop:10}}>
                                            <View style={{ }} >
                                                <Text style={styles.inHead}>{tournamentInfo.tournamentName}</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={{borderWidth:0.5,borderColor:'#CAECDF', marginTop:10, marginRight:10, marginLeft:10}}></View>
                                        <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
                                            <Icon type="MaterialIcons" name="date-range"  style={{ alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                            <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{this.state.startDate} - {this.state.endDate}</Text>
                                        </View>

                                        <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
                                            <Icon type="Entypo" name="location-pin"  style={{ alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                            <Text style={{fontSize:Responsive.font(11), width:'95%' ,color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{tournamentInfo.address}</Text>
                                        </View>
                                        <View style={{borderWidth:0.5,borderColor:'#CAECDF', marginTop:10, marginRight:10, marginLeft:10}}></View>
                                        <View style={{ flexDirection: 'row', paddingTop: 10 , paddingLeft:10}}>
                                            <View style={{ flexDirection: 'row', width: '50%' }} >
                                                <Text style={styles.head}>Event Type : </Text>
                                                <Text style={styles.detail}>{tournamentInfo.type}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingLeft:10 }}>
                                            <View style={{ flexDirection: 'row', width: '100%' }} >
                                                <Text style={styles.head}>Organizer : </Text>
                                                <Text style={styles.detail}>{tournamentInfo.OrganizerName}</Text>
                                            </View>
                                        </View>

                                        
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingLeft:10 }}>
                                            <View style={{ flexDirection: 'row', width: '100%' }} >
                                                <Text style={styles.head}>Division : </Text>
                                                <Text style={styles.detail}>{tournamentInfo.divisionName}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop:30, paddingBottom:23 }}>
                                            {/* <View style={{ flexDirection: 'row', alignItems:'center'  }} >
                                                <Text style={styles.head}>Division : </Text>
                                                <TouchableOpacity onPress={()=>this.setState({selectionModal:true})} style={{flexDirection:'row', backgroundColor:'white',paddingLeft:5,justifyContent:'center', paddingVertical:2, paddingRight:10, borderColor:'#585858', borderWidth:0.5 }}>
                                                    <Text style={{paddingLeft:5, color:'#474747', fontFamily:'open-sans-bold', fontSize:Responsive.font(11)}}>{this.state.selectedValue.length==''?'Select':this.state.selectedValue}</Text>
                                                    <Icon type="Entypo" name="chevron-small-down"  style={{ paddingLeft:10,alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                                </TouchableOpacity>
                                            </View> */}

                                            <View style={{alignItems:'center', justifyContent:'center', }}>
                                                <TouchableOpacity onPress={()=>this.setState({modalVisible:true})}  style={[styles.mySBtn,{backgroundColor:'#48A080'}]}>
                                                    <Text style={styles.myStext}>Accept</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{alignItems:'center', justifyContent:'center', }}>
                                                <TouchableOpacity onPress={()=>this.setState({modalVisible:true})}  style={[styles.mySBtn,{backgroundColor:'#924741'}]}>
                                                    <Text style={styles.myStext}>Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    

                                        <View>

                                        </View>
                                    
                                    </View>

                                    {/* <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 5, marginBottom: 5 }} /> */}
                                </View>
                    
                            )}
                            
                            renderItem={({item})=>(
                                
                                <MatchCards navigation={this.props.navigation} data={item} />
                                
                                
                            
                            )}
                        />
                        {/* :<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="#48A080" />
                    </View>} */}
                    </View>
                {/* </ScrollView> */}

            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        alignSelf:'center',
        //marginHorizontal:10,
        width: '100%',
        backgroundColor:'#DBFFF1',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
        marginBottom: 10
    },
    head: {
        color: '#585858',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: Responsive.font(12)
    },
    inHead: {
        fontSize:Responsive.font(16), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'bold'
    },
    detail:{
        fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', alignSelf:'center'
    },
    mySBtn: {
        
        justifyContent:'center',
        alignSelf:'flex-end',
        paddingVertical:2,
        marginLeft:10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        alignContent: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 2,
    },
    myStext:{
        fontSize: Responsive.font(11),
        fontFamily:'open-sans-bold',
        color:'white',
        justifyContent:'center',
        alignSelf:'center'
    }


});