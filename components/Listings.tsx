import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ListRenderItem } from 'react-native';
import { Link } from 'expo-router';
import { listing } from '@/interfaces/listing';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import localImages from '@/constants/LocalImages';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from './FavoritesProvider';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
  listings: any[];
  category: string;
  refresh: number;
  isWhishlist: boolean;
}

const Listing = ({ listings: items, category, refresh, isWhishlist }: Props) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    console.log('reload listings', items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const getImageSource = (imagePath: string) => {
    return localImages[imagePath] || { uri: imagePath };
  };

  const filteredItems = isWhishlist
    ? favorites.length > 0
      ? items.filter((item) => favorites.includes(item.id))
      : []
    : category === 'All Campuses'
    ? items
    : items.filter((item) => item.campus === category);

  const renderRow: ListRenderItem<listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          <Image source={getImageSource(item.xl_picture_url)} style={styles.image} />
          <TouchableOpacity
            style={{ position: 'absolute', right: 30, top: 30 }}
            onPress={() => toggleFavorite(item.id)}
          >
            <Ionicons
              name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
              size={30}
              color={favorites.includes(item.id) ? 'red' : 'white'}
            />
          </TouchableOpacity>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
            <Text style={{ fontFamily: 'mon' }}>{item.campus}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return isWhishlist ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDFFFF', paddingBottom: 40 }}>
      <FlatList
        renderItem={renderRow}
        data={loading ? [] : filteredItems}
        ListHeaderComponent={<Text style={styles.info}>{filteredItems.length} departments</Text>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  ) : (
    <View style={{ flex: 1, backgroundColor: '#FDFFFF', paddingBottom: 40 }}>
      <BottomSheetFlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : filteredItems}
        ListHeaderComponent={<Text style={styles.info}>{filteredItems.length} departments</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 14,
    marginTop: 4,
  },
});

export default Listing;
