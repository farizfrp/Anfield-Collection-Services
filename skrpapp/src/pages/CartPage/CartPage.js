import React, { Component } from 'react';
import { Alert, FlatList, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, TouchableHighlight, SectionList, ActivityIndicator, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import InputSpinner from 'react-native-input-spinner';

export default class CartPage extends Component {

    DATA = [];
    // ip = '192.168.1.7';
    orderList = [];
    state = {

        isLoading: true,
        error: null,
        x: [],
        isURLloading: true,
        quantity: 1,
        number: 1,
        sum: 0

    };
    sum = 0;
    async componentDidMount() {
        //this.pullCart()
        if (this.props.item) {
            await this.pushCart();


        }
        this.getCart()

    }

    async promptPull(id) {

        Alert.alert(
            'Hapus Keranjang',
            'Anda yakin akan menghapus produk ini ?',
            [

                {
                    text: 'Batal',
                    onPress: () => { return; },
                    style: 'cancel',
                },
                { text: 'Ya', onPress: () => this.pullCart(id) },
            ],
            { cancelable: false },
        );


    }
    async pullCart(id) {
        console.log('pull SKU = ' + id);

        let x = await fetch('http://' + ip + ':3001/pullCart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })


        });

        console.log('Pushed');
        Actions.CartPage();

    }
    async getCart() {

        console.log(1);

        let x = await fetch('http://' + ip + ':3001/getCarts')
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson[0].product);
                DATA = [{
                    title: responseJson[0],
                    data: responseJson[0].product
                }]
                console.log(responseJson);
                this.orderList = responseJson[0].product;
                this.groupBy(this.orderList);
                this.sumTotal(0, 0);
                //  console.log(total);


            })
            .catch((error) => {
                console.log(error.message);
            });
        this.setState({ isLoading: false })
        console.log(this.orderList)
    }
    groupBy(collection) {
        var i = 0;
        let result = [{ title: null, data: [] }];
        result[i].title = collection[0].merchant;

        for (var value of collection) {
            console.log(i);
            if (value.merchant == result[i].title) {
                result[i].data.push(value);

            }
            else {
                i++;
                result.push({ title: null, data: [] })
                console.log("else = " + value.merchant);
                result[i].title = value.merchant;
                result[i].data.push(value);


            }
        }
        console.log(result);
        return result;
    }
    sumTotal(num, index) {
        if (num != 0) {
            this.orderList[index].quantity = num;
        }
        this.sum = this.orderList.reduce(function (prev, cur) {
            return prev + (Number(cur.price) * Number(cur.quantity));
        }, 0);
        this.setState({ sum: this.sum });

    }

    async pushCart() {
        console.log('pushcart');
        cart = { id: this.props.item.id, quantity: this.state.quantity };
        let x = await fetch('http://' + ip + ':3001/addCart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        }).then((response) => {
            console.log(response)




        });
        return;
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

        if (this.state.error) {
            console.log('erorrrororororo broo');
            console.log(this.state.error);
            return (<View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
                <StatusBar barStyle="dark-content" />
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>{this.state.error}</Text>
                </View>
            </View>);
        }
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>


                        <FlatList
                            data={this.orderList}
                            keyExtractor={(item, index) => item.id}
                            numColumns={1}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: "row", backgroundColor: "#f5f6f7", borderBottomWidth: 1, borderColor: "grey" }}>
                                    <View style={{ marginTop: 30 }}>

                                        <Image source={{ uri: item.imageURL[0] }} style={{ marginHorizontal: 20, borderRadius: 15, height: 100, width: 90 }}></Image></View>
                                    <View style={{ marginHorizontal: 25, marginVertical: 45 }}>

                                        <Text style={{}}>{item.name} </Text>
                                        <Text style={{ color: "red" }}>Rp.{item.price} </Text>
                                        <Text style={{ color: "grey" }}>Quantity {item.quantity}</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ height: 1, width: 25, borderRadius: 20, marginTop: 10 }}>
                                                <InputSpinner
                                                    max={item.quantityproduct}
                                                    min={1}
                                                    step={1}
                                                    rounded={false}
                                                    colorMax={"#f04048"}
                                                    colorMin={"#40c5f4"}
                                                    value={this.state.number}
                                                    onChange={(num) => { this.sumTotal(num, index) }} />
                                            </View >
                                            <View style={{ borderRadius: 20, paddingLeft: 70 }}>
                                                <TouchableOpacity onPress={() => this.promptPull(item.id)}>
                                                    <Image style={{ width: 30, height: 50, marginTop: -30, marginLeft: 65 }} source={require('../CartPage/delete.png')}

                                                    ></Image>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            )}
                        />

                    </View>
                </ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "#f5f6f7", height: 75 }}>
                    <View style={{ justifyContent: "center" }}><Text style={{ fontWeight: "bold" }}>Total Pembayaran</Text>
                        <Text >Rp.{this.state.sum}</Text>
                    </View>

                    <View style={{ height: 600, width: 120, borderRadius: 20, marginVertical: 20 }}>
                        <Button
                            title="Checkout"
                            color="red"
                            onPress={() => Actions.OrderPage({ data: this.orderList })}
                        />
                    </View >

                </View>
            </View>












        )

    }
}
