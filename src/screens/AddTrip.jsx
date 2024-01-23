import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AutoCompleteInput from '../components/AutoCompleteInput';
import MapView, {Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import animations from '../res/js/animations';

export default function AddTrip() {
  const navigation = useNavigation();
  const [cheap, setCheap] = useState(false);
  const [fast, setFast] = useState(false);
  const [comfort, setComfort] = useState(false);
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleCheap = () => {
    setCheap(!cheap);
  };
  const handleFast = () => {
    setFast(!fast);
  };
  const handleComfort = () => {
    setComfort(!comfort);
  };

  const handleAddTrip = () => {
    if (!source || !destination || !estimatedTime) {
      ToastAndroid.show('All fields are required!', ToastAndroid.SHORT);
      return;
    }
    navigation.navigate('steps', {
      src: source.title + source.subtitle,
      dest: destination.title + destination.subtitle,
      srcData: source,
      destData: destination,
      estimatedTime: estimatedTime,
      isAffordable: cheap,
      isTimeSaving: fast,
      isComfortable: comfort,
    });
  };

  return (
    <View className="">
      <View className="h-[190] items-center">
        <LottieView
          source={animations.map}
          autoPlay
          loop
          style={{
            width: '90%',
            height: 'auto',
            // backgroundColor: 'green',
            aspectRatio: 2 / 1,
          }}
        />
      </View>
      <View className="h-2/3 flex items-center">
        <View className="h-15 w-[90%]">
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginLeft: '1%',
              color: 'black',
            }}>
            Start Destination
          </Text>
          <AutoCompleteInput setData={setSource} />
        </View>
        <View className="h-15 w-[90%] mt-5">
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginLeft: '1%',
              color: 'black',
            }}>
            End Destination
          </Text>
          <AutoCompleteInput setData={setDestination} />
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
            onChangeText={setEstimatedTime}
            className="rounded-xl pl-5 text-black bg-white"
            placeholderTextColor={'gray'}
            style={{fontFamily: 'Poppins-Medium'}}
            placeholder="Enter number in hours"
          />
        </View>
        <View className="h-15 w-[90%] mt-5 flex flex-row items-center">
          <CheckBox
            value={cheap}
            onChange={handleCheap}
            tintColors={{true: 'blue', false: 'black'}}
          />
          <Text
            className="text-black text-lg"
            style={{fontFamily: 'Poppins-Medium'}}>
            Is this trip affordable?
          </Text>
        </View>
        <View className="h-15 w-[90%] mt-3 flex flex-row items-center">
          <CheckBox
            value={fast}
            onChange={handleFast}
            tintColors={{true: 'blue', false: 'black'}}
          />
          <Text
            className="text-black text-lg"
            style={{fontFamily: 'Poppins-Medium'}}>
            Is this trip time saving?
          </Text>
        </View>
        <View className="h-15 w-[90%] mt-3 flex flex-row items-center">
          <CheckBox
            value={comfort}
            onChange={handleComfort}
            tintColors={{true: 'blue', false: 'black'}}
          />
          <Text
            className="text-black text-lg"
            style={{fontFamily: 'Poppins-Medium'}}>
            Is this trip comfortable?
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleAddTrip}
          style={{
            height: 50,
            width: '90%',
            backgroundColor: 'blue',
            marginTop: '5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
            }}>
            Add Trip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'red',
  },
});
