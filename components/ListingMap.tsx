import React, { memo, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { ListingGeo } from '@/interfaces/listinggeo';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';
import Colors from '@/constants/Colors';

interface Props {
    listings: any;
    category: string;
}

const INITIAL_REGION = {
    latitude: 37.991461,
    longitude: 23.711219,
    latitudeDelta: 0.12,
    longitudeDelta: 0.12
};

const ListingMap = memo(({ listings, category }: Props) => {

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
        })();
    }, []);

    const router = useRouter();

    const filteredListings = category === 'All Campuses'
        ? listings.features
        : listings.features.filter((item: ListingGeo) => item.campus === category);

    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`);
        //console.log(item);
    };

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    latitude: geometry.coordinates[1],
                    longitude: geometry.coordinates[0],
                }}
            >
                <View style={styles.clusterMarker}>
                    <Text style={styles.clusterText}>{points}</Text>
                </View>
            </Marker>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    renderCluster={renderCluster}
                    animationEnabled={false}
                    style={StyleSheet.absoluteFillObject}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    initialRegion={INITIAL_REGION}
                    clusterColor='#fff'
                    clusterTextColor='#000'
                    clusterFontFamily='mon-sb'
                >
                    {filteredListings.map((item: ListingGeo) => (
                        <Marker
                            onPress={() => onMarkerSelected(item)}
                            key={item.properties.id}
                            coordinate={{
                                latitude: +item.properties.latitude,
                                longitude: +item.properties.longitude
                            }}>
                            <View style={styles.marker}>
                                <Text style={styles.markerText}>{item.properties.point}</Text>
                            </View>
                        </Marker>
                    ))}
                </MapView>
            </View>
            <View style={styles.bottomView} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
    },
    marker: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        }
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
    clusterMarker: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clusterText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    bottomView: {
        height: 60, // Adjust the height as needed
        backgroundColor: '#fff',
    },
});

export default ListingMap;
