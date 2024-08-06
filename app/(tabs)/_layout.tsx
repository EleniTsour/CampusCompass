import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'



const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb'
      }
    }}>
      <Tabs.Screen name='index' options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color, size}) => 
            <Ionicons name='search' color={color} size={size}/>
        }}/>
        <Tabs.Screen name='wishlist' options={{
          tabBarLabel: 'Favourites',
          title: '',
          tabBarIcon: ({color, size}) => 
            <Ionicons name='heart-outline' color={color} size={size}/>
        }}/>
        <Tabs.Screen name='chatbot' options={{
          tabBarLabel: 'Chatbot',
          title: '',
          tabBarIcon: ({color, size}) => 
            <MaterialCommunityIcons name='robot' color={color} size={size}/>
        }}/>
         <Tabs.Screen name='Profile' options={{
          tabBarLabel: 'Profile',
          title: '',
          tabBarIcon: ({color, size}) => 
            <MaterialCommunityIcons name='login' color={color} size={size}/>
        }}/>
    </Tabs>
  )
}

export default Layout