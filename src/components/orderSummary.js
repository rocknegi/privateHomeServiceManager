import React, { Component, } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import firestore from '@react-native-firebase/firestore';

import { PrimayColor } from './theme/theme'

export class OrderSummary extends Component {

    state = {
        items: []
    }
    componentDidMount() {
        this.setState({ items: JSON.parse(this.props.items[0][0]) })
    }
    render() {
        // console.log(JSON.stringify(this.props.items, undefined, 3))
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.items &&
                    <View>
                        <View style={[styles.list, { backgroundColor: '#eee' }]}>
                            <Text style={[styles.text, { flexGrow: 1.5, borderWidth: 1, margin: 1 }]}>Product</Text>
                            <Text style={[styles.text, { flexGrow: 1.2, borderWidth: 1, margin: 1 }]}>Price</Text>
                            <Text style={[styles.text, { flexGrow: 1.3, borderWidth: 1, margin: 1 }]}>Quantity</Text>
                            <Text style={[styles.text, { borderWidth: 1, margin: 1 }]}>Total</Text>
                        </View>

                        {this.state.items.filter(e => e.category === 'Social').map(item => {
                            return (
                                <View key={item.title}>
                                    <View style={styles.list} >
                                        <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                        <Text style={styles.text}>{item.price}/Unit</Text>
                                        <Text style={[styles.text,]}>{item.quantity}</Text>
                                        <Text style={[styles.text,]}>{item.price * item.quantity}</Text>
                                    </View>
                                    <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                </View>
                            )
                        })}

                        {this.state.items.filter(e => e.category === 'Seesha').map(item => {
                            return (
                                <View key={item.title}>
                                    <View style={styles.list} >
                                        <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                        <Text style={styles.text}>{item.price}/Unit</Text>
                                        <Text style={styles.text}>{item.quantity}</Text>
                                        <Text style={styles.text}>{item.price * item.quantity}</Text>
                                    </View>
                                    <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                </View>
                            )
                        })}
                        {this.state.items.filter(e => e.category === 'liquors').map(item => {
                            return (
                                <View key={item.title}>
                                    <View style={styles.list} >
                                        <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                        <Text style={styles.text}>{item.price}/Unit</Text>
                                        <Text style={styles.text}>{item.quantity}</Text>
                                        <Text style={styles.text}>{item.price * item.quantity}</Text>
                                    </View>
                                    <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                </View>
                            )
                        })}
                        {this.state.items.filter(e => e.category === 'Whiskey12').map(item => {
                            return (
                                <View key={item.title}>
                                    <View style={styles.list} >
                                        <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                        <Text style={styles.text}>{item.price}/Unit</Text>
                                        <Text style={styles.text}>{item.quantity}</Text>
                                        <Text style={styles.text}>{item.price * item.quantity}</Text>
                                    </View>
                                    <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                </View>
                            )
                        })}
                        {this.state.items.filter(e => e.category === 'Whiskey15').map(item => {
                            return (
                                <View key={item.title}>
                                    <View style={styles.list} >
                                        <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                        <Text style={styles.text}>{item.price}/Unit</Text>
                                        <Text style={styles.text}>{item.quantity}</Text>
                                        <Text style={styles.text}>{item.price * item.quantity}</Text>
                                    </View>
                                    <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                </View>
                            )
                        })}
                        {this.state.items.filter(e => e.category === 'Whiskey18').map(item => {
                            return (
                                <View key={item.title}>
                                    <View style={styles.list} >
                                        <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                        <Text style={styles.text}>{item.price}/Unit</Text>
                                        <Text style={styles.text}>{item.quantity}</Text>
                                        <Text style={styles.text}>{item.price * item.quantity}</Text>
                                    </View>
                                    <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                </View>
                            )
                        })}
                        {this.state.items.filter(e => e.category === 'Champagne').map(item => {
                            return (
                                <View key={item.title}>
                                    <View style={styles.list} >
                                        <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                        <Text style={styles.text}>{item.price}/Unit</Text>
                                        <Text style={styles.text}>{item.quantity}</Text>
                                        <Text style={styles.text}>{item.price * item.quantity}</Text>
                                    </View>
                                    <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                </View>
                            )
                        })}

                        {this.state.items.map(item => {
                            return (
                                <View>
                                    {item.hotess && <View key={item.id}>
                                        <View style={[styles.list]} >
                                            {item.hotess ? <Text style={[styles.text, { flexGrow: 1.5 }]}>Service Time</Text> : null}
                                            {item.hotess ? <Text style={styles.text}>{item.currentRate}/hr</Text> : null}
                                            {item.hotess ? <Text style={styles.text}>{item.service}</Text> : null}
                                            {item.hotess ? <Text style={styles.text}>{item.price}</Text> : null}
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                        {item.hotess && <><View style={styles.list}>
                                            <Text style={[styles.text, { flex: 0.9 }]}>Hostess</Text>
                                            <Text style={[styles.text, { flex: 2.1 }]}>{item.hotess}</Text>
                                        </View>
                                            <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                        </>
                                        }
                                        {item.wineGlass > 0 && <><View style={styles.list}>
                                            <Text style={[styles.text, { flex: 0.9 }]}>Wine glass</Text>
                                            <Text style={[styles.text, { flex: 2.1 }]}>{item.wineGlass}</Text>
                                        </View>
                                            <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                        </>
                                        }

                                        {item.whiskeyGlass > 0 && <><View style={styles.list}>
                                            <Text style={[styles.text, { flex: 1.2 }]}>Whiskey glass</Text>
                                            <Text style={[styles.text, { flex: 2.8 }]}>{item.whiskeyGlass}</Text>
                                        </View>
                                            <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                        </>
                                        }

                                        {item.champagneGlass > 0 && <><View style={styles.list}>
                                            <Text style={[styles.text, { flex: 1.3 }]}>Champagne glass</Text>
                                            <Text style={[styles.text, { flex: 3.0 }]}>{item.champagneGlass}</Text>
                                        </View>
                                            <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                        </>
                                        }

                                        {/* {item.service&&<View style={styles.list}>
                                       <Text style={styles.text}>Service</Text> 
                                       <Text style={styles.text}>{item.service}</Text>
                                    </View>} */}
                                        {/* <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View> */}



                                    </View>}
                                </View>
                            )
                        })}
                    </View>}
                {this.state.items.length ? <View style={[styles.footer]}>
                    <Text style={[styles.text, { fontSize: 18, padding: 5 }]}>Balance</Text>
                    <Text style={[styles.text, { fontSize: 18, padding: 5 }]}>FCFA {this.props.total}
                    </Text>
                </View> : null}
            </ScrollView>

        )
    }
}


export default OrderSummary
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        marginBottom: 5
    },
    logo: {
        height: 80,
        width: 90,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 14,
        padding: 10,
        textAlign: 'center',
        flex: 1,
        flexWrap: 'wrap',
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
        alignSelf: 'center'
    },
    icon: {
        fontSize: 25,
        // color: TextColorWhite
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 100,
        // marginHorizontal: '35%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 8,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS'
    },
    modal: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: PrimayColor,
        marginHorizontal: 5
    },
    textHeading: {
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
        margin: 20,
        backgroundColor: '#fd6d24',
        color: '#fff',
        fontWeight: 'bold'
    }
})