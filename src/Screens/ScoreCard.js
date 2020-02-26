import React, { Component } from 'react';
import { Alert,Modal,View, Text,BackHandler,ImageBackground,StatusBar , TouchableOpacity, Image,Dimensions} from 'react-native';
import { ScreenOrientation, } from 'expo';
import { RadioGroup} from 'react-native-btr';
import { CheckBox, ListItem, Icon } from 'native-base'
import Responsive from 'react-native-lightweight-responsive';

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

class ScoreCard extends Component {
  
  constructor(props) {
    

    super(props);
    this.playingSide=''
    this.interval=null
    this.TargetSelected = 11
    this.state = {
      radioButtons:[
        {
          label:'Left',
          value:'left',
          checked: true,
          disabled:false,
          flexDirection:'row',
          size:11
        },
        {
          label:'Right',
          value:'right',
          checked: false,
          disabled:false,
          flexDirection:'row',
          size:11
        }],
      pointsButton:[
        {
          label:'11',
          value:11,
          checked:true,
          disabled:false,
          flexDirection:'row',
          size:11
        },
        {
          label:'15',
          value:15,
          checked:false,
          disabled:false,
          flexDirection:'row',
          size:11
        },
        {
          label:'21',
          value:21,
          checked:false,
          disabled:false,
          flexDirection:'row',
          size:11
        },
      ], 

      startClicked:false,
      start:false,
      min:0,
      sec:0,
      msec:0,
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
      TeamFormation:'',
      Player1Name:'George set',
      Player2Name:'B',
      Player3Name:'William',
      Player4Name:'D',
      modalVisible:true,
      checked:true,
      PlayingSide:''
      
    };
  }

  handleToggle = () =>{
    this.setState(
      {
        start:!this.state.start
      },
      () =>this.handleStart()
    )
  }


  handleStart = () =>{
    if(this.state.start){
      this.interval = setInterval(()=>{
         if(this.state.sec!==59){
            this.setState({
              msec:0,
              sec: ++ this.state.sec
            })
        } else {
          this.setState({
            msec:0,
            sec:0,
            min: ++this.state.min
          })
        }
      }, 1000)
    } else{
      clearInterval(this.interval)
    }
  }

  handleReset =()=>{
    this.setState({
      min:0,
      sec:0,
      msec:0,
      start: false
    });
    clearInterval(this.interval)

  }

  async changeScreenOrientation() {
    
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  async exitScreenOrientation(){
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  }

  checkingScore(whichTeam){
    if(whichTeam=='ByOne'){
      
      if(this.state.checked==true){
        if(this.state.ScoreTeam2==this.TargetSelected && this.state.ScoreTeam2-this.state.ScoreTeam1>=2){
          this.showingAlert('Team two is the Winner.')  
        }
        else if(this.state.ScoreTeam2>this.TargetSelected && this.state.ScoreTeam2-this.state.ScoreTeam1>=2){
          this.showingAlert('Team two is the Winner.')  
        }
      }
      else{
        if(this.state.ScoreTeam2==this.TargetSelected){
          this.showingAlert('Team two is the Winner.') 
        }
      }
        
    }
  else if(whichTeam=='ByTwo'){
    if(this.state.checked==true){
      if(this.state.ScoreTeam1==this.TargetSelected && this.state.ScoreTeam1-this.state.ScoreTeam2>=2){
        this.showingAlert('Team one is the Winner.') 
      }
      else if(this.state.ScoreTeam1>this.TargetSelected && this.state.ScoreTeam1-this.state.ScoreTeam2>=2){
        this.showingAlert('Team one is the Winner.') 
      }
    }
    else{
      if(this.state.ScoreTeam1==this.TargetSelected){
        this.showingAlert('Team one is the Winner.') 
      }
    }
  }
}

showingAlertConfirmStart(){
  Alert.alert(
    'Game Resetted !',
    'Click on Start ',
    [
      {},
      {},
      {text: 'OK'}
    ],
    {cancelable: false},
  )}
  showingAlert(teamMsg){
    Alert.alert(
      'Game Over !',
      teamMsg,
      [
        {},
        {},
        {text: 'OK', onPress: () => this.setState({modalVisible:true})},
      ],
      {cancelable: false},
    );
  }

  fault(whichTeam){
    if(this.state.TeamFormation=='Doubles'){
    if(whichTeam=='ByOne' && this.state.Team1Serving==true && this.state.Serve==2){
      this.setState({ballpos1:false, ballpos3:true, Serve:1, GameStart:false, Team1Serving:false, Team2Serving:true, ballpos2:false},()=>this.checkingScore(whichTeam))
    }
    else if(whichTeam=='ByOne' && this.state.Team2Serving==true && this.state.Serve==1){
      if(this.state.ballpos3==true){
        this.setState({ballpos4:true, ballpos3:false, ScoreTeam2:this.state.ScoreTeam2+1, Section4:this.state.Player3Name, Section3:this.state.Player4Name},()=>this.checkingScore(whichTeam))
      }
      else if(this.state.ballpos3==false && this.state.ballpos4==true){
        this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1,  Section4:this.state.Player4Name, Section3:this.state.Player3Name},()=>this.checkingScore(whichTeam))  
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
          this.setState({ballpos3:false, ballpos4:true, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player4Name, Section4:this.state.Player3Name},()=>this.checkingScore(whichTeam))
        }
        else{
          this.setState({ballpos3:false, ballpos4:true, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player3Name, Section4:this.state.Player4Name},()=>this.checkingScore(whichTeam))
        }
      }
      else if(this.state.ballpos4==true){
        if(this.state.Section3==this.state.Player3Name){
          this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player4Name, Section4:this.state.Player3Name },()=>this.checkingScore(whichTeam))
        }
        else{
          this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player3Name, Section4:this.state.Player4Name },()=>this.checkingScore(whichTeam))
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
        this.setState({ballpos2:true, ballpos1:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player2Name, Section2:this.state.Player1Name},()=>this.checkingScore(whichTeam))
      }
      else if(this.state.ballpos2==true){
        this.setState({ballpos1:true, ballpos2:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player1Name, Section2:this.state.Player2Name},()=>this.checkingScore(whichTeam))
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team1Serving==true && this.state.Serve==2){
      if(this.state.ballpos1==true){
        this.setState({ballpos2:true, ballpos1:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player1Name, Section2:this.state.Player2Name },()=>this.checkingScore(whichTeam))
      }
      else if(this.state.ballpos2==true){
        this.setState({ballpos1:true, ballpos2:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player2Name, Section2:this.state.Player1Name},()=>this.checkingScore(whichTeam))
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
        },()=>this.checkingScore(whichTeam))
      }
      else{
        this.setState({
          ballpos2:false, ballpos1:true, Section3:this.state.Player3Name, Section4:'', Section2:'', Section1:this.state.Player1Name, ScoreTeam1:this.state.ScoreTeam1+1
        },()=>this.checkingScore(whichTeam))
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
        },()=>this.checkingScore(whichTeam))
      }
      else{
        this.setState({
          ballpos3:true, ballpos4:false, Section4:'', Section3:this.state.Player3Name, ScoreTeam2:this.state.ScoreTeam2+1, Section2:'', Section1:this.state.Player1Name
        },()=>this.checkingScore(whichTeam))
      }
    }
  }
  }

  componentDidMount(){
    
    let userData = this.props.navigation.state.params.userData
    
    let players = this.props.navigation.state.params.players
    let showMulti = this.props.navigation.state.params.checkMulti
    
    if(showMulti==false){
      this.setState({
        Player1Name: players[0],
        Player3Name: players[1],
        TeamFormation:'Singles'
      })
    }
    else{
      this.setState({
        Player1Name: players[0],
        Player2Name: players[1],
        Player3Name: players[2],
        Player4Name: players[3],
        TeamFormation:'Doubles'
      })
    }
    this.changeScreenOrientation()
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }
  componentWillUnmount() {
    this.exitScreenOrientation()
    this.backHandler.remove()
  }

  handleBackPress = () => {
    if(this.state.startClicked){
      this.setState({modalVisible:true})
    }
    return true;
  }

  settingSingles(){
    if(this.playingSide=='left'){
      this.setState({
        ballpos1:true, ballpos2:false,ballpos3:false, ballpos4:false,Team1Serving:true,Team2Serving:false, Serve:1, Section2:'', Section4:'', Section1:this.state.Player1Name, Section3:this.state.Player3Name, TeamFormation:'Singles'
      })
    }
    else{
      this.setState({
        ballpos3:true, ballpos2:false, ballpos4:false,ballpos1:false,Team2Serving:true,Team1Serving:false, Serve:1, Section2:'', Section4:'', Section1:this.state.Player1Name, Section3:this.state.Player3Name, TeamFormation:'Singles'
      })
    }
  }

  settingDoubles(playingSide){
    if(playingSide=='left'){
      this.setState({ballpos3:false,ballpos1:true,ballpos2:false, ballpos4:false,Team2Serving:false,Team1Serving:true,Serve:2, Section1:this.state.Player1Name, Section2:this.state.Player2Name, Section3:this.state.Player3Name, Section4:this.state.Player4Name})
      
    }
    else{
      this.setState({ballpos3:true,ballpos1:false,ballpos2:false, ballpos4:false,Team2Serving:true,Team1Serving:false,Serve:2, Section1:this.state.Player1Name, Section2:this.state.Player2Name, Section3:this.state.Player3Name, Section4:this.state.Player4Name})
    }
  }

  gameStyle(side, gamePattern){
    if(gamePattern=='Doubles'){
      this.settingDoubles(side)
    }
    else{
      this.settingSingles(side)
    }
  }

  startingGame(){
    this.resettingGame()
    this.setState({
      modalVisible:!this.state.modalVisible, startClicked:true
    },()=>this.gameStyle(this.playingSide, this.state.TeamFormation))  

  }

  resettingGame(flag){
    if(flag=="yes"){
      this.showingAlertConfirmStart()
    }
    this.setState({
      startClicked:false,
      GameStart:true,
      Serve:0,
      ScoreTeam1:0,
      ScoreTeam2:0,
      PlayingSide:''})
  }
  


  render() {     
    let selectedItem = this.state.radioButtons.find(e=>e.checked == true)
    selectedItem = selectedItem? selectedItem.value: this.state.radioButtons[0].value
    this.playingSide=selectedItem

    let selectedTarget = this.state.pointsButton.find(e=>e.checked == true)
    selectedTarget= selectedTarget?selectedTarget.value:this.state.pointsButton[0].value
    this.TargetSelected = selectedTarget

    return (
      <View style={{flex:1, }}>
        <StatusBar hidden={true} />


        {/* Modal Settings-`--`-------------------- */}
        <Modal  animationType='slide'
                visible={this.state.modalVisible}>
            <StatusBar hidden={true} />
            {/* Heading */}
            <View style={{backgroundColor:'white', flex:0.15, justifyContent:'center', flexDirection:'row'}}>
              <View style={{flex:0.1}}>

              </View>
              <View style={{flex:0.8, justifyContent:'center'}}>
              <Text style={{ fontFamily: 'open-sans-bold', alignSelf:'center',fontSize:Responsive.font(20)}}>Settings</Text>
              </View>

              <View style={{flex:0.1, justifyContent:'center'}}>
               {this.state.startClicked? <Icon onPress={()=>this.setState({modalVisible:false})} type="FontAwesome" name="close"/>:<View></View>}   

                
              </View>
            </View>
            {/* Options */}
            <View style={{flex:0.6, flexDirection:'column'}}>

              <View style={{flex:0.5, flexDirection:'row',alignItems:'center', }}>
                <View style={{flex:0.5}}>
                  <Text style={{fontFamily: 'open-sans-simple',paddingLeft:50,fontSize:Responsive.font(20)}}>Starting Side</Text>
                </View>
                <View style={{flex:0.5}}>
                <RadioGroup
                  labelStyle={{fontFamily: 'open-sans-simple',fontSize:Responsive.font(16)}}
                  color='#0277BD'
                  radioButtons={this.state.radioButtons}
                  onPress={radioButtons=>this.setState({radioButtons})}
                  style={ {flexDirection:'row'}}
                />
                </View>
              
              </View>



              <View style={{flex:0.5,flexDirection:'row',alignItems:'center',}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontFamily: 'open-sans-simple',paddingLeft:50,fontSize:Responsive.font(20)}}>Points to win</Text>
                </View>
                <View style={{flex:0.5}}>
               <RadioGroup
                  labelStyle={{fontFamily: 'open-sans-simple',fontSize:Responsive.font(16)}}
                  color='#0277BD'
                  radioButtons={this.state.pointsButton}
                  onPress={pointsButton=>this.setState({pointsButton})}
                  style={{ flexDirection:'row',}}
                />
                </View>
              </View>



              <View style={{flex:0.5,flexDirection:'row',alignItems:'center',}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontFamily: 'open-sans-simple',paddingLeft:50,fontSize:Responsive.font(20)}}>Win By 2</Text>
                </View>
                <View style={{flex:0.5}}>
                <ListItem >
                    <CheckBox checked={this.state.checked} onPress={()=>this.setState({checked:!this.state.checked})}/>     
                  </ListItem>
                </View>
              </View>

            
              </View>

            <View style={{ flex:0.25, justifyContent:'space-around', flexDirection:'row'}}>
                <TouchableOpacity  onPress={()=>this.startingGame()} style={{ height:'50%',paddingHorizontal:20,marginTop:10,backgroundColor:'#91c549', justifyContent:'center', borderRadius:12}}>
                  <Text style={{fontFamily: 'open-sans-bold',alignSelf:'center', color:'#515151',fontSize:Responsive.font(15)}}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.resettingGame('yes')}style={{ height:'50%',paddingHorizontal:20,marginTop:10,backgroundColor:'#91c549', justifyContent:'center',borderRadius:12}}>
                <Text style={{fontFamily: 'open-sans-bold',alignSelf:'center', color:'#515151',fontSize:Responsive.font(15)}}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{ height:'50%',paddingHorizontal:20,marginTop:10,backgroundColor:'#91c549', justifyContent:'center',borderRadius:12}}>
                <Text style={{fontFamily: 'open-sans-bold',alignSelf:'center', color:'#515151',fontSize:Responsive.font(15)}}>Exit</Text>
                </TouchableOpacity>
            </View>

        </Modal>





        {/* Modal Settings-`--`-------------------- */}
        <ImageBackground style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, flexDirection:'column', flex:1,overflow: 'hidden',position:'absolute'}} source={require('../../assets/background.png')}>
                  <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height -50, flexDirection:'row'}}>
                  <View style={{width:Dimensions.get('window').width/2, flex:1, flexDirection:'row' }}>
          <View style={{flex:0.7, flexDirection:'column'}}>
            {this.state.Team1Serving?<View style={{backgroundColor:'#91c549', width:Responsive.width(100), height:Responsive.height(30), alignSelf:'flex-end', borderColor:'#707070', borderWidth:1,marginTop:'1%'}}>
              <Text style={{fontFamily: 'open-sans-bold',color:'#515151', alignSelf:'center', fontSize:Responsive.font(20)}}>{'Serve '+this.state.Serve}</Text>
            </View>:<View style={{ height:Responsive.height(30)}}></View>}
            {/* Player 2 Name and Ball */}
            
            <View style={{flex:0.6, flexDirection:'row', justifyContent:'space-between', paddingLeft:Responsive.width(70), alignItems:'center'}}> 

              <View>
                {this.state.ballpos2?<Image style={{marginLeft:Responsive.width(10)}} source={require('../../assets/ball.png')}/>:<View></View>}
              </View>


              <View>
                <Text style={{fontFamily: 'open-sans-bold',color:'white', fontSize:Responsive.font(16)}}>{this.state.Section2}</Text>
              </View>

              
            </View>
            <TouchableOpacity onPress={()=>this.fault('ByOne')} style={{ height:Responsive.height(40), width:Responsive.width(100),marginLeft:Responsive.width(80), alignSelf:'center'}}>

            </TouchableOpacity>

            {/* Player 1 Name and Ball*/}
            <View style={{flex:0.4, flexDirection:'row',justifyContent:'space-between',  paddingLeft:Responsive.width(70), alignItems:'center', marginBottom:Responsive.height(40)}}>
            <View>
               {this.state.ballpos1? <Image style={{marginLeft:Responsive.width(10)}}source={require('../../assets/ball.png')}/>:<View></View>}
              </View>


              <View>
                <Text style={{fontFamily: 'open-sans-bold',color:'white',fontSize:Responsive.font(16)}}>{this.state.Section1}</Text>
              </View> 
            </View>



            {/* Timer------------------------------------------------------------------------ */}
            
          </View> 
        {/* ------------------------------ */}
          <View style={{ flex:0.3}}>
            <View style={{height:Responsive.height(40),width:Responsive.width(50),backgroundColor:this.state.Team1Serving?'#91c549':'white', alignSelf:'center', justifyContent:'center', borderWidth:1,borderColor:'#707070'}}>
              <Text style={{fontFamily: 'open-sans-bold',color:'#515151', alignSelf:'center', fontSize:Responsive.font(16)}}>{this.state.ScoreTeam1}</Text>
            </View>
          </View>
        </View>
            
            
            
            
            
        <View style={{width:'50%',flex:1, flexDirection:'row'}}>
          <View style={{ flex:0.3}}>
            <View style={{height:Responsive.height(40),width:Responsive.width(50), backgroundColor:this.state.Team2Serving?'#91c549':'white', alignSelf:'center', justifyContent:'center', borderWidth:1, borderColor:'#707070'}}>
              <Text style={{fontFamily: 'open-sans-bold',color:'#515151', alignSelf:'center', fontSize:Responsive.font(16)}}>{this.state.ScoreTeam2}</Text>
            </View>
          </View> 
        {/* ------------------------------ */}
          <View style={{ flex:0.7, flexDirection:'column'}}>
            {this.state.Team2Serving?<View style={{backgroundColor:'#91c549', width:Responsive.width(100), height:Responsive.height(30), borderColor:'#707070',borderWidth:1,alignSelf:'flex-start', marginTop:'1%'}}>
            <Text style={{fontFamily: 'open-sans-bold',color:'#515151',alignSelf:'center', fontSize:Responsive.font(20)}}>{'Serve '+this.state.Serve}</Text>
            </View>:<View style={{height:Responsive.height(30)}}></View>}
            <View style={{flex:0.6, flexDirection:'row', justifyContent:'space-between', paddingRight:Responsive.width(70), alignItems:'center'}}> 

              


              <View>
                <Text style={{fontFamily: 'open-sans-bold',color:'white', fontSize:Responsive.font(16)}}>{this.state.Section3}</Text>
              </View>

              <View>
                {this.state.ballpos3?<Image style={{marginRight:Responsive.width(10)}} source={require('../../assets/ball.png')}/>:<View></View>}
              </View>

              </View>
              <TouchableOpacity onPress={()=>this.fault('ByTwo')} style={{ height:Responsive.height(40), width:Responsive.width(100),marginRight:Responsive.width(80), alignSelf:'center'}}>

              </TouchableOpacity>

              <View style={{flex:0.4, flexDirection:'row',justifyContent:'space-between',  paddingRight:Responsive.width(70), alignItems:'center', marginBottom:Responsive.height(40)}}>
           


              <View>
                <Text style={{fontFamily: 'open-sans-bold',color:'white',fontSize:Responsive.font(16)}}>{this.state.Section4}</Text>
              </View>
              <View>
                {this.state.ballpos4?<Image style={{marginRight:Responsive.width(10)}}source={require('../../assets/ball.png')}/>:<View></View>}
              </View>
            </View>

          </View>
        </View>
        


                  </View>

                    

                  <View style={{width:'100%', height:'10%', justifyContent:'flex-start', flexDirection:'row'}}>
                  <View style={{marginLeft:10,marginBottom:10,flexDirection:'row', borderColor:'white', borderWidth:2}}>
                    <Text style={{color:'white',fontSize:Responsive.font(20), fontFamily:'open-sans-bold', alignSelf:'center'}}>{'  '+padToTwo(this.state.min)+' : '}</Text>
                    <Text style={{color:'white',fontSize:Responsive.font(20), fontFamily:'open-sans-bold', alignSelf:'center'}}>{padToTwo(this.state.sec) +'  '}</Text>
                  </View>
                  
                  {/* <Text style={{fontSize:Responsive.font(20), fontFamily:'open-sans-bold'}}>{padToTwo(this.state.msec)}</Text> */}
                  <TouchableOpacity onPress={this.handleToggle} style={{ marginBottom:10,marginLeft:20,paddingHorizontal:20, justifyContent:'center',backgroundColor:'#91c549',borderRadius:12}}>
                    <Text style={{fontFamily: 'open-sans-bold', color:'#515151',fontSize:Responsive.font(15)}}>Start</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleReset} style={{marginBottom:10,marginLeft:20,paddingHorizontal:20, justifyContent:'center',backgroundColor:'#91c549',borderRadius:12}}>
                    <Text style={{fontFamily: 'open-sans-bold', color:'#515151',fontSize:Responsive.font(15)}}>Reset</Text>
                  </TouchableOpacity>

            
                  </View>
          
          
        </ImageBackground>
      </View>
    );
  }
}

export default ScoreCard;
