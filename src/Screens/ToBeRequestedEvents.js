import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Responsive from 'react-native-lightweight-responsive';
import { Icon } from 'native-base'
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
   
    componentDidMount(){
        let date=this.convertDate(this.props.data.tStartDate)
        let enddate=this.convertDate(this.props.data.tEndDate)
        this.setState({startDate:date, endDate:enddate})
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
    
    request(){
        const {selected} = this.state
        if(selected == '' || selected == 'Select'){
            
        }
        else{
            this.setState({modalVisible:true})
        }


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
            let url ='https://pickletour.appspot.com/api/referee/register'
            const res = await fetch(url, config)
            const data = await res.json()
            if(data.message =='referee Registered'){
                this.setState({finallyComplete:true})

                setTimeout(()=>{
                    this.setState({modalVisible:false})
                },3000)
            }
        
        }catch(error){

        }
    }

    conformingRequest(user, tournament){
        const {address, phoneNumber, incomData, submitted, isSuccessFull, selected} = this.state
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

            this.setState({submitted:true, isSuccessFull:true})

            this.sendingData(Obj)
        }
        else{
            this.setState({incomData:true})
        }
    }
    render() {
        const data = this.props.data
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
                                </View>

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