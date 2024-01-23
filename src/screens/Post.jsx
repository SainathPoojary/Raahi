import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Post = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [steps, setSteps] = useState(route.params.post.steps);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: '100%',
      }}>
      <View>
        {steps.map((step, index) => {
          return (
            <Card
              key={index}
              cost={step.estimatedTime}
              destination={step.destination.title}
              source={step.source.title}
              message={step.message}
              transportationMode={step.transportationMode}
              time={step.estimatedTime}
            />
          );
        })}
      </View>

      {/* FAB button for maps */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('preview', {
            post: route.params.post,
          });
        }}
        style={{
          backgroundColor: '#000',
          padding: 18,
          borderRadius: 50,
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}>
        <Icon name="map" size={28} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Post;
