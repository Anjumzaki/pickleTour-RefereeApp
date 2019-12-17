import React, { Component } from 'react';
import { View, Text,StyleSheet,SafeAreaView , ImageBackground,StatusBar , TouchableOpacity, Image} from 'react-native';
import { ScreenOrientation } from 'expo';



class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.playingSide='right'
    this.state = {
      ballpos1:false,
      ballpos2:false,
      ballpos3:false,
      ballpos4:false,
      GameStart:true,
      Team1Serving:false,
      Team2Serving:false,
      Serve:0,
      ScoreTeam1:0,
      ScoreTeam2:0,
      Section1:'Player #1',
      Section2:'Player #2',
      Section3:'Player #3',
      Section4:'Player #4',
      TeamFormation:'Doubles',
      Player1Name:'Player #1',
      Player2Name:'Player #2',
      Player3Name:'Player #3',
      Player4Name:'Player #4'
    };
  }
  async changeScreenOrientation() {
    
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  // balltesting(){
  //   this.setState({ballpos1:false, ballpos2:false})
  // }
  // balltesting2(){
  //   this.setState({ballpos1:true, ballpos2:true})
  // }
  fault(whichTeam){
    if(this.state.TeamFormation=='Doubles'){
    if(whichTeam=='ByOne' && this.state.Team1Serving==true && this.state.Serve==2){
      this.setState({ballpos1:false, ballpos3:true, Serve:1, GameStart:false, Team1Serving:false, Team2Serving:true, ballpos2:false})
    }
    else if(whichTeam=='ByOne' && this.state.Team2Serving==true && this.state.Serve==1){
      if(this.state.ballpos3==true){
        this.setState({ballpos4:true, ballpos3:false, ScoreTeam2:this.state.ScoreTeam2+1, Section4:this.state.Player3Name, Section3:this.state.Player4Name})
      }
      else if(this.state.ballpos3==false && this.state.ballpos4==true){
        this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1,  Section4:this.state.Player4Name, Section3:this.state.Player3Name})  
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team2Serving==true && this.state.Serve==1){
      if(this.state.ballpos3==true){
        this.setState({ballpos3:false, ballpos4:true, Serve:2})
      }
      else if(this.state.ballpos4==true){
        this.setState({ballpos3:true, ballpos4:false, Serve:2})
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team2Serving==true && this.state.Serve==2){
      this.setState({ballpos3:false, ballpos4:false, ballpos1:true, Serve:1, Team1Serving:true, Team2Serving:false})
    }  
    else if(whichTeam=='ByOne' && this.state.Team2Serving==true && this.state.Serve==2){
      // this.setState({ScoreTeam2:this.state.ScoreTeam2+1, player3Move:true, player4Move:false})
      if(this.state.ballpos3==true){
        if(this.state.Section3==this.state.Player3Name){
          this.setState({ballpos3:false, ballpos4:true, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player4Name, Section4:this.state.Player3Name})
        }
        else{
          this.setState({ballpos3:false, ballpos4:true, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player3Name, Section4:this.state.Player4Name})
        }
      }
      else if(this.state.ballpos4==true){
        if(this.state.Section3==this.state.Player3Name){
          this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player4Name, Section4:this.state.Player3Name })
        }
        else{
          this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player3Name, Section4:this.state.Player4Name })
        }
      }
    }
    else if(whichTeam=='ByOne' && this.state.Team1Serving==true && this.state.Serve==1){
      if(this.state.ballpos1==true){
        this.setState({ballpos1:false, ballpos2:true, Serve:2})
      }
      else if(this.state.ballpos2==true){
        this.setState({ballpos1:true, ballpos2:false, Serve:2})
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team1Serving==true && this.state.Serve==1){
      if(this.state.ballpos1==true){
        this.setState({ballpos2:true, ballpos1:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player2Name, Section2:this.state.Player1Name})
      }
      else if(this.state.ballpos2==true){
        this.setState({ballpos1:true, ballpos2:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player1Name, Section2:this.state.Player2Name})
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team1Serving==true && this.state.Serve==2){
      if(this.state.ballpos1==true){
        this.setState({ballpos2:true, ballpos1:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player1Name, Section2:this.state.Player2Name })
      }
      else if(this.state.ballpos2==true){
        this.setState({ballpos1:true, ballpos2:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player2Name, Section2:this.state.Player1Name})
      }
    }
  }

  else{
    if(whichTeam=='ByOne' && this.state.Team1Serving==true){
      if(this.state.ballpos1==true){
        this.setState({ballpos3:true, Team2Serving:true, Serve:1, ballpos1:false, Team1Serving:false})
      }
      else{
        this.setState({ballpos4:true, ballpos2:false, Serve:1, Team2Serving:true, Team1Serving:false})
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team1Serving==true){
      if(this.state.ballpos1==true){
        this.setState({
          ballpos1:false, ballpos2:true, Section2:this.state.Player1Name, ScoreTeam1:this.state.ScoreTeam1+1, Section1:'', Section3:'', Section4:this.state.Player3Name
        })
      }
      else{
        this.setState({
          ballpos2:false, ballpos1:true, Section3:this.state.Player3Name, Section4:'', Section2:'', Section1:this.state.Player1Name, ScoreTeam1:this.state.ScoreTeam1+1
        })
      }
    }

    else if(whichTeam=='ByTwo' && this.state.Team2Serving==true){
      if(this.state.ballpos3==true){
        this.setState({
          ballpos3:false, ballpos1:true, Team1Serving:true, Team2Serving:false, Serve:1
        })
      }
      else{
        this.setState({
          ballpos4:false, ballpos2:true, Team1Serving:true, Team2Serving:false, Serve:1
        })
      }
    }

    else if(whichTeam=='ByOne' && this.state.Team2Serving==true){
      if(this.state.ballpos3==true){
        this.setState({
          ballpos4:true, ballpos3:false, Section4:this.state.Player3Name, Section3:'', ScoreTeam2:this.state.ScoreTeam2+1, Section2:this.state.Player1Name, Section1:''
        })
      }
      else{
        this.setState({
          ballpos3:true, ballpos4:false, Section4:'', Section3:this.state.Player3Name, ScoreTeam2:this.state.ScoreTeam2+1, Section2:'', Section1:this.state.Player1Name
        })
      }
    }
  }
  }

  componentDidMount(){
    this.changeScreenOrientation()
    if(this.state.TeamFormation=='Doubles'){
      this.settingDoubles()
    }
    else{
      this.settingSingles()
    }
  }

  settingSingles(){
    if(this.playingSide=='left'){
      this.setState({
        ballpos1:true, Team1Serving:true, Serve:1, Section2:'', Section4:'', Section1:this.state.Player1Name, Section3:this.state.Player3Name
      })
    }
    else{
      this.setState({
        ballpos3:true, Team2Serving:true, Serve:1, Section2:'', Section4:'', Section1:this.state.Player1Name, Section3:this.state.Player3Name
      })
    }
  }

  settingDoubles(){
    if(this.playingSide=='left'){
      this.setState({ballpos1:true,Team1Serving:true,Serve:2, Section1:this.state.Player1Name, Section2:this.state.Player2Name, Section3:this.state.Player3Name, Section4:this.state.Player4Name})
      
    }
    else{
      this.setState({ballpos3:true,Team2Serving:true,Serve:2, Section1:this.state.Player1Name, Section2:this.state.Player2Name, Section3:this.state.Player3Name, Section4:this.state.Player4Name})
    }
  }
  render() {  
    return (
      // <View style={{flex:1, }}>
      //   <StatusBar hidden={true} />
      //   <ImageBackground style={{width: '100%', height: '100%', flexDirection:'row'}} source={require('./assets/background.jpg')}>
      //     <View style={{flex:1, width:'50%', justifyContent:'center'}}>
      //       <TouchableOpacity style={{backgroundColor:'#ad4538', width:'30'}}>
      //         <Text style={{textAlign:'center', color:'white'}}>FAULT</Text>
      //       </TouchableOpacity>
      //     </View>
      //     {/* ------------------------------------ */}
      //     <View style={{flex:1, width:'50%', backgroundColor:'yellow', justifyContent:'center'}}>

      //     </View>
      //   </ImageBackground>
      // </View>
      <View style={{flex:1, justifyContent: 'center', flexDirection:'row', }}>
        <StatusBar hidden={true} />

      <View style={{backgroundColor:'#6e8980', flex:1,}}>
        <View style={{flex:0.213, flexDirection:'row'}}>
          <View style={{backgroundColor:'#91c549',alignSelf:'flex-end', marginLeft:'54%', marginRight:'2%'}}>
            <Text style={{alignSelf:'center', fontSize:18}}>{this.state.Team1Serving?' Serve : '+this.state.Serve+' ':''}</Text>
          </View>
          <View style={{backgroundColor:this.state.Team1Serving?'#91c549':'white', alignSelf:'flex-end', marginLeft:this.state.Team2Serving?'27.5%':'0%'}}>
            <Text style={{alignSelf:'center',paddingHorizontal:'4%', fontSize:18}}>{this.state.ScoreTeam1}</Text>
          </View>
        </View>
        <View style={{backgroundColor:'#2f8465', width: '80%', flex:1, alignSelf:'flex-end',borderColor:'white', borderWidth:2, marginBottom:'15%'  }}>
        {/* <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'15%'}}>{this.state.GameStart==true ?'Player #2':this.state.player2Move?'Player #1':'Player #2'}</Text> */}
        <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'15%'}}>{this.state.Section2}</Text>
          {this.state.ballpos2?<Image 
          style={{width:'10%', height:'10%', marginLeft:'2%', marginBottom:'-10%'}}
          source={require('../../assets/ball.jpg')}/>:<View></View>}
          <TouchableOpacity onPress={()=>this.fault('ByOne')} style={{backgroundColor:'#ad4538', borderWidth:2, borderColor:'white', alignSelf:"center", marginVertical:"20%", paddingHorizontal:20}}>
            <Text style={{color:'white'}}>FAULT</Text>
          </TouchableOpacity>
          <View style={{borderColor:'white', borderWidth:1,marginTop:-65, zIndex:-1}}></View>
          {/* <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'20%'}}>{this.state.GameStart==true ?'Player #1':this.state.player1Move?'Player #2':'Player #1'}</Text> */}
          <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'20%'}}>{this.state.Section1}</Text>
          {this.state.ballpos1?<Image 
          style={{width:'10%', height:'10%', marginLeft:'2%'}}
          source={require('../../assets/ball.jpg')}/>:<View></View>}
        </View>
      </View>

      
      {/* <View style={{ backgroundColor:'#91c549', flex:0.1, marginVertical:'7%',borderWidth:2, borderColor:'white'}}>

      </View>
      <View style={{ backgroundColor:'#91c549', flex:0.1, marginVertical:'7%', borderWidth:2, borderColor:'white'}}>

      </View> */}

      <View style={{ backgroundColor:'#6e8980', flex:1}}>
      <View style={{flex:0.213, flexDirection:'row'}}>
          <View style={{backgroundColor:this.state.Team2Serving?'#91c549':'white',alignSelf:'flex-end', marginRight:'2%', marginLeft:'6%'}}>
            <Text style={{alignSelf:'center',paddingHorizontal:'4%', fontSize:18}}>{this.state.ScoreTeam2}</Text>
          </View>
          <View style={{backgroundColor:'#91c549', alignSelf:'flex-end'}}>
            <Text style={{alignSelf:'center', fontSize:18,}}>{this.state.Team1Serving?'':' Serve : '+this.state.Serve+' '}</Text>
            
          </View>
        </View>

      
      
      <View style={{backgroundColor:'#2f8465', width: '80%', flex:1, alignSelf:'flex-start',marginBottom:'15%', borderColor:'white', borderWidth:2  }}>
      <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'15%'}}>{this.state.Section3}</Text>
    {/* <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'15%'}}>{this.state.GameStart?'Player #3': this.state.player3Move?"Player #4":'Player #3'}</Text> */}
        <View>
        {this.state.ballpos3?<Image 
          style={{width:'10%', height:'10%', marginLeft:'2%', marginBottom:'-9%', padding:12}}
          source={require('../../assets/ball.jpg')}/>:<View></View>}
        <TouchableOpacity onPress={()=>this.fault('ByTwo')} style={{backgroundColor:'#ad4538', borderWidth:2, borderColor:'white', alignSelf:"center", marginVertical:"20%", paddingHorizontal:20}}>
            <Text style={{color:'white'}}>FAULT</Text>
          </TouchableOpacity>
          <View style={{borderColor:'white', borderWidth:1,marginTop:-65, zIndex:-1}}></View>
        </View>
      
          {/* <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'20%'}}>{this.state.GameStart?'Player #4': this.state.player3Move?"Player #3":'Player #4'}</Text> */}
          <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'20%'}}>{this.state.Section4}</Text>
          {this.state.ballpos4?<Image 
          style={{width:'10%', height:'10%', marginLeft:'2%', marginBottom:'-10%'}}
          source={require('../../assets/ball.jpg')}/>:<View></View>}
      </View>
      </View>
      </View>
    );
  }
}

export default ScoreCard;

const styles = StyleSheet.create({
  statusBar:{
    
  }
})
