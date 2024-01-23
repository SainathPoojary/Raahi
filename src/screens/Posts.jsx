import {useNavigation, useRoute} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PostCard from '../components/PostCard';
import LottieView from 'lottie-react-native';
import animations from '../res/js/animations';
import TextS from '../components/TextS';
import colors from '../res/js/colors';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthProvider';
import Loader from '../components/Loader';

export default function Posts() {
  const route = useRoute();
  const {data} = route.params;
  const navigation = useNavigation();
  const [savedPosts, setSavedPosts] = useState([]);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await firestore().collection('users').doc(user.uid).get();
        setSavedPosts(res.data().savedPosts);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchSavedPosts();
  }, []);

  if (loading) return <Loader />;

  return data && data.length === 0 ? (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={animations.notFound}
        autoPlay
        loop
        style={{
          width: '80%',
          height: 'auto',
          aspectRatio: 5 / 4,
        }}
      />
      <TextS
        className={'text-2xl'}
        style={{
          marginTop: '2%',
          color: '#000',
        }}
        fontWeight={600}>
        No Posts Found
      </TextS>
      <TouchableOpacity
        onPress={() => navigation.navigate('Create')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 8,
          marginTop: '2%',
        }}>
        <TextS style={{color: '#fff'}}>Create Post</TextS>
      </TouchableOpacity>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      {data.map(post => (
        <PostCard
          key={post.id}
          saved={savedPosts.some(savedPost => savedPost === post.id)}
          data={post}
        />
      ))}
    </ScrollView>
  );
}
