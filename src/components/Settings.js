import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Image, Linking, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { styles } from './theme/theme'
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import OrderSummary from './orderSummary';

const Settings = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentOrderData, setCurrentOrderData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loadingDesc, setLoadingDesc] = useState(true);

    const orders = firestore().collection('Managers');

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
        orders.doc(str).collection('Orders').doc('order').get().then(doc => {
            data.push(({ ...doc.data(), id: doc.id }));
            setCurrentOrderData(data);
            orders.doc(str).get().then(doc => setTotal(doc.data().balance))
            setLoadingDesc(false)
        });
        // orders.doc(str).collection('Orders').doc('order').onSnapshot(doc => {
        //     data.push(({ ...doc.data(), id: doc.id }));
        //     setCurrentOrderData(data);
        //     // setTimeout(()=>{
        //     // setLoading(false)
        //     // },2000)
        // })
        // .then(doc=>{

        // })
        // orders.doc(str).collection('Orders').get().then(snapshot =>
        //     snapshot.forEach(doc => {
        //         data.push(({ ...doc.data(), id: doc.id }));
        //         console.log(doc.data())
        //     }))

    }
    useEffect(() => {
        return orders.
            // where('accepted','==',false).
            orderBy("date", "desc").
            onSnapshot((snapshot) => {
                let data = [];
                snapshot.forEach(doc => {
                    data.push({ ...doc.data() })
                })
                setData(data)
            })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.header, { height: 50 }]}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image
                        style={{ height: 35, width: 38, margin: 5 }}
                        source={require('../assets/images/back.png')} />

                </TouchableWithoutFeedback>

            </View>
            <Modal
                isVisible={isModalVisible}
                onModalShow={afterModalOpen}
                style={{
                    justifyContent: 'center',
                    // margin: 0,
                }}
                onBackdropPress={toggleModal}
                swipeDirection={['up', 'down']}
                propagateSwipe={true}
                useNativeDriver={true}
            >
                {loadingDesc ?
                    <ActivityIndicator size="large" animating={true} />
                    : <View style={{ backgroundColor: '#fafafa' }}>
                        <OrderSummary items={currentOrderData} total={total} />
                        <TouchableOpacity onPress={toggleModal} style={[styles.button, { margin: 10, padding: 10 }]}>
                            <Text style={styles.text}>
                                CLose
                            </Text>
                        </TouchableOpacity>
                    </View>}
            </Modal>
            <Text style={styles.heading}>Orders</Text>
            <View style={styles.table}>
                <Text style={{ flex: 0.5, textAlign: 'center' }}>O.Nr.</Text>
                <Text style={{ flex: 0.7, textAlign: 'center' }}>Desc</Text>
                <Text style={{ flex: 0.8, textAlign: 'center' }}>TM</Text>
                <Text style={{ flex: 0.5, textAlign: 'center' }}>SRV</Text>
                <Text style={{ flexGrow: 1, flex: 1, textAlign: 'center' }}>Acc</Text>
                <Text style={{ flex: 1, textAlign: 'center', right: 5 }}>Date</Text>
                <Text style={{ flex: 0, textAlign: 'center', right: 1 }}>LOC</Text>
            </View>
            {data.map(item => (
                <View key={item.orderNo} style={styles.table}>
                    <Text style={{ flex: 0.5, textAlign: 'center' }}>{item.orderNo}</Text>
                    <Text
                        onPress={() => openOrderModal(item.phoneNo)}
                        style={{ flex: 0.7, textAlign: 'center' }}>Desc</Text>
                    <Text style={{ flex: 0.8, textAlign: 'center' }}>{item.deliveryTime}</Text>
                    <Text style={{ flex: 0.5, textAlign: 'center' }}>{item.serviceDuration}</Text>
                    <Text style={{ flexGrow: 1, flex: 1, textAlign: 'center' }}>{item.name}</Text>
                    <Text style={{ flex: 1, textAlign: 'center', right: 5 }}>{item.date}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/place/38.915645,-77.220796`)}>
                        <Text style={{ flex: 0, textAlign: 'center', right: 1 }}>LOC</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </SafeAreaView>
    )
}

export default Settings
