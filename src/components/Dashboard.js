import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Button, ActivityIndicator, Image, Linking } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import haversine from 'haversine';

import { styles, PrimayColor } from './theme/theme';
import moment from 'moment';

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
    const [STModal, setSTModal] = useState(false);
    const [ST1418Modal, set1418STModal] = useState(false);
    const [ST1901Modal, set1901STModal] = useState(false);
    const [mapModal, setMapModal] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [currentOrderData, setCurrentOrderData] = useState([]);
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [boyname, setBoyName] = useState('');
    const [firstData, setFirstData] = useState([]);
    const [secondData, setSecondData] = useState([]);
    const [phoneNo, setPhoneNo] = useState([]);
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

    useEffect(() => {
        const a = moment().isoWeekday()
        const phoneNos = [];
        boysData.forEach(e => phoneNos.push(`+237${e.phone}@domainName.com`))

        if (phoneNos.length >= 1) {
            if (moment().hour() < 19) {
                phoneNos.forEach(e => {
                    boys.doc(e)
                        .collection('14-18').
                        doc(a.toString()).get().then(doc => {
                            if (doc.data().hasOwnProperty('ST')) {
                                boys.doc(e).update({
                                    ST: doc.data()['ST']
                                })
                            }


                        })
                })
            }
            else {
                phoneNos.forEach(e => {
                    boys.doc(e)
                        .collection('19-01').
                        doc(a.toString()).get().then(doc => {
                            if (doc.data().hasOwnProperty('ST')) {
                                boys.doc(e).update({
                                    ST: doc.data()['ST']
                                })
                            }


                        })
                })
            }

        }
        // boysData.forEach(e => console.log(e.phone))

    }, [boysData])

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

            const start = {
                latitude: data[0].lat,
                longitude: data[0].long
            }
            const end = {
                latitude: 0,
                longitude: 0
            }

            let dist = 0;

            boys.doc(boyname).get().then(doc => {
                end.latitude = doc.data().lat
                end.longitude = doc.data().long
                dist = haversine(start, end, { unit: 'meter' })

                // console.log(dist)

                boys.doc(boyname).update({
                    dist: Math.ceil(dist) / 1000
                })
            })

            // alert(boyname)
            boys.doc(boyname).collection('orders').doc('order').set({
                ...data[0]
            });
            setOrderModal(false)
        });


    }

    const showWeekPLanner = (id) => {
        setLoading(true);
        console.log(id)
        boys.doc(id).collection('14-18').get().then(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                data.push(doc.data());
                set1418STModal(data)
            });
        });

        boys.doc(id).collection('19-01').get().then(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                data.push(doc.data());
                set1901STModal(data);
                setLoading(false)
            });
        });

        setSTModal(true)
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
                    useNativeDriver={true}
                    animationIn="slideInUp"
                    onBackdropPress={() => setImageModal(false)}
                    style={{ marginTop: 10, backgroundColor: '#fafafa' }}
                >
                    <View>
                        <Image style={{ height: 400, width: 300, resizeMode: 'contain', alignSelf: 'center', margin: 10 }} source={{ uri: currentImage }} />
                        <TouchableOpacity onPress={() => setImageModal(false)} style={[styles.button, { margin: 10, padding: 10 }]}>
                            <Text style={styles.text}>
                                close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    isVisible={STModal}
                    useNativeDriver={true}
                    animationIn="slideInUp"
                    onBackdropPress={() => setSTModal(false)}
                    style={{ marginTop: 10, }}
                >
                    <View style={{ backgroundColor: '#fafafa' }}>
                        <View style={[{ marginBottom: '0%', backgroundColor: '#97b54a', marginLeft: 0 }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 10, textAlign: 'center', color: '#fafafa' }}>Day/Week Planner</Text>
                        </View>
                        <View style={[styles.xAxis, { marginLeft: 0, paddingHorizontal: 8 }]}>
                            <Text style={[styles.text,]}>   </Text>
                            <Text style={styles.text}>Mo</Text>
                            <Text style={styles.text}>TUE</Text>
                            <Text style={styles.text}>WED</Text>
                            <Text style={styles.text}>THU</Text>
                            <Text style={styles.text}>FR</Text>
                            <Text style={styles.text}>SA</Text>
                            <Text style={styles.text}>SO</Text>
                        </View>
                        {loading ?
                            <ActivityIndicator size="large" /> :
                            <>
                                <View style={[styles.xAxis, { marginLeft: 0, paddingHorizontal: 8, }]}>
                                    <Text style={styles.text}>14 {"\n"}  |{"\n"}18</Text>
                                    {ST1418Modal.map(item => (
                                        <View
                                            style={[styles.xAxis, { marginLeft: 0, paddingHorizontal: 8, alignSelf: 'center' }]}>
                                            <Text style={[styles.text,]}>   </Text>
                                            <Text style={[styles.text, { alignSelf: 'flex-end' }]}>{item.ST}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={[styles.xAxis, { marginLeft: 0, paddingHorizontal: 8, }]}>
                                    <Text style={[styles.text]}>19 {"\n"}  |{"\n"}01</Text>
                                    {ST1901Modal.map(item => (
                                        <View
                                            style={[styles.xAxis, { marginLeft: 0, paddingHorizontal: 8, alignSelf: 'center' }]}>
                                            <Text style={[styles.text,]}>   </Text>
                                            <Text style={styles.text}>{item.ST}</Text>
                                        </View>
                                    ))}
                                </View>
                            </>
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => setSTModal(false)}
                        style={[styles.button, { marginTop: 10, width: '30%', height: '5%' }]}>
                        <Text style={[styles.buttonText, { alignSelf: 'center', padding: 5 }]}>Close</Text>
                    </TouchableOpacity>
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
                    <Text style={{ flexGrow: 1, flex: 1, textAlign: 'center' }}>Name</Text>
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
                            <Image style={{ height: 50, width: 50, flex: 0, resizeMode: 'contain' }} source={{ uri: item.image }} />
                        </TouchableWithoutFeedback>
                        <Text style={{ flexGrow: 0.5, flex: 1, textAlign: 'center', alignSelf: 'center', flexWrap: 'wrap' }}>{item.name}</Text>
                        <Text style={{ flexGrow: 0.4, flex: 1, textAlign: 'center', alignSelf: 'center' }}>{item.phone}</Text>
                        {/* <Text style={{flexGrow:0.2,textAlign:'center'}}>DIST</Text> */}
                        {/* <Text style={{flex:0.5,textAlign:'center'}}>ST</Text> */}
                        <Text style={{ flex: 0.4, textAlign: 'center', alignSelf: 'center' }}>
                            {item.dist}Km
 </Text>
                        <TouchableOpacity style={{ flex: 0.3, textAlign: 'center', alignSelf: 'center' }}
                            onPress={() => showWeekPLanner(item.id)}
                        >
                            <Text style={{ textAlign: 'center' }}>ST</Text>
                        </TouchableOpacity>
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
                            <Image style={{ height: 50, width: 50, flex: 0, resizeMode: 'contain' }} source={{ uri: item.image }} />
                        </TouchableWithoutFeedback>
                        <Text style={{ flexGrow: 0.5, flex: 1, textAlign: 'center', alignSelf: 'center', flexWrap: 'wrap' }}>{item.name}</Text>
                        <Text style={{ flexGrow: 0.4, flex: 1, textAlign: 'center', alignSelf: 'center' }}>{item.phone}</Text>
                        {/* <Text style={{flexGrow:0.2,textAlign:'center'}}>DIST</Text> */}
                        {/* <Text style={{flex:0.5,textAlign:'center'}}>ST</Text> */}
                        <Text style={{ flex: 0.4, textAlign: 'center', alignSelf: 'center' }}>
                            {item.dist}Km
                        </Text>
                        <TouchableOpacity style={{ flex: 0.3, textAlign: 'center', alignSelf: 'center' }}
                            onPress={() => showWeekPLanner(item.id)}
                        >
                            <Text style={{ textAlign: 'center' }}>ST</Text>
                        </TouchableOpacity>
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
