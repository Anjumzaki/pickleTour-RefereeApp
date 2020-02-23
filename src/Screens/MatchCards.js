import React from 'react';
import { View, Text, Button, ImageBackground, Switch, Image, TextInput, Dimensions, StyleSheet, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions,withNavigation  } from 'react-navigation';
import Responsive from 'react-native-lightweight-responsive';
import {Icon} from 'native-base'
export default class MatchCards extends React.Component {

    constructor(props) {
        super(props);
        this.Time='12:28'
        this.state = {
            actScr: '1',
            test:false,
            buttonDisabled:true,
            checkCourt:false,
            checkPlayer1:false,
            checkPlayer2:false,
            checkPlayer3:false,
            checkPlayer4:false,
            testTime:'11:10',
            convertedDate:null,
            showWidget:true,
            player1:'',
            player2:'',
            player3:'',
            player4:''
        };
    }
    // login() {
    //     // this.props.navigation.navigate('MainTabs')
        // this.props.navigation.dispatch(StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        // }))
    // }
    componentDidMount(){
        // console.log(this.props.data)
        let date=this.convertDate(this.props.data.matchDate)
        this.setState({convertedDate:date})
        // console.log(this.props.showMulti)
        if(this.props.showMulti==true){
            if(this.props.data.one.player1==undefined){
                this.setState({
                    player1:this.props.data.one.fName,
                    player3:this.props.data.two.fName
                })
            }
            else{
                this.setState({player1:this.props.data.one.player1.fName,
                               player2:this.props.data.one.player2.fName,
                               player3:this.props.data.two.player1.fName,
                               player4:this.props.data.two.player2.fName
                })
            }
        }
        else{
            // console.log(this.props.data.one)
            this.setState({
                player1: this.props.data.one.fName,
                player3: this.props.data.two.fName
            })
            // console.log(this.props.showMulti)
            // let fname = this.props.data.one.fName
            // let sname = this.props.data.two.fName
            // if( fname.includes('Winner of') && sname.includes('Winner of') ){
            //     this.setState({
            //         showWidget:false
            //     })
            // }
        }
        
        // this.getTimeFirstTime()
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
    // getTimeFirstTime(){
    //     const  testTime  = this.Time
    //     const today = new Date();
    //     const h = today.getHours();
    //     let m = today.getMinutes();
    //     const s = today.getSeconds();
    //     m = (m < 10) ? ("0" + m) : m;
    //     let time = h+':'+m
    //     if(time<this.state.testTime){
    //         setInterval(this.getTime(this),10000)
    //     }
    //     else{
    //         console.log(' Match Started')
    //     }
    // }
    showingAlert(){
        Alert.alert(
          'Time not correct !',
          'Match cannot be started yet.',
          [
            {},
            {
              // text: 'Cancel',
              // onPress: () => console.log('Cancel Pressed'),
              // style: 'cancel',
            },
            {text: 'OK',style:'cancel'},
          ],
          {cancelable: false},
        );
      }
    getTime(){
        // const  testTime  = this.Time
        const today = new Date();
        const h = today.getHours();
        const s = today.getSeconds();
        let m = today.getMinutes();
        m = (m < 10) ? ("0" + m) : m;
        let time = h+':'+m
        console.log(time)
        if(time>this.state.testTime){
            console.log('Start Match Now')
        }
        //console.log(h+' : '+m+' : '+s)
    }

    checkTime(userData, checkMulti){
        const {player4, player3, player2, player1}=this.state
        let players=null
        if(checkMulti){
            players =[player1,  player2, player3, player4]
        }else{
            players=[player1, player3]
        }
        const today = new Date();
        var month = '' + (today.getMonth() + 1)
        var day = '' + today.getDate()
        var year = today.getFullYear()
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        const date = [day,month,year].join('/')
        // console.log(today)
        const h = today.getHours();
        const s = today.getSeconds();
        let m = today.getMinutes();
        m = (m < 10) ? ("0" + m) : m;
        let time = h+':'+m
        
        // if(time>=this.props.data.matchTime && data.matchDate <= date )
        
        if(time>=this.props.data.matchTime ){
            //console.log(players)
            this.props.navigation.navigate('ScoreCard',{userData, checkMulti, players})
        }
        else{
            this.showingAlert()
        }
    }
    // player(player){
    //     const show = this.props.showMulti
    //     if(show){
    //         this.setState({checkPlayer3:player})
    //     }
    //     else{
    //         this.setState({checkPlayer2:player})
    //     }
    // }
    render() {
        const data = this.props.data
        const show = this.props.showMulti
        const { checkCourt, checkPlayer1, checkPlayer2, checkPlayer4, checkPlayer3, player1, player2, player3, player4 } =this.state
        const enabled = checkCourt==true && checkPlayer1==true && checkPlayer3==true
        const enabled2 = checkCourt==true && checkPlayer1==true && checkPlayer2==true && checkPlayer4==true && checkPlayer3==true

        return (
            <View style={styles.cardStyles}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent:'center', alignContent:'center' }} >
        <Text style={{paddingHorizontal:5,paddingVertical:2,alignSelf:'center',justifyContent:'center',alignContent:'center',color:'#5D5D5D',fontFamily:'open-sans-bold',fontWeight: 'bold', fontSize:Responsive.font(13)}}>Match No {this.props.location+1}</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',marginTop:10, justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', width:'50%'}}>
                        <View style={{flexDirection:'row', }}>
                            <Icon type="MaterialCommunityIcons" name="calendar-today"  style={{ fontSize:Responsive.font(14) ,color: '#585858', alignSelf:'center'}}/>
                            <Text style={{alignSelf:'center',fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{this.state.convertedDate}</Text>
                        </View>

                        <View style={{flexDirection:'row', marginLeft:15}}>
                            <Icon type="Ionicons" name="md-time"  style={{ fontSize:Responsive.font(14) ,color: '#585858', alignSelf:'center'}}/>
                            <Text style={{alignSelf:'center',fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{data.matchTime}</Text>
                        </View>
                    </View>

                    <View style={{justifyContent:'flex-end', width:'50%', flexDirection:'row'}}>
                        <View style={{flexDirection:'row', paddingHorizontal:7, borderRadius:15, backgroundColor:'#C7FFEB'}}>
                            <Text style={{marginRight:5,alignSelf:'center',color:'#585858',fontSize:Responsive.font(12), fontFamily:'open-sans-bold'}}>Court no. {data.court}</Text>
                            <Switch thumbColor={this.state.checkCourt? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={this.state.checkCourt}  
                                onValueChange ={(checkCourt)=>this.setState({checkCourt})}
                            /> 
                        </View>
                    </View>

                <View style={{justifyContent:'flex-end', flexDirection:'row'}}>
                   
                     


                        
                    </View>

                </View>


                <View style={{ height: 1,  marginBottom: 5, marginTop: 5 }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '48%', marginRight: '4%' }}>
                        <View style={styles.teamName} >
                            <Text style={styles.head}>Team A - </Text>
                            <Text style={styles.head}>Alpha</Text>
                        </View>
                        
                        
                        
                        <View style={styles.teamNames} >
                            <Text style={styles.head1}>{this.state.player1}</Text>
                           
                            {!this.state.player1.includes(('Winner of')) &&<Switch thumbColor={this.state.checkPlayer1? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={this.state.checkPlayer1}  
                                onValueChange ={(checkPlayer1)=>this.setState({checkPlayer1})}
                            />}
                            

                            {/* <Text style={styles.head1}>{data.one.fName}</Text>
                            {this.state.showWidget &&  <Switch thumbColor={this.state.checkPlayer1? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={this.state.checkPlayer1}  
                                onValueChange ={(checkPlayer1)=>this.setState({checkPlayer1})}
                            />  } */}
                        </View>



                       {this.state.player2.length>0 &&  <View style={styles.teamNames} >
                            <Text style={styles.head1}>{this.state.player2}</Text>
                            <Switch thumbColor={this.state.checkPlayer2? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={this.state.checkPlayer2}  
                                onValueChange ={(checkPlayer2)=>this.setState({checkPlayer2})}
                            /> 
                            {/* {this.state.showWidget &&  <Switch thumbColor={this.state.checkPlayer2? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={this.state.checkPlayer2}  
                                onValueChange ={(checkPlayer2)=>this.setState({checkPlayer2})}
                            />  } */}
                        </View>}
                    </View>



                    <View style={{ width: '48%' }}>
                        <View style={styles.teamName} >
                            <Text style={styles.head}>Team B - </Text>
                            <Text style={styles.head}>Beta </Text>
                        </View>
                        <View style={styles.teamNames} >

                        <Text style={styles.head1}>{this.state.player3}</Text>
                        {!this.state.player3.includes(('Winner of')) &&<Switch thumbColor={this.state.checkPlayer3? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={this.state.checkPlayer3}  
                                onValueChange ={(checkPlayer3)=>this.setState({checkPlayer3})}
                        /> }
                        
                            {/* <Text style={styles.head1}>{show? 'Third Player': data.two.fName}</Text> */}
                            {/* {this.state.showWidget && <Switch thumbColor={show?this.state.checkPlayer3? '#69C674':'#E9835D':this.state.checkPlayer2? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={show?this.state.checkPlayer3:this.state.checkPlayer2}  
                                onValueChange ={(checkPlayer2)=>this.player(checkPlayer2)}
                            />  } */}
                        </View>

                       {this.state.player4.length>0 &&  <View style={styles.teamNames} >
                            <Text style={styles.head1}>{this.state.player4}</Text>
                            <Switch thumbColor={this.state.checkPlayer4? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={this.state.checkPlayer4}  
                                onValueChange ={(checkPlayer4)=>this.setState({checkPlayer4})}
                            /> 
                            {/* {this.state.showWidget && <Switch thumbColor={this.state.checkPlayer4? '#69C674':'#E9835D'} trackColor={{false:'#E9835D' , true:'#69C674' }}
                                value={this.state.checkPlayer4}  
                                onValueChange ={(checkPlayer4)=>this.setState({checkPlayer4})}
                            />  } */}
                        </View>}
                    </View>
                </View>
                <View style={{ height: 1, marginBottom: 10, marginTop: 5 }} />

                    
                    
                   {!show &&  <View style={{ flexDirection: 'row', width: '100%', marginRight: 10 ,justifyContent:'flex-end', marginBottom:5}} >
                    <TouchableOpacity disabled={!enabled} onPress={() =>  this.checkTime(this.props.navigation.state.params.item,show) }style={[styles.mySBtn,{backgroundColor: enabled?'#51C560':'#87DC92'}]}>
                            <Text style={styles.myStext}>Start Match</Text>
                        </TouchableOpacity>
                    </View>}
                    {show && <View style={{ flexDirection: 'row', width: '100%', marginRight: 10 ,justifyContent:'flex-end'}} >
                    <TouchableOpacity disabled={!enabled2} onPress={() =>  this.checkTime(this.props.navigation.state.params.item,show) }style={[styles.mySBtn,{backgroundColor: enabled2?'#51C560':'#87DC92'}]}>
                            <Text style={styles.myStext}>Start Match</Text>
                        </TouchableOpacity>
                    </View>}
            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        alignSelf:'center',
        width: '97%',
        backgroundColor: '#9EEACE',
        padding: 10,
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginBottom: 15
    },
    head: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: Responsive.font(12)
    },
    head1: {
        color: '#585858',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(12),
        alignSelf:'center'
    },
    inHead: {
        color: '#DCDCDC',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(12)
    },
    mySBtn: {
        
        color:'white',
        // s
        // borderColor:'white',
        padding: 4,
        justifyContent:'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 2,
    },
    mcde: {
        alignSelf:'center',
        justifyContent:'center',
        color: 'white',
        backgroundColor: '#5D5D5D',
        padding: 3,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        fontWeight: 'bold',
        height: 28,
        
        fontSize: Responsive.font(11)
    },
    teamName: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#999999',
        padding: 5
    },
    teamNames: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#C7FFEB',
        padding: 5,
        color: 'black',
        justifyContent:'space-between'
    },
    myStext:{
        color:'white',
        alignSelf:'center',
        fontFamily:'open-sans-bold',
        fontSize: Responsive.font(12)
    }


});