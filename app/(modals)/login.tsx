import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { userWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { StyleSheet } from 'react-native'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Page = () => {
  userWarmUpBrowser();
  
  return (
    <View style={styles.container}>
      <TextInput autoCapitalize='none' placeholder='Email'style={[defaultStyles.inputField, {marginBottom: 30}]}/>
      <TouchableOpacity style={defaultStyles.btn}>
       <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View style={{
          flex: 1,
          borderBottomColor: '#000',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}/>
  
        <View style={{
          flex: 1,
          borderBottomColor: '#000',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}/>
      </View>

      <View style={{gap: 20}}>
       
        <TouchableOpacity style={styles.btnOutline} >
          <Ionicons name='logo-google' size={24} style={defaultStyles.btnIcon}/>
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

    
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
})

export default Page;