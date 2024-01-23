import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './home';
import AddTripS1 from './AddTrip';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {autoComplete, geoCoding} from '../utils/util';
import Suggestion from '../components/Suggestion';
import AutoCompleteInput from '../components/AutoCompleteInput';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {reverseGeoCoding} from '../utils/util';

export default function AddStep({
  stepDestData,
  srcData,
  destData,
  src,
  dest,
  setShowAddStep,
  setSteps,
  steps,
}) {
  const [estimatedTime, setEstimatedTime] = useState('');
  const [comments, setComments] = useState('');
  const [markerText, setMarkerText] = useState('');
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [transportMode, setTransportMode] = useState('');
  const [manual, setManual] = useState(false);

  const isEmptyObject = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const handleSave = () => {
    if (!source || !estimatedTime || !transportMode) {
      ToastAndroid.show('All fields are required!', ToastAndroid.SHORT);
      return;
    }

    let temp = [...steps];
    console.log(destination);
    temp.push({
      source: isEmptyObject(stepDestData) ? srcData : stepDestData,
      destination: isEmptyObject(destination) ? destData : destination,
      estimatedTime: parseInt(estimatedTime),
      transportationMode: transportMode,
      message: comments,
      isPolyline: manual,
      polyline: [],
    });
    setSteps(temp);
    setShowAddStep(false);
  };

  const [markers, setMarkers] = useState([]);

  const handleMapPress = async event => {
    console.log(markers.length);
    if (markers.length == 0) {
      const {coordinate} = event.nativeEvent;
      const newMarkers = [
        ...markers,
        {coordinate, title: `Marker ${markers.length + 1}`},
      ];
      const data = await reverseGeoCoding(
        coordinate.latitude,
        coordinate.longitude,
      );
      console.log(data);
      let temp = {
        title: data.title,
        subtitle: data.subtitle,
        placeId: data.placeId,
        lat: data.latitude,
        long: data.longitude,
      };
      setMarkerText(data.title + data.subtitle);
      setDestination(temp);
      setTempLat(data.latitude);
      setTempLong(data.longitude);
      setMarkers(newMarkers);
      setManual(true);
    }
  };

  return (
    <View className="">
      <TouchableOpacity
        className="h-10 w-10 absolute left-2 top-3 flex justify-center items-center"
        onPress={() => setShowAddStep(false)}>
        <Icon name={'close'} size={30} color={'black'} />
      </TouchableOpacity>
      <View className="h-[180]">
        <View
          style={{
            borderRadius: 15,
            overflow: 'hidden',
            width: '90%',
            marginLeft: '5%',
            height: '75%',
            marginTop: '15%',
          }}>
          <MapView
            className=""
            style={{flex: 1}}
            initialRegion={{
              latitude: isEmptyObject(stepDestData)
                ? srcData.lat
                : stepDestData.lat,
              longitude: isEmptyObject(stepDestData)
                ? srcData.long
                : stepDestData.long,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }}
            onPress={handleMapPress}>
            <Marker
              coordinate={{latitude: srcData.lat, longitude: srcData.long}}
              title="Marker Title"
              description="Marker Description"
              pinColor="#013220"
            />
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                description={`Marker ${index + 1}`}
                pinColor="red"
              />
            ))}

            {steps.map((step, index) => (
              <Polyline
                key={index}
                coordinates={[
                  {
                    latitude: step.source.lat,
                    longitude: step.source.long,
                  },
                  {
                    latitude: step.destination.lat,
                    longitude: step.destination.long,
                  },
                ]}
                strokeColor="blue"
                strokeWidth={6}
              />
            ))}
            {srcData && (destination.lat || destination.latitude) && (
              <Polyline
                coordinates={[
                  {
                    latitude: isEmptyObject(stepDestData)
                      ? srcData.lat
                      : stepDestData.lat,
                    longitude: isEmptyObject(stepDestData)
                      ? srcData.long
                      : stepDestData.long,
                  },
                  {
                    latitude: destination.lat
                      ? destination.lat
                      : destination.latitude,
                    longitude: destination.long
                      ? destination.long
                      : destination.longitude,
                  },
                ]}
                strokeColor="blue"
                strokeWidth={6}
              />
            )}
          </MapView>
        </View>
      </View>
      <View className="h-2/3 flex items-center">
        <View className="h-15 w-[90%]">
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginLeft: '1%',
              color: 'black',
            }}>
            Start Location
          </Text>

          <TextInput
            className="rounded-xl pl-5 text-black bg-white focus:border-2"
            placeholderTextColor={'gray'}
            style={{fontFamily: 'Poppins-Medium'}}
            editable={false}
            value={src}
            placeholder="Enter number in hours"
          />
        </View>
        <View className="h-15 w-[90%] mt-5">
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginLeft: '1%',
              color: 'black',
            }}>
            End Location (Leave empty if final destination)
          </Text>
          <AutoCompleteInput markerText={markerText} setData={setDestination} />
        </View>
        <View className="h-15 w-[90%] mt-5">
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginLeft: '1%',
              color: 'black',
            }}>
            Estimated Time (in hours)
          </Text>
          <TextInput
            keyboardType="numeric"
            className="rounded-xl pl-5 text-black bg-white border-2 border-white focus:border-blue-700"
            value={estimatedTime}
            onChangeText={setEstimatedTime}
            placeholderTextColor={'gray'}
            style={{fontFamily: 'Poppins-Medium'}}
            placeholder="Enter number in hours"
          />
        </View>
        <View className="h-15 w-[90%] mt-5">
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginLeft: '1%',
              color: 'black',
            }}>
            Transportation Mode
          </Text>
          <TextInput
            className="rounded-xl pl-5 text-black bg-white border-2 border-white focus:border-blue-700"
            placeholderTextColor={'gray'}
            style={{fontFamily: 'Poppins-Medium'}}
            onChangeText={setTransportMode}
            value={transportMode}
            placeholder="Enter Preffered Transportation"
          />
        </View>
        <View className="h-15 w-[90%] mt-5">
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginLeft: '1%',
              color: 'black',
            }}>
            Comments
          </Text>
          <TextInput
            className="rounded-xl pl-5 text-black bg-white border-2 border-white focus:border-blue-700"
            placeholderTextColor={'gray'}
            style={{fontFamily: 'Poppins-Medium'}}
            onChangeText={setComments}
            value={comments}
            placeholder="Enter Your Comment"
          />
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            width: '90%',
            backgroundColor: 'blue',
            marginTop: '5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
          }}
          onPress={handleSave}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
