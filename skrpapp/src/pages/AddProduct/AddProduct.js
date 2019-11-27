import React, { Component } from 'react';
import {Alert, Text, View, Image, ScrollView, TextInput, Button ,StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
//import { auth } from 'firebase-admin';


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
  
}
var data = {
           
    name:"NO NAME",
    id: "xx1-"+makeid(5),
    description:"Default Description",
    merchant:"default",
    manufacture_details:{sku:"xxx",release_date:new Date().getTime()},
    categories:["default"],
    shipping_details:{weight:0,width:0,height:0,depth:0},
    quantityproduct:0,
    price:0,
    imageURL:["https://screenshotlayer.com/images/assets/placeholder.png"]
    }
export default class AddProduct extends Component {
    state = {
        email: '',
            password: '',
            isLoggingIn: false,
            message: '',
            photo: null,
            path:"/storage/emulated/0/DCIM/Camera/IMG_20191005_101026.jpg",
            imageURL:"bukan"
        } 
        
        options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };




      
    choosePicture() {
        const granted = this.requestCameraPermission();
        ImagePicker.showImagePicker(this.options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    console.log(response);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
            photo: source,
            fileName: response.fileName
        });
        this.uploadImage()
        console.log("source = "+ source);
      }
    });
   
  }
//<Image source={this.state.avatarSource}  />
uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

requestCameraPermission() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
   return} catch (err) {
      console.warn(err);
    }
  }
uploadImage() {
var outPut = "/storage/emulated/0/";
var onSuccess;
console.log( this.state.photo.uri);
//console.log(  outPut+this.state.fileName.toString());
    ImageResizer.createResizedImage(this.state.photo.uri, 640, 480, 'JPEG', 80).then((res) => {
      outPut=outPut+this.state.fileName.toString();
      console.log("REZIZED = "+ res.path);
      fileName= '/'+this.uuidv4()+'.jpeg';
        // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
        var uploadTask =    firebase
          .storage()
        .ref(fileName)
       .putFile(
        res.path
        );

      uploadTask.on('state_changed', function(snapshot){
       onSuccess=snapshot;
     console.log(snapshot.bytesTransferred);
          
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case firebase.storage.TaskState.PAUSED: // or 'paused'
          //     console.log('Upload is paused');
          //     break;
          //   case firebase.storage.TaskState.RUNNING: // or 'running'
          //     console.log('Upload is running');
          //     break;
          //     case firebase.storage.TaskState.SUCCESS: 
              
          //      // or 'running'
          //     console.log('Upload is SUCCESS');
          //     break;
          // }
        }, function(error) {
          console.log('ERROR = '+ error);
          console.log('ERROR = '+ error.message);
        
          // Handle unsuccessful uploads
        }, function() {
          console.log('Upload Success beneran');
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          // uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //   console.log('File available at', downloadURL);
          // });
         
          onSuccess.ref.getDownloadURL().then(function(downloadURL) {
            data.imageURL[0]=downloadURL;
            console.log('File available at', downloadURL);
            Alert.alert(
              'Berhasil !!!',
              'Gambar Berhasil Di Upload',
              [
                
                
                {text: 'Ya', onPress: () => {return }},
              ],
              {cancelable: false},
            );
          });
        });




     //   console.log("down = = = = = = ="+z.getDownloadURL());
      }).catch((err) => {
        console.log(err);
      });


  
      }
 
      async onSubmit() {
        console.log(this.state.imageURL);

        console.log('pushproduct');
        console.log(data);   
        data.merchant=auth.id;
       // ip='192.168.1.7';
    let x = await fetch('http://' + ip + ':3001/addProduct', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(data)
      });
     
      console.log('Pushed');
    Actions.MainPage();

    }


    render(){
        const { photo } = this.state;
    return (
        <View style={{ flex: 1 }}>
 <ScrollView
         style={{
      flex: 1,
     
  }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                
               
                {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
                    <View style={{ marginLeft:8,marginVertical:30 }}>
                        <Text style={{ fontSize: 25 }}>Tambah Produk             </Text>
                        <Text style={{color:"grey"}}>Tambahkan produk baru</Text>
                        <View style={{marginVertical:10}}></View>

                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Nama Produk</Text>
                        <TextInput placeholder="Nama " style={ styles.TextInputStyles} 
                            onChangeText={(nama) => data.name=nama}/>
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>SKU</Text>
                        <TextInput placeholder="SKU " style={ styles.TextInputStyles} 
                        onChangeText={(sku) => data.manufacture_details.sku = sku}/>
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Deskripsi Produk</Text>
                        <TextInput placeholder="Deskripsi " style={ styles.TextInputStyles} 
                            onChangeText={(description) => data.description=description}/>
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Nama Toko</Text>
                        <TextInput placeholder="Merchant " style={ styles.TextInputStyles} 
                            onChangeText={(merchant) => data.merchant=merchant}/>
                    </View>
                    <View style={{ marginLeft:8}}>
                        <Text>Categories</Text>
                        <TextInput placeholder="Tas Kulit" style={ styles.TextInputStyles}
                        onChangeText={(kategori) => data.categories[0]=kategori} />
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Quantity</Text>
                        <TextInput placeholder="10" style={ styles.TextInputStyles } 
                        onChangeText={(kuantitas) => data.quantityproduct=Number(kuantitas)}/>
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Berat</Text>
                        <TextInput placeholder="50 Gram" style={ styles.TextInputStyles}
                        onChangeText={(berat) => data.shipping_details.weight=berat} />
                    </View>
                    
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Harga</Text>
                        <TextInput placeholder="Rp.150.000,00" style={ styles.TextInputStyles} 
                        onChangeText={(harga) => data.price=harga}/>
                    </View>
                   
              <View style={{ marginHorizontal: 8,borderRadius:20,marginVertical:10}}>
              <Button
          title="Tambahkan"
          color="red"
          onPress={() => this.onSubmit()}
        /><Button
        title="Choose PICTURE"
        color="blue"
        onPress={() => this.choosePicture()}
      />
   
              </View>
                </View>
               
          
            </ScrollView>
        </View>
    )
}}
const styles = StyleSheet.create({
    borderContainer: {
      
        borderRadius:16,
      
        height: 669, 
        marginHorizontal:30,
        marginTop:30,
        marginVertical:30
    },
TextInputStyles : {
    borderBottomWidth: 2, 
    borderColor: "red" 
}
});
