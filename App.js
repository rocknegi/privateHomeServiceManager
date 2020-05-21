import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from 'react-navigation-drawer';
Icon.loadFont()
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('Boys');
usersCollection.onSnapshot((snapshot) => {
  const data = [];
  snapshot.forEach(doc => {
      data.push(({ ...doc.data(), id: doc.id }))
  })
  alert(JSON.stringify(data,undefined,3))
});
const Login = ({navigation})=>{
  return(
    <SafeAreaView>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const Dashboard = ({navigation})=>{
  return(
    <SafeAreaView>
      <Text>Dashboard</Text>
      <Icon name="rocket" size={30} color="#900" onPress={()=>navigation.openDrawer()}/>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const DrawerNavigation = createDrawerNavigator({
  Dashboard
})

const AppNavigator = createSwitchNavigator({
  Login,
  Dashboard : DrawerNavigation
})

const AppContainer = createAppContainer(AppNavigator)

export default App = ()=>{
  return(
    <AppContainer />
  )
}
