import React from 'react';
import {Redirect, Slot, Stack, Tabs} from "expo-router";
import {View} from "react-native";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {useTheme} from "@react-navigation/native";
import {useAuth} from "@clerk/clerk-expo";

const LayoutHome = () => {
  const {colors} = useTheme()
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href={'/(public)/login'} />
  }
  // console.log('LayoutHome session', session)
  // console.log('LayoutHome isLoading', isLoading)
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  // if (!session) {
  //   // On web, static rendering will stop here as the user is not authenticated
  //   // in the headless Node process that the pages are rendered in.
  //   return <Redirect href="/login" />;
  // }
  return (
    <Tabs screenOptions={{tabBarStyle: {
        height: 60,                // Height of the tab bar
        paddingBottom: 8,          // Padding at the bottom of the tab bar
      },}}>
      <Tabs.Screen
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color, focused}) => <TabBarIcon typeIcon={'ion'} name={focused ? 'home' : 'home-outline'} color={color} />}}
        name='index'
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          title: 'Transaction',
          tabBarIcon: ({color, focused}) => <TabBarIcon typeIcon={'ion'} name={'swap-horizontal'} color={color} />}}
        name='transaction'
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <View style={{backgroundColor: colors.background, borderRadius: 100, padding: 4, position: 'absolute', top: -20}}>
              <TabBarIcon style={{marginBottom: 0}} size={60} typeIcon={'ion'} name={'add-circle'} color={'#fdc500'} />
            </View>
          )}}
        name='transaction-create'
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          title: 'Budget',
          tabBarIcon: ({color, focused}) => <TabBarIcon typeIcon={'material'} name={focused ? 'money' : 'money'} color={color} />}}
        name='budget'
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          title: 'Person',
          tabBarIcon: ({color, focused}) => <TabBarIcon typeIcon={'ion'} name={'person-circle-outline'} color={color} />}}
        name='personal'
      />
    </Tabs>
  )
};

export default LayoutHome;