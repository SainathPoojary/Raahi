import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfilePhoto from '../../assets/images/harshit.png';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Profile() {
  const navigation = useNavigation();
  const openHome = () => {
    navigation.navigate('nav');
  };
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}} className="flex">
      <TouchableOpacity
        onPress={openHome}
        className="h-10 w-10 absolute left-2 top-5 flex justify-center items-center">
        <Icon name={'close'} size={30} color={'black'} />
      </TouchableOpacity>
      <Image
        source={ProfilePhoto}
        className="bg-gray-300 h-[120] w-[120] mt-10 rounded-full"
      />
      <Text
        style={{fontFamily: 'Poppins-Medium'}}
        className="text-black mt-5 text-xl">
        Kshitij Shetty
      </Text>
      <View className="h-14 w-52 mt-5 flex flex-row">
        <View className="h-full w-1/2 inline-flex items-center justify-center border-r border-gray-400">
          <Text className="text-black text-xl text-center font-bold">1500</Text>
          <Text className="text-black text-sm text-center">Credits</Text>
        </View>
        <View className="h-full w-1/2 inline-flex items-center justify-center">
          <Text className="text-black text-xl text-center font-bold">150k</Text>
          <Text className="text-black text-sm text-center">Likes</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: '90%',
          backgroundColor: 'goldenrod',
          marginTop: '5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}>
        <Text
          style={{color: 'black', fontFamily: 'Poppins-Medium', fontSize: 16}}>
          Redeem Credits
        </Text>
      </TouchableOpacity>
      <View className="w-[90%] mt-5 pb-5">
        <Text
          className="text-black text-3xl"
          style={{fontFamily: 'Poppins-Medium'}}>
          Posts
        </Text>
        <View className="h-40 w-full bg-gray-400 mt-5"></View>
        <View className="h-40 w-full bg-gray-400 mt-5"></View>
        <View className="h-40 w-full bg-gray-400 mt-5"></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'red',
  },
});
