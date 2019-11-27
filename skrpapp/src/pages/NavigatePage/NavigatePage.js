import React, { Component } from 'react';
import { Alert,PermissionsAndroid,Text, View, Image, ScrollView, TextInput, Button ,StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNPickerSelect from 'react-native-picker-select'; 
var profileImage=null;   
export default class NavigatePage extends Component {
   



    render(){
       
     return (
    
        <View style={{ flex: 1 }}>

      
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.borderContainer}>
                  <ScrollView>
                   
                   
                  
        
                    
                   
              <View style={{ marginHorizontal: 35,borderRadius:20,marginVertical:10}}>
              <Button
          title="Add Product"
          color="green"
          onPress={() => Actions.AddProduct()}
        />
           <Button
          title="Merchant Product"
          color="green"
          onPress={() => Actions.ListProduct()}
        />
        <Button
          title="Filter Price"
          color="green"
          onPress={() => Actions.filterPricePage()}
        />
          <Button
          title="Login Page"
          color="green"
          onPress={() => Actions.Login()}
        />
         <Button
          title="Register Page"
          color="green"
          onPress={() => Actions.RegisterPage()}
        />
        <Button
          title="Profile Page"
          color="green"
          onPress={() => Actions.ProfilePage()}
        />
              </View></ScrollView>
                </View>

            </View>
           
        </View>
    )
}}
const styles = StyleSheet.create({
    borderContainer: {
        borderWidth:2,
        borderRadius:20,
        borderColor: "red",
        height: 500, 
        marginHorizontal: 40,
        marginTop:30
    },
TextInputStyles : {
    borderBottomWidth: 2, 
    borderColor: "red" 
}
});
