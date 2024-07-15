import { View, Text, Dimensions, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import listingsData from '@/assets/data/airbnb-listings.json';
import Animated, { 
       useAnimatedRef, 
       useScrollViewOffset,
       SlideInDown, 
       useAnimatedStyle,
       interpolate} 
from 'react-native-reanimated';
import { listing } from '@/interfaces/listing';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { Share } from 'react-native';
import { Linking } from 'react-native';
import localImages from '@/constants/LocalImages';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');


const Page = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const listing: listing = (listingsData as any[]).find((item) => item.id === id);

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffet = useScrollViewOffset(scrollRef);

    const navigation = useNavigation();

    const shareListing = async() => {
      try{
        await Share.share({
          title: listing.name,
          message: `Check out this department: ${listing.url}`,
        });
      } catch (err) {
        console.log(err);
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: '',
        headerTransparent: true,
        
        headerBackground: () => (
          <Animated.View style={[styles.header, headerAnimatedStyle]}/>

         
        ),
        headerRight: () => (
          <View style={styles.bar}>
            <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
              <Ionicons name='share-outline' size={22} color={'#000'}/>
            </TouchableOpacity>
          </View>
          
        ),
        headerLeft: () => (
          <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back' size={24} color={'#000'}/>
          </TouchableOpacity>
        ),
      });
    }, []);

    const headerAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollOffet.value, [0, IMG_HEIGHT / 1.5], [0, 1]),

      }
    })

    const imageAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollOffet.value,
              [-IMG_HEIGHT, 0, IMG_HEIGHT],
              [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
            ),
          },
          {
            scale: interpolate(scrollOffet.value,
              [-IMG_HEIGHT, 0, IMG_HEIGHT],
              [2, 1, 1]
            )
          } 
        ]
      }
    })

    const getImageSource = (imagePath: string) => {
      return localImages[imagePath] || { uri: imagePath };
    };
   
  return (
    <View style={styles.container}>
      <Animated.ScrollView
      ref={scrollRef}
      contentContainerStyle ={{paddingBottom: 100}}
      scrollEventThrottle={16}
      >
        <Animated.Image source={getImageSource(listing.medium_url)} style={[styles.image, imageAnimatedStyle]} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
          Secretariat Phone Number
          </Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${listing.number}`)}>
              <Text style={styles.rooms}>
              {listing.number}
              </Text>
            </TouchableOpacity>
          
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <MaterialCommunityIcons name={'office-building'} size={24}/>

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Department's Location</Text>
              <Text>{listing.campus}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
          </View>
      </Animated.ScrollView>
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={styles.footerText} onPress={() => {Linking.openURL(`mailto:${listing.email}`);}}>
            <Ionicons name={'mail-outline'} size={20}/>
            <Text style={styles.footerPrice}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]} onPress={() => {Linking.openURL(listing.url)}}>
            <Text style={defaultStyles.btnText}>Website</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
});
export default Page