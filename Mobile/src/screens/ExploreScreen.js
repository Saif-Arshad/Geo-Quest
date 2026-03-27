import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#737373' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#262626' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#262626' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1a1a1a' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0a0a0a' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#171717' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#171717' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a1a' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a1a' }],
  },
];

const QUEST_MARKERS = [
  {
    id: '1',
    title: 'Ancient Oak Cache',
    coordinate: { latitude: 37.7849, longitude: -122.4094 },
    type: 'active',
  },
  {
    id: '2',
    title: 'Hidden Bridge Quest',
    coordinate: { latitude: 37.7870, longitude: -122.4074 },
    type: 'normal',
  },
  {
    id: '3',
    title: 'Sunset Point',
    coordinate: { latitude: 37.7830, longitude: -122.4114 },
    type: 'normal',
  },
];

// Street-level zoom (small deltas = zoomed in)
const STREET_LEVEL_DELTA = 0.003;

const FALLBACK_REGION = {
  latitude: 37.7849,
  longitude: -122.4094,
  latitudeDelta: STREET_LEVEL_DELTA,
  longitudeDelta: STREET_LEVEL_DELTA,
};

export default function ExploreScreen({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const mapRef = useRef(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setRegion(FALLBACK_REGION);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const userCoord = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setUserLocation(userCoord);
      setRegion({
        ...userCoord,
        latitudeDelta: STREET_LEVEL_DELTA,
        longitudeDelta: STREET_LEVEL_DELTA,
      });
    })();
  }, []);

  const handleZoomIn = () => {
    mapRef.current?.getCamera().then((camera) => {
      camera.zoom = (camera.zoom || 17) + 1;
      mapRef.current?.animateCamera(camera, { duration: 300 });
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.getCamera().then((camera) => {
      camera.zoom = (camera.zoom || 17) - 1;
      mapRef.current?.animateCamera(camera, { duration: 300 });
    });
  };

  const handleMyLocation = () => {
    if (userLocation) {
      mapRef.current?.animateToRegion({
        ...userLocation,
        latitudeDelta: STREET_LEVEL_DELTA,
        longitudeDelta: STREET_LEVEL_DELTA,
      }, 500);
    }
  };

  const handleShowCaches = () => {
    if (QUEST_MARKERS.length > 0) {
      const lats = QUEST_MARKERS.map((m) => m.coordinate.latitude);
      const lngs = QUEST_MARKERS.map((m) => m.coordinate.longitude);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      const padding = 0.01;
      mapRef.current?.animateToRegion({
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: (maxLat - minLat) + padding,
        longitudeDelta: (maxLng - minLng) + padding,
      }, 500);
    }
  };

  if (!region) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#C9A84C" />
        <Text style={{ color: '#9CA3AF', marginTop: 12 }}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Map */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        customMapStyle={DARK_MAP_STYLE}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
      >
        {QUEST_MARKERS.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            onCalloutPress={() => navigation.navigate('CacheDetails', { cache: { title: marker.title, id: marker.id } })}
          >
            <View style={styles.markerContainer}>
              {marker.type === 'active' ? (
                <View style={styles.activeMarker}>
                  <Ionicons name="star" size={18} color="#000000" />
                </View>
              ) : (
                <View style={styles.normalMarker}>
                  <View style={styles.normalMarkerInner} />
                </View>
              )}
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Navigation Control (Left side) */}
      <View style={styles.leftControls}>
        <TouchableOpacity style={styles.controlBtn} onPress={handleMyLocation}>
          <Ionicons name="navigate" size={20} color="#C9A84C" />
        </TouchableOpacity>
      </View>

      {/* Map Controls (Right side) */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlBtn} onPress={handleZoomIn}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={handleZoomOut}>
          <Feather name="minus" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        <TouchableOpacity style={styles.controlBtn} onPress={handleMyLocation}>
          <Ionicons name="locate-outline" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        <TouchableOpacity style={[styles.controlBtn, styles.starBtn]} onPress={handleShowCaches}>
          <Ionicons name="star" size={20} color="#C9A84C" />
        </TouchableOpacity>
      </View>

      {/* Active Quest Card */}
      <View style={[styles.questCard, { bottom: 90 + insets.bottom }]}>
        <Image
          source={require('../../assets/one.jpg')}
          style={styles.questImage}
        />
        <View style={styles.questInfo}>
          <View style={styles.questBadge}>
            <Text style={styles.questBadgeText}>ACTIVE QUEST</Text>
          </View>
          <Text style={styles.questTitle}>Ancient Oak Cache</Text>
          <View style={styles.questMeta}>
            <Ionicons name="navigate" size={12} color="#9CA3AF" />
            <Text style={styles.questDistance}>150m away</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('CacheDetails')}>
          <Text style={styles.startBtnText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // Left Controls
  leftControls: {
    position: 'absolute',
    left: 16,
    top: '35%',
    zIndex: 10,
  },
  // Map Controls
  mapControls: {
    position: 'absolute',
    right: 16,
    top: '35%',
    gap: 4,
    zIndex: 10,
  },
  controlBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  starBtn: {
    backgroundColor: 'rgba(38, 38, 38, 0.9)',
  },
  // Markers
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#C9A84C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(201, 168, 76, 0.3)',
  },
  normalMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(38, 38, 38, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#404040',
  },
  normalMarkerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  // Quest Card
  questCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    zIndex: 10,
  },
  questImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  questInfo: {
    flex: 1,
    marginLeft: 12,
  },
  questBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(38, 38, 38, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  questBadgeText: {
    color: '#C9A84C',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  questTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  questMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questDistance: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  startBtn: {
    backgroundColor: '#262626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
