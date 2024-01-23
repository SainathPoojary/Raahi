import {View} from 'react-native';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker, Polyline} from 'react-native-maps';

export default function Preview() {
  const [coordinates, setCoordinates] = useState([]);
  const route = useRoute();
  const post = route.params.post;

  useEffect(() => {
    const _coordinates = [];

    post.steps.forEach(step => {
      _coordinates.push({
        latitude: step.source.lat,
        longitude: step.source.long,
      });
    });

    _coordinates.push({
      latitude: post.steps[post.steps.length - 1].destination.lat,
      longitude: post.steps[post.steps.length - 1].destination.long,
    });

    setCoordinates(_coordinates);
  }, []);

  return (
    <View>
      {coordinates.length !== 0 && (
        <MapView
          style={{height: '100%', width: '100%'}}
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Polyline
            coordinates={coordinates}
            strokeColor="#000"
            strokeWidth={6}
          />

          <Marker
            coordinate={coordinates[0]}
            title={post.steps[0].source.title}
            pinColor="#09983e"
          />
          <Marker
            coordinate={coordinates[coordinates.length - 1]}
            title={post.steps[post.steps.length - 1].destination.title}
          />
        </MapView>
      )}
    </View>
  );
}
