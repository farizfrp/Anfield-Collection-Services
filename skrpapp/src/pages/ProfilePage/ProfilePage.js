import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity , TouchableHighlight,StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


const ProfilePage = (props) => {
    const {navigate} = props.navigation;
    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1, backgroundColor: "white", }}>
            <ScrollView>

<Avatar
  size="large"
  rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  }}
  activeOpacity={0.7}
  containerStyle={{marginHorizontal:30,marginVertical:30}}
/>

<Text style={{marginHorizontal:120,marginVertical:-90,fontSize:15}}>Fariz Reynaldo</Text>


<View style={{ marginHorizontal: 30,marginTop:140}}>
                        <Text>Nama Lengkap</Text>
                        <View placeholder="Fariz Reynaldo"  />

                    </View>
                    <View style={{ marginHorizontal: 30,paddingTop:15}}>
                        <Text>Tanggal Lahir</Text>
                        <TextInput placeholder="20/05/2019" style={ styles.TextInputStyles} />

                    </View>
                    <View style={{ marginHorizontal: 30,paddingTop:15}}>
                        <Text>Jenis kelamin</Text>
                        <TextInput placeholder="Laki-Laki" style={ styles.TextInputStyles} />

                    </View>
                    <View style={{ marginHorizontal: 30,paddingTop:15}}>
                        <Text>Email</Text>
                        <TextInput placeholder="haha@gmail.com" style={ styles.TextInputStyles} />

                    </View>
                    <View style={{ marginHorizontal: 30,paddingTop:15}}>
                        <Text>No Hp</Text>
                        <TextInput placeholder="0857434343546" style={ styles.TextInputStyles} />

                    </View>
                    <View style={{ marginHorizontal: 35,borderRadius:20,marginVertical:0}}>
              <Button
          title="Simpan"
          color="red"
          onPress={() => navigate('MyLoginPage')}
        />
              </View>
               
                    </ScrollView>

        
        
            </View>
           
         
            <View style={{height:50,backgroundColor:"white",flexDirection:"row",justifyContent:"space-around"}}>
            <Image source={require('../MainPage/home.png')} style={{alignSelf:"center",width:30,height:30,resizeMode:"contain",marginBottom:10}}></Image>
            <Image source={require('../MainPage/shopping-cart.png')} style={{alignSelf:"center",width:30,height:30,resizeMode:"contain",marginBottom:10}}></Image>
            <Image source={require('../MainPage/profile.png')} style={{alignSelf:"center",width:30,height:30,resizeMode:"contain",marginBottom:10}}></Image>
            </View>
      
        </View>
    )
}

const styles = StyleSheet.create({
    borderContainer: {
        borderWidth:2,
        borderRadius:16,
        borderColor: "red",
        height: 499, 
        marginHorizontal:30,
        marginTop:30,
        marginVertical:30
    },

});
export default ProfilePage;