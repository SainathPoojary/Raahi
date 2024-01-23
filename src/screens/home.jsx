import {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ProfilePhoto from '../../assets/images/harshit.png';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthProvider';
import AutoCompleteInput from '../components/AutoCompleteInput';
import firestore from '@react-native-firebase/firestore';
import images from '../res/js/images';

export default function Home() {
  const navigation = useNavigation();
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const openProfile = () => {
    navigation.navigate('profile');
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log('Searching...');
      const data = await firestore()
        .collection('posts')
        .where('source.lat', '==', fromInput.lat)
        .where('source.long', '==', fromInput.long)
        .where('destination.lat', '==', toInput.lat)
        .where('destination.long', '==', toInput.long)
        .get();

      navigation.navigate('posts', {
        data: data.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
            saved: true,
          };
        }),
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.home_profile_view} onClick={openProfile}>
        <Pressable onPress={openProfile}>
          <Image
            source={ProfilePhoto}
            style={styles.profileImage}
            onClick={openProfile}
          />
        </Pressable>
        <View
          style={{
            minWidth: '30%',
            height: '80%',
            marginLeft: '5%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'gray', fontFamily: 'Poppins-Medium'}}>
            Good{' '}
            {new Date().getHours() < 12
              ? 'Morning'
              : new Date().getHours() < 18
              ? 'Afternoon'
              : 'Evening'}{' '}
            ☀️
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontFamily: 'Poppins-Medium',
            }}>
            {user.displayName}
          </Text>
        </View>
      </View>
      <Text
        style={{
          marginTop: '2%',
          color: 'black',
          fontSize: 30,
          marginLeft: '5%',
          fontFamily: 'Poppins-Medium',
        }}>
        Let's Travel!
      </Text>
      <View
        style={{
          marginTop: '2%',
        }}>
        <AutoCompleteInput
          containerStyle={{
            width: '90%',
            marginHorizontal: '5%',
          }}
          border={false}
          setData={setFromInput}
          placeholder="📍    From (Location)"
        />
        <AutoCompleteInput
          containerStyle={{
            marginTop: '4%',
            width: '90%',
            marginHorizontal: '5%',
          }}
          border={false}
          setData={setToInput}
          placeholder="🏝️    To (Destination)"
        />
      </View>

      <TouchableOpacity
        onPress={handleSearch}
        style={{
          height: 50,
          width: '90%',
          marginLeft: '5%',
          backgroundColor: 'blue',
          marginTop: '5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{color: 'white', fontFamily: 'Poppins-Medium '}}>
            Search
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          marginTop: '12%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={images.adverisement}
          style={{
            width: '90%',
            height: 'auto',
            aspectRatio: 5 / 4,
          }}
        />

        <Text
          style={{
            position: 'absolute',
            bottom: 15,
            right: 30,
            color: 'black',
            fontFamily: 'Poppins-Semibold',
            backgroundColor: '#F3F3F8',
            paddingHorizontal: 12,
            borderRadius: 3,
          }}>
          Ad
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F3F3F8',
    display: 'flex',
  },
  home_profile_view: {
    width: '90%',
    height: '10%',
    marginLeft: '5%',
    display: 'flex',
    alignItems: 'center',
    marginTop: '5%',
    flexDirection: 'row',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    marginLeft: '2%',
  },
});
