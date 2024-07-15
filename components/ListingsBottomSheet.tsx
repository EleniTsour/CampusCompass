import { View, Text } from 'react-native'
import React, { useState } from 'react';
import { listing } from '@/interfaces/listing';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import Listing from '@/components/Listings'
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    listings: listing[];
    category: string;
}

const ListingsBottomSheet = ({ listings, category } : Props) => {
    const bottomSheet = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], []);

    const [refresh, setRefresh] = useState(0);

    const showMap = () => {
        bottomSheet.current?.collapse();
        setRefresh(refresh + 1);
    }
  return (
    <BottomSheet 
    ref={bottomSheet} 
    snapPoints={snapPoints}
    enableContentPanningGesture={false}
    handleIndicatorStyle={{backgroundColor: Colors.grey}}
    enablePanDownToClose={false}
    index={1}
    style={styles.sheetContainer}
    >
        <View style={{flex:1}}>
            <Listing listings={listings} category={category} refresh={refresh} isWhishlist={false}/>
            <View style={styles.absoluteBtn}>
                <TouchableOpacity onPress={showMap} style={styles.btn}>
                    <Text style={{fontFamily: 'mon-sb', color: '#fff'}}>Map</Text>
                    <Ionicons name='map' size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        gap: 8,
    },
    sheetContainer: {
        paddingTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        }
    }
})

export default ListingsBottomSheet