import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, FlatList, TouchableOpacity, Text, View, Image, ScrollView, TextInput, Button, StyleSheet, Picker } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Actions } from 'react-native-router-flux';
//import { auth } from 'firebase-admin';

export default class OrderPage extends Component {
    data = this.props.data;
    state = {
        isLoading: true,
        textInputs: [],
        courierservices: []
    };

    order = {
        created_on: new Date().getTime(),

        shipping: {
            customer: "Fariz Reynaldo",
            address: "default",
            city: "default",
            region: "default",
            state: "default",
            delivery_notes: "default",

            tracking: {
                company: "JNE",
                tracking_number: "22122X211SD",
                status: "baru saja di input",
                estimated_delivery: "5 November 2019"
            }
        },

        payment: {
            method: "visa",
            transaction_id: "2312213312XXXTD",
            total: 0
        },

        products: this.data
    }

    address = auth.shipping.map(function (row) {

        return { label: row.name + " - " + row.address, value: row.city.id }
    })
    courier = [{ label: "JNE", value: "jne" }, { label: "POS Indonesia", value: "pos" }, { label: "Tiki", value: "tiki" }];
    courierservices = [];
    shipping = {
        origin: 0,
        destination: this.address[0].value,
        weight: 300,
        courier: "jne",
        deliveryfee: 0
    }
    shippings = [];

    async onCourierChange(index) {
console.log("index",index)
        this.courierservices[index] = await this.getCourierServices(index);
        this.setState({ courierservices: this.courierservices })

        console.log("Jalan", this.courierservices[index]);

    }

    async componentDidMount() {
        index = 0;
        result = [];



        // this.shipping.origin = ad.value;
        console.log("Push", this.address[0].value)
      

await this.initiateShippings();
        console.log("This.data", this.data)
        for (const ship of this.shippings){


           await this.onCourierChange(index);
           
            index++;
        }
       
       
        console.log("Shippings", this.shippings)
        console.log("isLoading Set")
     this.setState({ isLoading: false })

    }
    async initiateShippings(){
        console.log("terpanggil initiate",this.data)
       var index = 0;
        for (const ad of this.data) {
            console.log("terpanggil initiate")
            // this.shipping.origin = ad.value;
            var address = await this.getAddress(ad.title);
        
            console.log("Address ", address)
            this.shippings[index] = {
                origin: address,
                destination: this.shipping.destination,
                weight: 0 ,
                courier: this.shipping.courier,
                deliveryfee: this.shipping.deliveryfee
            };
            for(const weight of ad.data){
               this.shippings[index].weight=this.shippings[index].weight+( Number(weight.shipping_details.weight)*weight.quantity);

           }
            console.log("This.shippings", this.shippings[index])
            console.log("This.shippings", this.shippings)
            index++;

        }
        console.log("This.shippings", this.shippings)
return;
    }
    async onAddressChange(addressIndex) {
        addressIndex = addressIndex - 1;
        var services;
        var index = 0;
        for (const address of this.shippings) {
            console.log("this.shippings[index].destination", addressIndex)
            this.shippings[index].destination = this.address[addressIndex].value;
            console.log("this.shippings[index].destination", this.shippings[index].destination)
            console.log("index++", index)
            index++;
        }
        index = 0;
        console.log("GetOngkir");
        for (const res of this.shippings) {
            services[index] = await this.getCourierServices(index);
            index++;


        }
        this.setState({ courierservices: services })
        console.log("CourierServices ", services)
    }

    async getCourierServices(index) {
        console.log(index)
        console.log("getCourierServices",this.shippings[index]);
        var results = null;
        await fetch('https://api.rajaongkir.com/starter/cost', {
            method: 'POST',
            headers: {

                'key': '7567d6480344c47b7e978c6a825077ce',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.shippings[index])
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("Result ", responseJson)
                results = responseJson.rajaongkir.results[0].costs;
                console.log("Result ", results)
                this.courierservices[index] = results;
                console.log("this.courierservices",this.courierservices);
               
               // results = this.courierservices[index];

                this.state.courierservices[index]= results[index];
               
                console.log("this.state.courierservices",this.state.courierservices);
                index++;
            })
            .catch((error) => {
                console.log(error.message);
            });
           results= results.map(function (row) {
                return { label: row.service + " - (" + row.cost[0].etd + " Hari) - Rp." + row.cost[0].value, value: {cost:row.cost[0].value,service:row.service }}
            })
            console.log("results",results)
        return results;

    }
    async getAddress(userid) {
        result = null;
        console.log('getAddress');
        //   console.log(this.props.data);
        //   ip = '192.168.1.7';
        let x = await fetch('http://' + ip + ':3001/getAddress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid: userid })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // this.shipping.destination = responseJson[0].shipping[0].city.id;
                console.log("Shipping", this.shipping);
                // this.setState({ isLoading: false });
                console.log("responseJson[0].shipping[0].city.id", responseJson[0].shipping[0].city.id)
                result = responseJson[0].shipping[0].city.id;


            })
            .catch((error) => {
                console.log(error.message);
            });
        return result;
        
    }
    async onSubmit() {

        console.log("this.order");

        console.log(this.order);
        var index = 0;
for(const ord of this.data){
this.order.products[index].shipping=this.shippings[index];
index++;

}
        //ip='192.168.1.7';
         let x = await fetch('http://' + ip + ':3001/addOrder', {
             method: 'POST',
             headers: {
                'Accept': 'application/json',
                 'Content-Type': 'application/json'
          },
             body: JSON.stringify(this.order)
        });

        console.log('Pushed');
        console.log(this.order);
        Actions.OrderListPage();

    }

    render() {
        if (this.state.isLoading) {

            console.log('isLoading broo');

            return (<View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
                <StatusBar barStyle="dark-content" />
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>LOADING !!!</Text>
                </View>
            </View>);
        }
        console.log('Tidak Loading');
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={{
                        flex: 1,

                    }}>
                    <View style={{ flex: 1, backgroundColor: "white" }}>


                        <View style={{ marginLeft: 8, marginVertical: 30 }}>
                            <Text style={{ fontSize: 25 }}>Order Detail             </Text>
                            <Text style={{ color: "grey" }}>Isi Detail Order</Text>
                            <View style={{ marginVertical: 10 }}></View>

                        </View>
                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                            <Text>Alamat</Text>
                            <RNPickerSelect

                                onValueChange={(value, index) => {
                                    this.shipping.destination = value
                                    this.onAddressChange(index);
                                    console.log("Shipping", this.shipping)
                                }}
                                items={this.address}
                            />

                        </View>

                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                            <Text>Jenis Pembayaran</Text>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: 'BCA Virtual Account', value: 'bca' },
                                    { label: 'GO-PAY', value: 'gopay' },
                                    { label: 'Merchant Indomaret', value: 'indomaret' },
                                ]}
                            />

                        </View>
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <FlatList
                                style={{ flex: 1 }}
                                data={this.data}
                                renderItem={({ item, index }) => {
                                    return (

                                        <View style={{ marginLeft: 8, marginVertical: 10 }}>
                                            <Text>Toko {item.title}</Text>




                                            <View style={{ marginLeft: 8, marginVertical: 10 }}>
                                                <Text>Kurir </Text>
                                                <RNPickerSelect
                                                    onValueChange={(value) => {
                                                        
                                                        this.shippings[index].courier=value;
                                                        this.onCourierChange(index);
                                                        console.log("Indexdex", index)
                                                    }}
                                                    items={this.courier}
                                                />

                                            </View>
                                            <View style={{ marginLeft: 8, marginVertical: 10 }}>
                                                <Text>Service Kurir </Text>
                                                <RNPickerSelect
                                                    onValueChange={(value) => {
                                                        
                                                     this.shippings[index].deliveryfee=value.cost;
                                                     this.shippings[index].service=value.service;
                                                        console.log("Indexdex")
                                                    }}
                                                    items={this.state.courierservices[index]}
                                                />

                                            </View>

                                        </View>

                                    );
                                }}
                            />
                        </View>



                        <View style={{ marginHorizontal: 8, borderRadius: 20, marginVertical: 10 }}>
                            <Button
                                title="Tambahkan"
                                color="red"
                                onPress={() => this.onSubmit()}
                            />
                        </View>
                    </View>


                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    borderContainer: {

        borderRadius: 16,

        height: 669,
        marginHorizontal: 30,
        marginTop: 30,
        marginVertical: 30
    },
    TextInputStyles: {
        borderBottomWidth: 2,
        borderColor: "red"
    }
});
