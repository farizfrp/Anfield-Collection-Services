import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity,FlatList,ActivityIndicator,StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ResultStorage } from 'firebase-functions/lib/providers/testLab';


export default class filterPricePage extends Component {

    state = {

        isLoading: true,
        error: null,
        x: [],
        isResult: this.isResult()

    };
    range={greatThan:0,lessThan:0}
PRODUCT=[];
isResult(){
result =true;
if(typeof this.props.lessThan === 'undefined'){

return false;
}

    return result;
}
   async componentDidMount() {
    console.log("RWSUSU",this.state.isResult);
        if(this.props.range){
        this.range=this.props.range;
        await this.getProducts();
        this.setState({isResult:true})
        }
        console.log('Range', this.range);
    }
    async getProducts() {

        console.log('filterPrice');
       
     //   ip = '192.168.1.7';
        let x = await fetch('http://' + ip + ':3001/filterPrice', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.range)
      }).then((response) => response.json())
      .then((responseJson) => {
        this.PRODUCT=responseJson;
        this.setState({ isLoading: false });
          console.log(responseJson);
          this.setState({isResult:true})
         this.state.isResult=true;
      })
      .catch((error) => {
          console.log(error.message);
      });

    }
    render(){
         if (this.state.isResult==false) {

           

            return (<View style={{ flex: 1, padding: 20 }}>
               
                <View>
                <View style={{ marginHorizontal: 30}}>
                        <Text>greatThan</Text>
                        <TextInput keyboardType='numeric' onChangeText={(greatThan) => this.range.greatThan=greatThan}placeholder="Harga Lebih Dari . . . "  />
                    </View>
                    <View style={{ marginHorizontal: 30}}>
                        <Text>lessThan</Text>
                        <TextInput keyboardType='numeric' onChangeText={(lessThan) => this.range.lessThan=lessThan}placeholder="Harga Kurang Dari . . . "  />
                    </View>
                    <Button
          title="Search"
          color="red"
          onPress={() => Actions.filterPricePage({range:this.range})}
        />
                </View>
            </View>);
        }
        if (this.state.isLoading) {

            console.log('isLoading broo');

            return (<View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
                <StatusBar barStyle="dark-content" />
                <View>
                <Text>LOADINGGGGGGGGGG</Text>
                </View>
            </View>);
        }
       
    return (
        
        <View style={{ flex: 1 }}>
        <ScrollView>
            <Image style={{height:300,width:380, resizeMode:"contain",backgroundColor:"grey"}} source={require('../CategoriesPage/eva.png')}></Image>
                    <View style={{ flex: 1, backgroundColor: "white",translateY:-110,borderTopRightRadius: 50,borderTopLeftRadius:50}}>
         
                    <View style={{flexDirection:"row",justifyContent:"center",marginVertical:32,flexWrap:"wrap"}}>
                  
          <FlatList 
data={this.PRODUCT}
keyExtractor={(item, index) => item.id }
numColumns={2}
renderItem={({item}) => (   
    <View style={{paddingHorizontal:8}}>
    <TouchableOpacity onPress={()=>Actions.DetailPage({ item })}>
        <Image source={{ uri: item.imageURL[0] }} style={{borderRadius:15,height:145,width:140}}></Image>     
        </TouchableOpacity>
        <Text style={{marginHorizontal:20}}>{item.title}</Text>
        <Text style={{marginHorizontal:20,fontSize:12,color:"grey"}}>{item.name}</Text>
        <Text style={{marginHorizontal:20,fontSize:13,color:"red",fontWeight:"bold"}}>{item.price}</Text>
    </View>
)}
/>
                      
                      
                    </View>
                    
                      </View>
                      </ScrollView>
        </View>
       
    )
}

}