import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

import { styles } from './theme/theme';

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

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [boysData, setBoysData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [currentOrderData, setCurrentOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return orders.where('assigned','==',false).onSnapshot((snapshot) => {
            let data = [];
            snapshot.forEach(doc => {
                data.push(({ ...doc.data(), id: doc.id }))
            })
            setData(data)
        })
    }, [])

useEffect(()=>{
    return boys.onSnapshot((snapshot) => {
        let data = [];
        snapshot.forEach(doc => {
            data.push(({ ...doc.data(), id: doc.id }))
        })
        console.log(data)
        setBoysData(data)
    })
},[])

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
        console.log(str)
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 20, padding: 10 }}>Incoming orders</Text>
                <Modal
                    isVisible={isModalVisible}
                    onModalShow={afterModalOpen}
                    style={{
                        justifyContent: 'center',
                        // margin: 0,
                    }}
                    onBackdropPress={toggleModal}
                    swipeDirection={['up', 'left', 'right', 'down']}
                >
                    {loading ?
                        <ActivityIndicator size="large" animating={true} />
                        : <View style={{ backgroundColor: '#fafafa' }}>
                            {currentOrderData.map(item => (
                                <View key={item.id} style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}>Balance : {item.balance}</Text>
                                    <Text style={{ fontSize: 20 }}> Hotess : {item.hotess}</Text>
                                    <Text style={{ fontSize: 20 }}> Total : {item.total}</Text>
                                </View>
                            ))}
                            <TouchableOpacity onPress={toggleModal} style={[styles.button, { margin: 10 }]}>
                                <Text style={styles.text}>
                                    close
                            </Text>
                            </TouchableOpacity>
                        </View>}
                </Modal>
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
                            {item.available && <TouchableOpacity style={[styles.button]}>
                                <Text style={[styles.buttonText, { fontSize: 13, color: '#000' }]}>
                                    Send Order
                                </Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboard
