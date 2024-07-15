import React, { useMemo, useState } from 'react';
import { Stack } from 'expo-router';
import ExplorerHeader from '@/components/ExploreHeader';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingMap from '@/components/ListingMap';
import listingDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Page = () => {
  const [category, setCategory] = useState('All Campuses');
  const items = useMemo(() => listingsData as any, []);
  const geoItems = useMemo(() => listingDataGeo as any, []);

console.log("geoItems",geoItems);

  const onDataChanged = (category: string) => {
    setCategory(category);
    console.log("Category Change", category);
  }


  return (
    <GestureHandlerRootView  style={{ flex: 1 }}>
      <Stack.Screen options={{
        header: () => <ExplorerHeader onCategoryChanged={onDataChanged}/>
      }}
      />
      <ListingMap listings={geoItems} category={category}/>
      <ListingsBottomSheet listings={items} category={category} />
    </GestureHandlerRootView>
    
  )
}

export default Page