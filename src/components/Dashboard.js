import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView,TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';

import { styles } from './theme/theme';

const orders = firestore().collection('Managers');
const boys = firestore().collection('Boys');

// orders.doc('9976543210')
//     .collection('Orders')
//     .doc('order1')
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
// orders.doc('9976543210')
//     .set({
//         name: 'Samsung',
//         phoneNo: 9976543210,
//         orders: 1,
//         completed:false
//     })

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [boysData, setBoysData] = useState([]);

    useEffect(() => {
        let data = [];
        return orders.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                data.push(({ ...doc.data(), id: doc.id }))
            })
            setData(data)
        })
    }, [])
    useEffect(() => {
        let data = [];
        return boys.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                data.push(({ ...doc.data(), id: doc.id }))
            })
            setBoysData(data)
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 20, padding: 10 }}>Incoming orders</Text>
                <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 5 }}>
                    {data.map(item => (
                        <TouchableWithoutFeedback key={item.id}>
                            <View style={styles.card}>
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.text}>{item.phoneNo}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
                <Text style={{ fontSize: 20, padding: 10 }}>
                    Hotess
                </Text>

                {boysData.map(item => (
                    <View key={item.id} style={[styles.card, { flexDirection: 'row', padding: 0}]}>
                        <View style={{backgroundColor:item.available?'green':'red', width: 10 }}>
                        </View>
                        <View style={{padding:10,alignSelf:'center',flex:1}}>
                            <Text style={{fontSize:20}}>{item.name}</Text>
                            <Text style={{fontSize:20}}>{item.phone}</Text>
                        </View>
                        <View style={{alignSelf:'center',flex:1}}>
                           {item.available&& <TouchableOpacity style={[styles.button,{backgroundColor:'#eee'}]}>
                                <Text style={[styles.buttonText,{fontSize:13,color:'#000'}]}>
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
