import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { styles } from './theme/theme'

const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Email"
                                value={username}
                                textContentType='emailAddress'
                                autoCapitalize="none"
                                style={styles.input}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <TextInput
                                placeholder="Password"
                                value={password}
                                secureTextEntry={true}
                                style={styles.input}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </View>
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('Dashboard')}
                        style={styles.button}>
                            <Text style={styles.buttonText}>
                                Login
                </Text>
                        </TouchableOpacity>
                    </View>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Login
