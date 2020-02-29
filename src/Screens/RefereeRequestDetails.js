import React from 'react';
import { ActivityIndicator, View, Text, TextInput, Dimensions, StyleSheet, ScrollView, FlatList, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios'
import Responsive from 'react-native-lightweight-responsive';
import {Icon} from 'native-base'


export default class RefereeRequestDetails extends React.Component {
    static navigationOptions = {
        headerTitle:
            <Text style={{ alignSelf:'center', color: 'white',fontFamily:'open-sans-bold',fontSize:Responsive.font(20)  }}>Requested as Referee</Text>
    }
    constructor(props) {
        super(props);
        this.BracketData=''
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
            disabledButton:true

        };
    }
  
    componentDidMount(){    
       
        const tournamentInfo = this.props.navigation.getParam('item')
        console.log(tournamentInfo)
        let date=this.convertDate(tournamentInfo.tournamentStartDate)
        this.setState({startDate:date})

        let endate=this.convertDate(tournamentInfo.tEndDate)
        this.setState({endDate:endate})
    }
    convertDate(date){
        var d= new Date(date)
        // let len=d.toString()
        // console.log(len)
        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
        console.log(d)
        var year = d.getFullYear()
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        return [day, month, year].join('/');
    }

   
    render() {
        const { state, navigate } = this.props.navigation;
        const user = this.props.navigation.getParam('user')

        const { address, phoneNumber, incomData, submitted, isSuccessFull, selected, finallyComplete } = this.state
        const tournamentInfo = this.props.navigation.getParam('item')
        // const bracketTypes =  tournamentInfo.division.map(a => {
        //     if(a.bracketType=='Round Robin')
        //         return '(R.R.)'
        //     else if(a.bracketType =='Flex Ladder')
        //         return '(F.L.)'
        //     else if(a.bracketType == 'Box League')
        //         return '(B.L.)'
        //     else if(a.bracketType == 'Single Elimination')
        //         return '(S.E.)'
        //     else if(a.bracketType =='Double Elimination')
        //         return '(D.E.)'
        //     else if(a.bracketType =='Knock Out')
        //         return'(K.O.)'
        //     else if(a.bracketType =='Groups')
        //         return 'Groups'
                
        //    }
        // )
        
        // const division = tournamentInfo.division
        // let result = division.map(a => a.nameOfDivision);
        // const divisionData=[...result]
        // this.DivisionData= divisionData
        // let result2= division.map(a=>a.bracketType);
        // const bracketData =[...result2]
        // this.BracketData =bracketData
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
                                            <Text style={{fontSize:Responsive.font(11), width:'95%' ,color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{tournamentInfo.tournamentAddress}</Text>
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

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop:30, paddingBottom:23 }}>
                                            <View style={{ flexDirection: 'row', alignItems:'center'  }} >
                                                <Text style={styles.head}>Division : </Text>
                                                <TouchableOpacity disabled={this.state.disabledButton} onPress={()=>this.setState({selectionModal:true})} style={{flexDirection:'row', backgroundColor:'white',paddingLeft:5,justifyContent:'center', paddingVertical:2, paddingRight:10, borderColor:'#585858', borderWidth:0.5 }}>
                                                    <Text style={{paddingLeft:5, color:'#474747', fontFamily:'open-sans-bold', fontSize:Responsive.font(11)}}>{tournamentInfo.bracketType}</Text>
                                                    {/* <Icon type="Entypo" name="chevron-small-down"  style={{ paddingLeft:10,alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/> */}
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{alignItems:'center', justifyContent:'center', }}>
                                                <TouchableOpacity onPress={()=>this.setState({modalVisible:true})}  style={[styles.mySBtn,{backgroundColor: this.state.buttonDisabled?'#96D1BB':'#48A080'}]} disabled={this.state.disabledButton}>
                                                    <Text style={styles.myStext}>Requested</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    

                                        <View>

                                        </View>
                                    
                                    </View>
                                </View>
                    
                            )}
                            
                            renderItem={({item})=>(
                                
                                <MatchCards navigation={this.props.navigation} data={item} />
                                
                                
                            
                            )}
                        />
                    </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        alignSelf:'center',
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