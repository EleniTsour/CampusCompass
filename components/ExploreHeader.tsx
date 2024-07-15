import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native';
import { useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { Image } from 'react-native';
import localImages from '@/constants/LocalImages';


const categories = [
    {
        name: 'All Campuses',
        icon: 'domain',
    },
    {
        name: 'Ancient Olive Grove Campus',
        icon: 'home',
    },
    {
        name: 'Egaleo Park Campus',
        icon: 'house-siding',
    },
    {
        name: 'Athens Campus',
        icon: 'location-city',
    },
];

interface Props {
    onCategoryChanged: (category: string) => void
}

const ExplorerHeader = ({onCategoryChanged} : Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x, y, width, height, pageX) => {
        scrollRef.current?.scrollTo({x: pageX -16, y: 0, animated: true});
    })

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>   
        <View style={styles.container}>
            <View style={styles.actionRow}>
            <Image source={localImages.compass} style={{ width: 50, height: 50 }} />
            <Text style={{fontFamily: 'mon-b', fontSize: 16}}>Campus Compass</Text>
            </View>
           
            <ScrollView 
            ref={scrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                alignItems: 'center',
                gap: 30,
                paddingHorizontal: 16,
            }}
            >
                {categories.map((item, index) => (
                    <TouchableOpacity key={index} 
                    ref={(el) => itemsRef.current[index] = el}
                    style={activeIndex === index ? styles.categoriesButtonActive : styles.categoriesButton}
                    onPress={() => selectCategory(index)}
                    >
                        <MaterialIcons size={24} name={item.icon as any} color={activeIndex === index ? '#000' : Colors.grey}/>
                        <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        
        </View>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 130,
        marginTop: 10,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 10,
    },
    filterButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: '#c2c2c2',
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 14,
        borderRadius: 30,
        backgroundColor: '#fff',
        
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    categoryText: {
        fontSize: 12,
        fontFamily: 'mon-sb',
        color: Colors.grey
    },
    categoryTextActive: {
        fontSize: 12,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    categoriesButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    categoriesButtonActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 4,
        paddingBottom: 8,
    }
})
export default ExplorerHeader;