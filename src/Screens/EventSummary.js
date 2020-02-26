import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import MatchCardsRes from './MatchCardsRes';
import {Icon} from 'native-base'
import axios from 'axios'
import Responsive from 'react-native-lightweight-responsive';

export default class EventSummary extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1',
            tourData:[],
            dataLoaded:false,
            startDate:null,
            loading:true,
            showMessage:false,
            showMulti:null
        };
    }
    
    componentDidMount(){
        const tournamentInfo = this.props.navigation.state.params.data
        let date=this.convertDate(tournamentInfo.tournamentStartDate)
        this.setState({startDate:date})
        this.getData()
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
    getData= (tournamentId, eventType)=>{

        var newData = [];
        var dummyData=[]
        var gettingUrl = 'http://pickletour.appspot.com/api/get/schedule/5e2eb96e8bb07c00121fa750/'
        var div='Men\'s Singles'
        axios.get(gettingUrl+div)
        .then((response)=>{
            newData = response.data[0].schedule
            if (newData.length > 0) {
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
        const tournamentInfo = this.props.navigation.state.params.data
        return (
            <View>                   
                    <View style={{ padding: 10 }}>
                    <View>
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
                                            <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{this.state.startDate} - 22/01/2020</Text>
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
                                                <Text style={styles.detail}>Steve</Text>
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
                    </View>
                    <View style={{paddingBottom:1000}}>
                    <FlatList
                            
                            data ={this.state.tourData}
                            extraData={this.props}
                            ListFooterComponent={
                                <View style={{marginTop:40}}></View>
                            }
                            keyExtractor={item => item._id}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={()=>{
                                if(this.state.loading){
                                    return <ActivityIndicator size='large'/>
                                }
                                else if(this.state.showMessage){
                                    return <Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Schedule not found !</Text>
                                }
                            }}
                            
                            renderItem={({item, index})=>(

                                
                                <MatchCardsRes navigation={this.props.navigation} data={item} location={index} />
                            
                            )}
                            
                        />
                    </View>
                  
                    </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        alignSelf:'center',
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
        fontSize:Responsive.font(16), color:'#585858', fontFamily:'open-sans-bold',fontWeight:'bold'
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