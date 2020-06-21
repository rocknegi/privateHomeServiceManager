import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Button, ActivityIndicator, Image, Linking } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

import { styles, PrimayColor } from './theme/theme';

const orders = firestore().collection('Managers');
const boys = firestore().collection('Boys');

// orders.doc('9976543210')
//     .collection('Orders')
//     .doc('order')
//     .set({
//         champagne: 3,
//         whiskey18: 1,
//         whiskeyGlass: 2,
//         hotess: 2,
//         balance: 0,
//         champagneGlass: 1,
//         total: 9100,
//         serviceTime: 2,
//         hotess: 2,
//         deliveryTime:1500

//     });
// orders.doc('6776543210')
//     .set({
//         name: 'NOKIA',
//         phoneNo: 6776543210,
//         orders: 2,
//         completed:false
//     })

// boys.doc('boy6').update({
//     FBK:false
// })

const Dashboard = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [boysData, setBoysData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [orderModal, setOrderModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [mapModal, setMapModal] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [currentOrderData, setCurrentOrderData] = useState([]);
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [boyname, setBoyName] = useState('');
    const [map, setMap] = useState([{
        latitude: '',
        longitude: ''
    }])
    // const [sentData,setSentData] = useState([])

    useEffect(() => {
        return orders.
            // where('accepted','==',false).
            onSnapshot((snapshot) => {
                let data = [];
                snapshot.forEach(doc => {
                    data.push({ ...doc.data() })
                })
                setData(data)
            })
    }, [])

    useEffect(() => {
        return boys.onSnapshot((snapshot) => {
            let data = [];
            snapshot.forEach(doc => {
                data.push(({ ...doc.data(), id: doc.id }))
            })
            setBoysData(data)
        })
    }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const openOrderModal = (order) => {
        setCurrentUser(order)
        toggleModal();
    }

    const afterModalOpen = () => {
        const phone = currentUser
        const str = phone.toString()
        let data = [];

        orders.doc(str).collection('Orders').doc('order').onSnapshot(doc => {
            data.push(({ ...doc.data(), id: doc.id }));
            setCurrentOrderData(data);
            // setTimeout(()=>{
            setLoading(false)
            // },2000)
        })
        // .then(doc=>{

        // })
        // orders.doc(str).collection('Orders').get().then(snapshot =>
        //     snapshot.forEach(doc => {
        //         data.push(({ ...doc.data(), id: doc.id }));
        //         console.log(doc.data())
        //     }))

    }

    const sendOrder = (name) => {
        setBoyName(name);
        setOrderModal(true)
    }
    const setOrder = (phone) => {
        const number = phone;
        orders.doc(number.toString()).collection('Orders').get().then(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                data.push({ ...doc.data() })
            })
            console.log(data)
            // alert(boyname)
            boys.doc(boyname).collection('orders').doc('order').set({
                ...data[0]
            });
            setOrderModal(false)
        });


    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Modal
                    isVisible={orderModal}
                    // onModalShow={afterModalOpen}
                    style={{
                        justifyContent: 'center',
                        // margin: 0,
                    }}
                    // onBackdropPress={toggleModal}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    useNativeDriver={true}
                >
                    <View style={{ backgroundColor: '#fafafa' }}>
                        {data.map(item => (
                            <TouchableWithoutFeedback key={item.phoneNo} onPress={() => setOrder(item.phoneNo)}>
                                <View style={[styles.card, { justifyContent: 'space-evenly' }]}>
                                    <Text style={[styles.text, { fontSize: 18 }]}>{item.name}</Text>
                                    <Text style={[styles.text, { fontSize: 15 }]}>{item.phoneNo}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                        <TouchableOpacity onPress={() => setOrderModal(false)} style={[styles.button, { margin: 10, padding: 10 }]}>
                            <Text style={styles.text}>
                                close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    isVisible={isModalVisible}
                    onModalShow={afterModalOpen}
                    style={{
                        justifyContent: 'center',
                        // margin: 0,
                    }}
                    onBackdropPress={toggleModal}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    useNativeDriver={true}
                >
                    {loading ?
                        <ActivityIndicator size="large" animating={true} />
                        : <View style={{ backgroundColor: '#fafafa' }}>
                            {currentOrderData.map(item => (
                                <View key={item.id} style={{ alignItems: 'center', margin: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>Balance</Text>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>{item.balance}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>Champagne</Text>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>{item.champagne}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>Champagne Glass</Text>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>{item.champagneGlass}</Text>
                                    </View>
                                    {/* <View style={{flexDirection:'row'}}>
                                <Text  style={[styles.text,{fontSize:20,flex:1}]}>Delivery Time</Text>
                                <Text  style={[styles.text,{fontSize:20,flex:1}]}>{item.deliveryTime}</Text>
                                    </View> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>Hotess</Text>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>{item.hotess}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>Time</Text>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>{item.deliveryTime}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>Total</Text>
                                        <Text style={[styles.text, { fontSize: 20, flex: 1 }]}>{item.total}</Text>
                                    </View>
                                </View>
                            ))}
                            <TouchableOpacity onPress={toggleModal} style={[styles.button, { margin: 10, padding: 10 }]}>
                                <Text style={styles.text}>
                                    Confirm
                            </Text>
                            </TouchableOpacity>
                        </View>}
                </Modal>
                <Modal
                    isVisible={imageModal}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    useNativeDriver={true}
                >
                    <View style={{ backgroundColor: '#fafafa' }}>
                        <Image style={{ height: 400, width: 300, resizeMode: 'contain', alignSelf: 'center', margin: 10 }} source={{ uri: currentImage }} />
                        <TouchableOpacity onPress={() => setImageModal(false)} style={[styles.button, { margin: 10, padding: 10 }]}>
                            <Text style={styles.text}>
                                close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* <Text style={{ fontSize: 20, padding: 10 }}>Incoming orders</Text>
               
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 5 }}>
                    {data.map(item => (
                        <TouchableWithoutFeedback key={item.id} onPress={() => openOrderModal(item.phoneNo)}>
                            <View style={[styles.card, { justifyContent: 'space-evenly' }]}>
                                <Text style={[styles.text, { fontSize: 18 }]}>{item.name}</Text>
                                <Text style={[styles.text, { fontSize: 15 }]}>{item.phoneNo}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
                <Text style={{ fontSize: 20, padding: 10 }}>
                    Hotess
                </Text>

                {boysData.map(item => (
                    <View key={item.id} style={[styles.card, { flexDirection: 'row', padding: 0 }]}>
                        <View style={{ backgroundColor: item.available ? 'green' : 'red', width: 15 }}>
                        </View>
                        <View style={{ padding: 10, alignSelf: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 20 }}>{item.name}</Text>
                            <Text style={{ fontSize: 20 }}>{item.phone}</Text>
                            {item.available?<Text style={{ fontSize: 20 }}>Available</Text>:<Text style={{ fontSize: 20 }}>Not available</Text>}
                        </View>
                        <View style={{ alignSelf: 'center', flex: 1 }}>
                            {item.available && <TouchableOpacity 
                            onPress={()=>sendOrder(item.name)}
                            style={[styles.button]}>
                                <Text style={[styles.buttonText, { fontSize: 13, color: '#000' }]}>
                                    Send Order
                                </Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                ))} */}

                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
                        <Image
                            style={styles.menu}
                            source={require('../assets/images/menu.webp')} />
                    </TouchableWithoutFeedback>
                    <Image
                        style={{ flex: 0, height: 45, width: 45, marginRight: 10, resizeMode: 'contain', alignSelf: 'center' }}
                        source={require('../assets/images/logo_white.png')}
                    />
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Account')}>
                        <Image
                            style={{ height: 25, width: 25, alignSelf: 'center', marginRight: 10 }}
                            source={require('../assets/images/user.webp')} />
                    </TouchableWithoutFeedback>
                </View>

                <Text style={styles.heading}>Incoming Orders</Text>
                <View style={styles.table}>
                    <Text style={{ flex: 0.5, textAlign: 'center' }}>O.Nr.</Text>
                    <Text style={{ flex: 0.7, textAlign: 'center' }}>Desc</Text>
                    <Text style={{ flex: 0.8, textAlign: 'center' }}>TM</Text>
                    <Text style={{ flex: 0.5, textAlign: 'center' }}>SRV</Text>
                    <Text style={{ flexGrow: 1, flex: 1, textAlign: 'center' }}>Acc</Text>
                    <Text style={{ flex: 1, textAlign: 'center', right: 5 }}>REST</Text>
                    <Text style={{ flex: 0, textAlign: 'center', right: 5 }}>LOC</Text>
                </View>
                {data.map(item => (
                    <View key={item.orderNo} style={styles.table}>
                        <Text style={{ flex: 0.5, textAlign: 'center' }}>{item.orderNo}</Text>
                        <Text onPress={() => openOrderModal(item.phoneNo)} style={{ flex: 0.7, textAlign: 'center' }}>Desc</Text>
                        <Text style={{ flex: 0.8, textAlign: 'center' }}>{item.deliveryTime}</Text>
                        <Text style={{ flex: 0.5, textAlign: 'center' }}>{item.serviceDuration}</Text>
                        <Text style={{ flexGrow: 1, flex: 1, textAlign: 'center' }}>{item.name}</Text>
                        <Text style={{ flex: 1, textAlign: 'center', right: 5 }}>{item.balance}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/place/38.915645,-77.220796`)}>
                            <Text style={{ flex: 0, textAlign: 'center', right: 5 }}>LOC</Text>
                        </TouchableOpacity>
                    </View>
                ))}


                <Text style={[styles.heading, { backgroundColor: '#93c449' }]}>Grils/ Hotess</Text>
                {boysData.filter(e => e.gender === 'Female').map(item => (
                    <View key={item.name} style={styles.table}>
                        {item.available ? <View style={styles.green}></View> : <View style={styles.red}></View>}
                        {/* <Text style={{flex:0.7,textAlign:'center'}}>{}</Text> */}
                        <TouchableWithoutFeedback onPress={() => { setCurrentImage(item.image); setImageModal(true) }}>
                            <Image style={{ height: 50, width: 50, flex: 0.5, resizeMode: 'contain' }} source={{ uri: item.image }} />
                        </TouchableWithoutFeedback>
                        <Text style={{ flexGrow: 0.5, flex: 1, textAlign: 'center', alignSelf: 'center', flexWrap: 'wrap' }}>{item.name}</Text>
                        <Text style={{ flexGrow: 1, flex: 1, textAlign: 'center', alignSelf: 'center' }}>{item.phone}</Text>
                        {/* <Text style={{flexGrow:0.2,textAlign:'center'}}>DIST</Text> */}
                        {/* <Text style={{flex:0.5,textAlign:'center'}}>ST</Text> */}
                        <TouchableOpacity
                            onPress={() => sendOrder(item.id)}
                            style={[styles.button, { flex: 0.3, alignSelf: 'center', right: 10 }]}>
                            <Text style={styles.buttonText}>ASSG</Text>
                        </TouchableOpacity>
                        {item.FBK ? <Text style={{ flex: 0, textAlign: 'center', right: 5, alignSelf: 'center', color: 'green' }}>FBK</Text> : <Text style={{ flex: 0, textAlign: 'center', right: 5, alignSelf: 'center', color: 'red' }}>FBK</Text>}
                    </View>
                ))}

                <Text style={[styles.heading, { backgroundColor: '#30a6c7' }]}>Boys</Text>
                {boysData.filter(e => e.gender === 'Male').map(item => (
                    <View key={item.name} style={styles.table}>
                        {item.available ? <View style={styles.green}></View> : <View style={styles.red}></View>}
                        {/* <Text style={{flex:0.7,textAlign:'center'}}>{}</Text> */}
                        <TouchableWithoutFeedback onPress={() => { setCurrentImage(item.image); setImageModal(true) }}>
                            <Image style={{ height: 50, width: 50, flex: 0.5, resizeMode: 'contain' }} source={{ uri: item.image }} />
                        </TouchableWithoutFeedback>
                        <Text style={{ flexGrow: 0.5, flex: 1, textAlign: 'center', alignSelf: 'center', flexWrap: 'wrap' }}>{item.name}</Text>
                        <Text style={{ flexGrow: 1, flex: 1, textAlign: 'center', alignSelf: 'center' }}>{item.phone}</Text>
                        {/* <Text style={{flexGrow:0.2,textAlign:'center'}}>DIST</Text> */}
                        {/* <Text style={{flex:0.5,textAlign:'center'}}>ST</Text> */}
                        <TouchableOpacity
                            onPress={() => sendOrder(item.id)}
                            style={[styles.button, { flex: 0.3, alignSelf: 'center', right: 10 }]}>
                            <Text style={styles.buttonText}>ASSG</Text>
                        </TouchableOpacity>
                        {item.FBK ? <Text style={{ flex: 0, textAlign: 'center', right: 5, alignSelf: 'center', color: 'green' }}>FBK</Text> : <Text style={{ flex: 0, textAlign: 'center', right: 5, alignSelf: 'center', color: 'red' }}>FBK</Text>}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboard
