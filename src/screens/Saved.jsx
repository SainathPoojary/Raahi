import {useIsFocused, useRoute} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import PostCard from '../components/PostCard';
import {AuthContext} from '../context/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import TextS from '../components/TextS';
import LottieView from 'lottie-react-native';
import animations from '../res/js/animations';

export default function Saved() {
  const [data, setData] = useState([]);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const savedIds = (
          await firestore().collection('users').doc(user.uid).get()
        ).data().savedPosts;

        console.log(savedIds);

        //  get all posts
        const data = await firestore().collection('posts').get();

        // filter posts with ids in savedIds
        const posts = data.docs.filter(doc => savedIds.includes(doc.id));

        setData(
          posts.map(doc => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          }),
        );
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [isFocused]);

  return loading ? (
    <Loader />
  ) : data.length === 0 ? (
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
          width: '60%',
          height: 'auto',
          aspectRatio: 5 / 4,
        }}
      />
      <TextS
        className={'text-xl'}
        style={{
          marginTop: '3%',
          color: '#000',
        }}
        fontWeight={600}>
        No Saved Posts
      </TextS>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      {data.map(post => (
        <PostCard key={post.id} data={post} saved={true} />
      ))}
    </ScrollView>
  );
}
