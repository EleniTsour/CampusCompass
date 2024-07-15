import React from 'react';
import localImages from '@/constants/LocalImages';
import { Image, Text, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';



const LogoHeader = () => {
  return (
    <SafeAreaView style={styles.actionRow}>
        <Image source={localImages.compass} style={{ width: 50, height: 50 }} />
        <Text style={{fontFamily: 'mon-b', fontSize: 16}}>Campus Compass</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 10,
        backgroundColor: '#fff',
        height: 130,
        marginTop: 10,
    },
})

export default LogoHeader;
