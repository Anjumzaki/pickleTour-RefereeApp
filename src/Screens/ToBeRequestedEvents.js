import React from 'react';
import { Modal, View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Picker, PickerItem } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Responsive from 'react-native-lightweight-responsive';
import { Icon } from 'native-base'
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';
export default class ToBeRequestedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1',
            modalVisible:false,
            address:'',
            phoneNumber:'',
            incomData:false,
            submitted:false,
            isSuccessFull:false,
            selected:'',
            finallyComplete:false,
            convertedDate:null,
            newName:'',
            useNewName:false,
            startDate:null,
            endDate:null,
            expandSpace:false
        

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
        let date=this.convertDate(this.props.data.tStartDate)
        let enddate=this.convertDate(this.props.data.tEndDate)
        this.setState({startDate:date, endDate:enddate})
        // console.log(this.props)
        //console.log(this.props.data.division)
        let address = this.props.data.address
        if(address.length>53){
            this.setState({expandSpace:true})
        }
        let name=this.props.data.tournamentName
        let index= ''
        let splitter = 4

        let nameLength=this.convertString(name)
        if(nameLength>40){
            index = name.split(' ').slice(0,splitter).join(' ');
            this.setState({newName:index, useNewName:true})
        }
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
    convertString(name){
        name = name.replace(/(^\s*)|(\s*$)/gi,"");
        name = name.replace(/[ ]{2,}/gi," ");
        name = name.replace(/\n /,"\n");
        return name.length;
    }
    // closeModal(){
    //     const  { address, phoneNumber, incomData} = this.state
    //     if(address.length>0 && phoneNumber.length>0){
    //         this.setState({modalVisible:false})
    //     }
    // }
    request(){
        const {selected} = this.state
        // console.log('Selected:  ',selected)
        if(selected == '' || selected == 'Select'){
            
        }
        else{
            this.setState({modalVisible:true})
        }
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
            console.log(data)
            if(data.message =='referee Registered'){
                this.setState({finallyComplete:true})

                setTimeout(()=>{
                    this.setState({modalVisible:false})
                },3000)
            }
            console.log(data)
        }catch(error){

        }
    }

    conformingRequest(user, tournament){
        const {address, phoneNumber, incomData, submitted, isSuccessFull, selected} = this.state
        // console.log(user, tournament)
        // console.log(address, phoneNumber)
        if(address.length>0 && phoneNumber.length>0){
            const Obj ={
                address:  address,
                dob: user.dateOfBirth,
                fName: user.firstName,
                email: user.email,
                gender: user.gender,
                phone: phoneNumber,
                divisionName: selected,
                tournamentId: tournament._id,
                tournamentName: tournament.tournamentName,
                tournamentStartDate: tournament.tStartDate,
                type:  tournament.type,                
                userId:  user.uid,
                isPaid: false,
                tournamentAddress:tournament.address
            }

            console.log('Request Sent')
            this.setState({submitted:true, isSuccessFull:true})

            this.sendingData(Obj)
        }
        else{
            this.setState({incomData:true})
        }
    }
    render() {
        //console.log('````````````````````````````````````````')
        const data = this.props.data
        // console.log(tournament)
        //console.log(tournament.division)
        let result = data.division.map(a => a.nameOfDivision);


        //const divisionData =['Select', ...result]
        const user = this.props.user
        // console.log(divisionData)
        const { address, phoneNumber, incomData, submitted, isSuccessFull, selected, finallyComplete, expandSpace } = this.state
        // console.log('User Data:  ',this.props.user)
        return (
            <View>
                                        <View style={styles.cardStyles}>
                                        <View style={{ flexDirection: 'row' , paddingLeft:10, paddingTop:10}}>
                                            <View style={{ }} >
                                                <Text style={styles.inHead}>{data.tournamentName}</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={{borderWidth:0.5,borderColor:'#81D4B6', marginTop:10, marginRight:10, marginLeft:10}}></View>
                                        <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
                                            <Icon type="MaterialIcons" name="date-range"  style={{ alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                            <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{this.state.startDate} - {this.state.endDate}</Text>
                                        </View>

                                        <View style={{flexDirection:'row', paddingTop:5, paddingLeft:10}}>
                                            <Icon type="Entypo" name="location-pin"  style={{ alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                            <Text style={{fontSize:Responsive.font(11), width:'95%' ,color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{data.address}</Text>
                                        </View>

                                     

                                        
                                    

                                        <View>

                                        </View>
                                    
                                    </View>

                                    {/* <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 5, marginBottom: 5 }} /> */}
                                </View>
            // <View style={styles.cardStyles}>
            //     <View style={{ height:'50%', alignSelf:'center', width:'95%',justifyContent:'center', }}>
            //         <View>
            //             <Text style={{fontSize:Responsive.font(14), color:'#585858', fontFamily:'open-sans-bold'}}>{this.state.useNewName?this.state.newName:data.tournamentName}</Text>
            //         </View>
            //         <View style={{flexDirection:"row", padding:0}}>
            //             <Icon type="Entypo" name="location-pin"  style={{ alignSelf:'center',fontSize:Responsive.font(15) ,color: '#585858'}}/>
            //             <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold',alignSelf:'center',paddingLeft:1, width:'95%', }}>{data.address}</Text>
            //         </View>
            //     </View>
            //     {/* Rows here */}

            //     <View style={{borderWidth:0.5,marginHorizontal:10,borderColor:'#81D4B6', marginTop:expandSpace?5:0}}></View>
            //     <View style={{ height:'35%', width:'95%', alignSelf:'center', flexDirection:'row'}}>
                   
            //         <View style={{flex:1, flexDirection:'row', width:'50%' ,justifyContent: 'flex-start', marginBottom:0, padding:0}}>
            //             <Icon type="MaterialIcons" name="date-range"  style={{ alignSelf:'center',fontSize:Responsive.font(15) ,color: '#585858'}}/>
            //             <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold',alignSelf:'center',paddingLeft:1}}>{this.state.startDate} - 22/01/2020</Text>
            //         </View>


                 
            //     </View>
            // </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        alignSelf:'center',
        marginHorizontal:10,
        width: '92%',
        backgroundColor: '#9EEACE',
        // height:100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        justifyContent:'center',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderRadius:3,
        elevation: 3,
        marginBottom:10,
        paddingBottom:10
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
        fontSize: Responsive.font(10),
        alignSelf:'center',
        textAlignVertical:'center',
        textAlign:'center',
        alignItems:'center',
        alignContent:'center'


    },
    inHead: {
        color: '#585858',
        fontFamily: 'open-sans-bold',
        fontWeight:'bold',
        fontSize: Responsive.font(14)

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