import { View, Text, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from '@gorhom/bottom-sheet';


const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('USER', response);
        }
        catch (error : any) {
            console.log(error);
            alert('Sign in failed ' + error.message);
        }
        finally {
            setLoading(false);
            router.back();
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!')
        }
        catch (error : any) {
            console.log(error);
            alert('Sign in failed ' + error.message);
        }
        finally {
            setLoading(false);
            router.back();
        }
    }
 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Text style={styles.headerText}>Login or Sign up</Text>
    <View style={styles.container}>
        <KeyboardAvoidingView  behavior='padding'>
            <TextInput 
            value={email}
            style={styles.input}
            placeholder='Email'
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
            >
            </TextInput>

            <TextInput 
            value={password}
            style={styles.input}
            placeholder='Password'
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}
            secureTextEntry = {true}
            >
            </TextInput>
       
   
    { loading ? ( 
        <ActivityIndicator size="large" color="#0000ff" />
    ) : (
        <>
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={signUp} >
                <Text style={styles.buttonText}>Create account</Text>
            </TouchableOpacity> 

        </>
    )}
     </KeyboardAvoidingView>
     </View>

    </GestureHandlerRootView>
  );
};

export default Profile;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        color: Colors.primary
    },
    button: {
        backgroundColor: 'none',
        margin: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: Colors.primary,
    },
    headerText: {
        fontFamily: 'mon-b',
        fontSize: 25,
        alignItems: 'center',
        color: Colors.primary,
        marginVertical: 40
    }
});