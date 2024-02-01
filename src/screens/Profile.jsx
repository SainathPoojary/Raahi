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
import {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthProvider';
import PostCard from '../components/PostCard';

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  const [likes, setLikes] = useState(0);
  const navigation = useNavigation();
  const openHome = () => {
    navigation.navigate('nav');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const _posts = await firestore()
        .collection('posts')
        .where('authorId', '==', user.uid)
        .get();

      const likes = _posts.docs.reduce((acc, doc) => {
        acc +=
          doc.data().costLikes ||
          0 + doc.data().comforLikes ||
          0 + doc.data().timeLikes ||
          0;
        return acc;
      }, 0);

      setLikes(likes);

      setPosts(_posts.docs.map(doc => doc.data()));
    };

    fetchPosts();
  }, []);

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
        {user.displayName}
      </Text>
      <View className="h-14 w-52 mt-5 flex flex-row">
        <View className="h-full w-1/2 inline-flex items-center justify-center border-r border-gray-400">
          <Text className="text-black text-xl text-center font-bold">
            {Math.round(likes / 2)}
          </Text>
          <Text className="text-black text-sm text-center">Credits</Text>
        </View>
        <View className="h-full w-1/2 inline-flex items-center justify-center">
          <Text className="text-black text-xl text-center font-bold">
            {likes}
          </Text>
          <Text className="text-black text-sm text-center">Likes</Text>
        </View>
      </View>
      <TouchableOpacity
        disabled={true}
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
      <View className="w-[90%] mt-5">
        <Text
          className="text-black text-3xl"
          style={{fontFamily: 'Poppins-Medium'}}>
          Posts
        </Text>
      </View>
      <View className="w-[90%] pb-5">
        {posts.map(post => (
          <PostCard key={post.id} data={post} saved={true} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'red',
  },
});
