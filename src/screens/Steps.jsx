import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextS from '../components/TextS';
import AddStep from './AddStep';
import {useNavigation, useRoute} from '@react-navigation/native';
import Card from '../components/Card';
import {AuthContext} from '../context/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Steps = () => {
  const route = useRoute();
  const {user} = useContext(AuthContext);
  const [steps, setSteps] = useState([]);
  const navigation = useNavigation();
  const [showAddStep, setShowAddStep] = useState(false);
  const {
    src,
    dest,
    srcData,
    destData,
    isAffordable,
    isTimeSaving,
    isComfortable,
  } = route.params;
  const [stepDest, setStepDest] = useState('');
  const [saveButton, setSaveButton] = useState(false);
  const [stepDestData, setStepDestData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(steps);
    if (steps.length > 0) {
      setStepDest(
        steps[steps.length - 1].destination.title +
          steps[steps.length - 1].destination.subtitle,
      );

      setStepDestData(steps[steps.length - 1].destination);

      if (destData.placeId === steps[steps.length - 1]?.destination?.placeId) {
        setSaveButton(true);
      }
    }
  }, [steps]);

  useEffect(() => {
    if (steps.length == 0) {
      setShowAddStep(true);
    }
  }, []);

  if (showAddStep) {
    return (
      <AddStep
        stepDestData={stepDestData}
        srcData={srcData}
        destData={destData}
        src={stepDest != '' ? stepDest : src}
        dest={dest}
        setShowAddStep={setShowAddStep}
        setSteps={setSteps}
        steps={steps}
      />
    );
  }

  const handleSave = async () => {
    setLoading(true);

    try {
      const data = {
        source: srcData,
        destination: destData,
        estimatedTime: steps.reduce((a, b) => a + b.estimatedTime, 0),
        steps: steps,
        authorId: user.uid,
        isAffordable,
        isTimeSaving,
        isComfortable,
        comfortLikes: 0,
        timeLikes: 0,
        costLikes: 0,
      };
      console.log(data);

      const res = await firestore().collection('posts').add(data);
      const userRef = await firestore().collection('users').doc(user.uid).get();
      const userData = userRef.data();
      const posts = userData.posts;
      posts.push(res.id);
      await firestore().collection('users').doc(user.uid).update({
        posts: posts,
      });
    } catch (e) {
      console.log(e);
    }

    setLoading(false);

    navigation.navigate('nav');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 20,
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

      {saveButton ? (
        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: '#000',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 20,
          }}>
          {loading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <TextS className={'text-white text-[15px]'} fontWeight={500}>
              Save
            </TextS>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={() => setShowAddStep(true)}>
          <TextS className={'text-white text-[15px]'} fontWeight={500}>
            Add Steps
          </TextS>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Steps;
