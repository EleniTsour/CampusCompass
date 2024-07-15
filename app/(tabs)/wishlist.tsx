import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Listing from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import { useMemo } from 'react';
import { listing } from '@/interfaces/listing';
import { Stack } from 'expo-router';
import LogoHeader from '@/components/LogoHeader';

interface Props {
  listings: listing[];
  category: string;
}

const FavoritesPage = ({ category }: Props) => {
  const items = useMemo(() => listingsData as any, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FDFFFF' }}>
      <Stack.Screen options={{
        header: () => <LogoHeader/>
      }}
      />
      <Listing listings={items} category={category} refresh={0} isWhishlist={true} />
    </GestureHandlerRootView>
  );
};

export default FavoritesPage;
