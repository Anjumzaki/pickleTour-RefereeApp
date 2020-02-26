import React from 'react';
import { ActivityIndicator, View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import MatchCards from './MatchCards';
import axios from 'axios'
import Responsive from 'react-native-lightweight-responsive';
import {Icon} from 'native-base'


// tournament details and schedule----------------------------------------------
export default class EventDetailsTwo extends React.Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.data=''
        this.state = {
            actScr: '1',
            tourData:[],
            dataLoaded:false,
            startDate:null,
            loading:true,
            showMessage:false,
            showMulti:null,
            endDate:null
        };
    }
    async getItem(){
        try{
            let user  =await AsyncStorage.getItem('userProfileData')
            this.data= JSON.parse(user)
            // console.log()
            // let parsed = JSON.parse(user)
            // this.userData= parsed.uid
            // console.log('Here')
        }catch (error){
            console.log(error)
        }
    }
    componentDidMount(){
        this.getItem()
        const tournamentInfo = this.props.navigation.getParam('item')
        // console.log(tournamentInfo)
        let decide = this.decisionForMatchCard(tournamentInfo.divisionName)

        let date=this.convertDate(tournamentInfo.tournamentStartDate)
        let enddate = this.convertDate(tournamentInfo.tEndDate)
        this.setState({endDate:enddate})
        this.setState({startDate:date, showMulti:decide, tourData:[]})
        this.getData(tournamentInfo)
    }
    decisionForMatchCard(divisionType){
        if(divisionType.includes('Men\'s Doubles') || divisionType.includes('Women\'s Doubles') || divisionType.includes('Mixed Doubles')){
            return true
        }
        else
            return false
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

    getData= (tournamentInfo)=>{
        let bracketType = tournamentInfo.bracketType
        let tournamentId = tournamentInfo.tournamentId
        let divisionName = tournamentInfo.divisionName
        // console.log(bracketType, tournamentId)
        var newData = [];
        // dslkfsd;lfsd
        var dummyData=[]
        var url=''
        if(bracketType=='Round Robin' || bracketType=='Single Elimination' || 'Knock Out')
            url='http://pickletour.com/api/get/schedule'

        else if(bracketType=='Box League')
            url = 'http://pickletour.com/api/get/bschedule'

        else if(bracketType=='Flex Ladder')
            url = 'http://pickletour.com/api/get/fschedule'

        else if(bracketType=='Double Elimination')
            url ='http://pickeletour.com/api/get/dschedule'
        
        // var gettingUrl = 'https://pickletour.appspot.com/api/get/Schedule/'
        //var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
        // var gettingUrl = 'http://pickletour.appspot.com/api/get/schedule/5e2eb96e8bb07c00121fa750/'
        // var div='Men\'s Singles'
        // var gettingUrl = 'http://pickletour.com/api/get/schedule/5e4bb1db8fa805001faa4605/'
        // var div ='Men\'s Doubles'
        // axios.get(gettingUrl+tournamentId)
        // console.log(url+'/'+tournamentId+'/'+divisionName)
        axios.get(url+'/'+tournamentId+'/'+divisionName)
        .then((response)=>{
            // console.log(response.data)
            // response.data.length > 0
                       
            if (response.data.length > 0 ) {
                newData = response.data[0].schedule
                newData.forEach(element => {
                    element.map(item=>{
                        dummyData.push(item)
                    })
                });
                this.setState({
                    tourData: dummyData,
                    dataLoaded:true,
                    loading:false
                })
            }
            else {
                this.setState({
                    dataLoaded:false,
                    loading:false,
                    showMessage:true
                    
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        
        const tournamentInfo = this.props.navigation.getParam('item')
        // console.log(tournamentInfo)
        // console.log(tournamentInfo.tournamentName)
        //console.log('----------------------------------------------------------------------------------')
        //console.log(this.props.navigation.getParam('item'))
        return (
            <View>
                
                    

                    <View style={{ paddingTop: 10, paddingLeft:10, paddingRight:10 }}>
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
                                            <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{tournamentInfo.address}</Text>
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
                                                <Text style={styles.detail}>{tournamentInfo.organizerName}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingTop:10, paddingBottom:10 }}>
                                            <View style={{ flexDirection: 'row', width: '100%' }} >
                                                <Text style={styles.head}>Division : </Text>
                                                <Text style={styles.detail}>{tournamentInfo.divisionName}</Text>
                                            </View>
                                        </View>
                                    
                                    
                                    </View>

                                    <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 0, marginBottom: 15 }} />
                                </View>
                        <View style={{paddingBottom:1000}}>
                        <FlatList
                            
                            data ={this.state.tourData}
                            extraData={this.props}
                            keyExtractor={item => item._id}
                            // ListHeaderComponent={()=>(
                            ListFooterComponent={
                                <View style={{marginTop:40}}></View>
                            }
                    
                            // )}
                            ListEmptyComponent={()=>
                            //     (
                            //     (this.state.loading && <ActivityIndicator size='large'/> )
                            //     (this.state.showMessage && <Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Schedule not found !</Text>)
                            // )
                                {
                                    if(this.state.loading){
                                        return <ActivityIndicator size='large'/>
                                    }
                                    else if(this.state.showMessage){
                                        return <Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Schedule not found !</Text>
                                    }
                                }
                            }

                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index})=>
                            {
                                if(item.refereeId==this.data.uid){
                                    return <MatchCards navigation={this.props.navigation} data={item} location={index} showMulti={this.state.showMulti}/>
                                }
                            }
                            // (
                            //     <MatchCards navigation={this.props.navigation} data={item} location={index} showMulti={this.state.showMulti}/>
                            // )
                            
                            }
                        />
                        </View>

                        
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
        borderRadius:3,
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
        fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold'
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