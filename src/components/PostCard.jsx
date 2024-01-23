import {Text, Touchable, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextS from './TextS';
import firestore from '@react-native-firebase/firestore';
import {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthProvider';

export default function PostCard({saved, data}) {
  const [costLikes, setCostLikes] = useState(data.costLikes);
  const [timeLikes, setTimeLikes] = useState(data.timeLikes);
  const [comfortLikes, setComfortLikes] = useState(data.comfortLikes);
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [save, setSave] = useState(saved);

  const toggleSave = async () => {
    try {
      if (save) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            savedPosts: firestore.FieldValue.arrayRemove(data.id),
          });
      } else {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            savedPosts: firestore.FieldValue.arrayUnion(data.id),
          });
      }
      setSave(!save);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        elevation: 3,
        marginTop: 20,
        borderRadius: 20,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 20,
          paddingHorizontal: 12,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('post', {
              post: data,
            });
          }}
          className={'flex-row items-center'}>
          <View className={'space-y-2 ml-[14]'}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginRight: 10,
                }}>
                <TextS numberOfLines={1} fontWeight={600}>
                  {data.source.title}
                </TextS>

                <TextS numberOfLines={1} fontWeight={600}>
                  {data.destination.title}
                </TextS>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
              }}
              className="flex-row space-x-2">
              <View
                style={{
                  backgroundColor: '#4D39FF',
                  borderRadius: 30,
                  paddingHorizontal: 18,
                  justifyContent: 'center',
                }}>
                <TextS className={' text-white '} fontWeight={600}>
                  ₹{10}
                </TextS>
              </View>

              <View
                style={{
                  backgroundColor: '#4D39FF',
                  borderRadius: 30,
                  paddingHorizontal: 18,
                  justifyContent: 'center',
                }}>
                <TextS className={' text-white '} fontWeight={600}>
                  {data.estimatedTime} hr
                </TextS>
              </View>

              <TouchableOpacity onPress={toggleSave}>
                <Icon
                  name={save ? 'bookmark' : 'bookmark-border'}
                  size={25}
                  color="#4D39FF"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Likes Section */}
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            // update likes
            setComfortLikes(comfortLikes + 1);
            firestore()
              .collection('posts')
              .doc(data.id)
              .update({
                comfortLikes: comfortLikes + 1,
              });
          }}
          className="space-x-2"
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Icon name="favorite" size={22} color="red" />
          <TextS>{comfortLikes}</TextS>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // update likes
            setTimeLikes(timeLikes + 1);
            firestore()
              .collection('posts')
              .doc(data.id)
              .update({
                timeLikes: timeLikes + 1,
              });
          }}
          className="space-x-2"
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Icon name="bolt" size={22} color="#FFE400" />
          <TextS>{timeLikes}</TextS>
        </TouchableOpacity>
        <TouchableOpacity
          className="space-x-2"
          onPress={() => {
            // update likes
            setCostLikes(costLikes + 1);
            firestore()
              .collection('posts')
              .doc(data.id)
              .update({
                costLikes: costLikes + 1,
              });
          }}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Icon name="money" size={22} color="green" />
          <TextS>{costLikes}</TextS>
        </TouchableOpacity>
      </View>
    </View>
  );
}
