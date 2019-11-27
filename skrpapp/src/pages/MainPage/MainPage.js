import React, { Component } from 'react';
import { RefreshControl,Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, TouchableHighlight, SectionList, ActivityIndicator, StatusBar, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';


/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */


var DATA;
cart = { sku: "jalak", title: "jalak", price: "111111" };
//ip = '11.11.11.76';

url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAAD6CAMAAAA89pM0AAAAeFBMVEX///8AAABjY2PgAACmpqatra3p6elWVlZcXFzu7u4FBQWfn5+/v7/Nzc1fX1/dAADY2Nj62dn73t74+PgaGhpTU1P84uISEhIdHR2Kior/+PgNDQ0XFxc3NzfkMTHiICD1trbvjo7zqqrpZ2flODgrKyvpYWHV1dWgfPGPAAADg0lEQVR4nO3da3eaQBSFYVDxmmSiVBtNTcyl8f//w5pq7cgwF1xG9jnZ70eBtXgykJDBBdk4B+93maUFL8kfEyn4klSKAEn+M4kiQZI2KiIkSZS9ZNtHrHw4UhIOsL2knzB6LfSYN6BIkcQpYiRRigDJOo0iQHJ/l0QRILnNhgfKrxBFhCSJIkOSQhEiSaBIkcQpYiTZIEKRI4lRBEkiB5gkSZgiSnI8wH7UUGRJQhRhkgBFmsRPESfxUuRJfBSBkiPl4YQiUVJPESmpPcBkSupGRagkmzsUqRKXIlbiUORKqueKYEllVCRLTikCJMW9r/7aogiQpLSjKJHkazWSXI1kTMl1SpKMJUiSGqmR9L+LZDlEbdlMcjvvoDavXoZFJINOp+0ffm2dzqCxZNgr8OoNz5DMU7+1d83K+TmS0bV2r0EjSuCiBC9K8KIEL0rwogQvSvCiBC9K8KIEL0rwogSvL5KUN5cuOu35RZJi0rtsk6IlyaUhO0qLksnlaldSlKNLVRbtSmLrNIgSSqwo8UQJJVaUeKKEEitKPFFCiRUlniihxIoST4CSVWzD+jXQJKsPY54Wwe0WT8Z8uBg0yXN3l5kGNpuaz1Wenc/BJJu/uxmiTA9rbKoLwCQv+/30U6b/VnipLgGTvB521EeZHpe/VheBSVbdbohyhHS7zikPJskWJkD5DzHurzc0SYgShOBJspmPYkFmNdvhSXyjEh4RSEk9JQaBlNRRohBMiXuuRM6RzzAlVUoCBFVySkmBwEpsyiYFgiuxKSkQYIlFSYEgS6qUMARackqJQLAl2cKShP+5lySJDAm2RM3RVT3jQzMu0BL3t3CQgitR85dRzdWKmitINVf1s+qeOx+4QUpqplfio4IoqZ0nilIAJZ4JrxgFT6Jm5s4LiVHQJKkz3C4FTKLnroOeO0F67s7puWOq5y52tnoz5j3yzYJ3Y97wv1lwfpRQYkWJJ0oosaLEEyWUWFHiiRJKrCjxRAklVpR4ooRPKTmV6HlyjJKn+eh5wpKep161ECV4UYIXJXhRghcleFGCFyV4UYIXJXhRghcleFGC13kSNW//VPJG1hs9b8kFfnPxtpEkWw7vMGv6NmlJUYIXJXhRghcleFGCFyV4UYIXJXhRghcleFGCFyV4UYIXJXhRghcleFGCFyV4UYKXVsm2L7ftiUR+lOBFCV6KJH8A2z3pjm/dJaMAAAAASUVORK5CYII=";
export default class MainPage extends Component {
    ref = firebase.firestore().collection('products');

    state = {

        isLoading: true,
        error: null,
        x: [],
        isURLloading: true,
        query: '',
        refreshing:false
    };



    componentDidMount() {

        this.getProduct()
    }


    async getProduct() {
        this.setState({ isLoading: true })
        console.log(1);

        fetch('http://' + ip + ':3001/getProductList')
            .then((response) => response.json())
            .then((responseJson) => {
                // storage = firebase.storage();
                //  const ref = firebase.storage().ref('/test.jpg');
                // ref.getDownloadURL().then(data => {
                //     url = data;
                //     this.setState({ isURLloading: false });
                //     console.log(url);
                // }).catch(error => {
                //     console.log(error);

                // });
                console.log(responseJson);
                DATA = responseJson;

                this.setState({ isLoading: false });
                this.setState({refreshing:false});
            })
            .catch((error) => {
                console.log(error.message);
            });

    }
    async onSearch() {

        console.log('onSearch');
        Actions.SearchPage(this.state.query);

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

                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <Button
                        title="Search"
                        color="red"
                        onPress={() => this.onSearch()}
                    />
                    <TextInput onChangeText={(query) => this.setState({ query })} placeholder="Search your product" style={{ marginVertical: 25, borderRadius: 30, backgroundColor: "#F7F7F7", marginHorizontal: 16, paddingLeft: 30 }} />
                    <View style={{ height: 30, marginHorizontal: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>Categories</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 15 }}>
                        <View >
                            <TouchableHighlight>
                                <TouchableOpacity onPress={() => Actions.CategoriesPage('handmade')}>
                                    <Image source={require('../MainPage/shop.png')} style={{ width: 30, height: 30, resizeMode: "contain" }} ></Image>
                                    <Text style={{ paddingVertical: 15 }}>Handmade</Text>
                                </TouchableOpacity>
                            </TouchableHighlight>
                        </View>

                        <View>
                            <Image source={require('../MainPage/gift-box.png')} style={{ width: 30, height: 30, resizeMode: "contain" }}></Image>
                            <Text style={{ paddingVertical: 15 }}>Suvenir</Text>
                        </View>


                    </View>


                    <View style={{ height: 48, marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>Best Selling</Text>
                        <TouchableOpacity onPress={() => Actions.MyCategoriesPage()}>
                            <Text style={{ fontSize: 14 }}>See all</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={() =>this.getProduct()} />
        }>
                        <FlatList style={{}}
                            data={DATA}
                            keyExtractor={(item, index) => item.id}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <View style={{ }}>
                                    <TouchableHighlight>
                                        <TouchableOpacity onPress={() => Actions.DetailPage({ item })}>
                                            <Image source={{ uri: item.imageURL[0] }} style={{ borderRadius: 15, height: 145, width: 140, marginVertical: 10 ,marginHorizontal:20}}></Image>
                                            <Text style={{ marginHorizontal: 20 }}>{item.name}</Text>
                                            <Text style={{ marginHorizontal: 20, fontSize: 12, color: "grey" }}>{item.username}</Text>
                                            <Text style={{ marginHorizontal: 20, fontSize: 13, color: "red", fontWeight: "bold" }}>{item.price}</Text></TouchableOpacity></TouchableHighlight>
                                </View>
                            )}
                        /></ScrollView>



                </View>


                <View style={{ height: 50, backgroundColor: "white", flexDirection: "row", justifyContent: "space-around" }}>
                    <TouchableHighlight onPress={() => Actions.AddProduct()}><Image source={require('../MainPage/home.png')} style={{ alignSelf: "center", width: 30, height: 30, resizeMode: "contain", marginBottom: 10 }}></Image></TouchableHighlight>
                    <TouchableHighlight onPress={() => Actions.OrderListPage()}><Image source={require('../MainPage/home.png')} style={{ alignSelf: "center", width: 30, height: 30, resizeMode: "contain", marginBottom: 10 }}></Image></TouchableHighlight>
                    <TouchableHighlight onPress={() => Actions.CartPageTest()}>
                        <Image source={require('../MainPage/shopping-cart.png')} style={{ alignSelf: "center", width: 30, height: 30, resizeMode: "contain", marginBottom: 10 }} />
                    </TouchableHighlight><TouchableHighlight onPress={() => Actions.NavigatePage()}><Image source={require('../MainPage/profile.png')} style={{ alignSelf: "center", width: 30, height: 30, resizeMode: "contain", marginBottom: 10 }}></Image></TouchableHighlight>
                </View>

            </View>
        )
    }
}
