import React from 'react';
import { View, Text, Picker, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import EventCardsMa2 from './EventCardsMa2'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            seName: '',
            Password: '',
            msg: "",
            language: '',
            seLoc:''
        };
    }
    render() {
        console.log("state", this.state)
        return (
            <View style={{ padding: 10 }}>
                  <ScrollView >
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.myDrops}>
                        <Picker
                            selectedValue={this.state.language}
                            style={styles.myDrop}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ language: itemValue })
                            }>
                            <Picker.Item label="Event Type" value="" />
                            <Picker.Item label="Recreational" value="recreational" />
                            <Picker.Item label="League" value="league" />
                            <Picker.Item label="Tournament" value="tournament" />
                        </Picker>
                    </View>
                    <View style={styles.myDrops}>
                        <Picker
                            selectedValue={this.state.language}
                            style={styles.myDrop}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ language: itemValue })
                            }>
                            <Picker.Item label="Event Division" value="" />
                            <Picker.Item label="Men's Singles" value="Men's Singles" />
                            <Picker.Item label="Men's Doubles" value="Men's Doubles" />
                            <Picker.Item label="Women's Single" value="Women's Single" />
                            <Picker.Item label="Womem's Doubles" value="Womem's Doubles" />
                            <Picker.Item label="Mixed Doubles" value="Mixed Doubles" />
                        </Picker>
                    </View>

                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.forms}
                        placeholderTextColor={'gray'}
                        onChangeText={seName => this.setState({ seName })}
                        value={this.state.seName}
                        placeholder="Search by Name"
                        keyboardType="default"
                        returnKeyType="next"
                    />
                    <Image style={{ padding: 10,width:20,height:20}} source={require('../../assets/Path100.png')} />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.forms}
                        placeholderTextColor={'gray'}
                        onChangeText={seLoc => this.setState({ seLoc })}
                        value={this.state.seLoc}
                        placeholder="Search by Location"
                        keyboardType="default"
                        returnKeyType="next"
                    />
                    <Image style={{ padding: 10,width:20,height:20}} source={require('../../assets/Path100.png')} />
                </View>
                <View style={{height:1,backgroundColor:'gray',marginTop:10,marginBottom:10}}/>
              
                    <EventCardsMa2/>
                    <EventCardsMa2/>
                    <EventCardsMa2/>
                    <EventCardsMa2/>
                    <EventCardsMa2/>
                    <EventCardsMa2/>

                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    myDrops: {
        width: Dimensions.get('window').width / 2  - 15,
        alignItems: 'center',
        marginRight:10,
        borderWidth: 1,
        borderColor: '#48A080',
        fontSize: 20,
        borderRadius: 5,
        backgroundColor: '#F6F6F6',
    },
    myDrop: {
        height: 50,
        width: '100%',
        color: '#48A080',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius:5,
        borderColor:"#48A080",
        borderWidth:1,
        marginTop:10
    },
    forms: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#48A080',
        width: Dimensions.get('window').width  - 100,
        fontSize:20,
    },


});