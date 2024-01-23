import React, {createContext, useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert, ToastAndroid} from 'react-native';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(auth().currentUser);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            // field validations
            if (!email || !password) {
              ToastAndroid.show(
                'Please fill all the fields',
                ToastAndroid.SHORT,
              );
            }

            // email validation
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
              ToastAndroid.show(
                'Please enter a valid email',
                ToastAndroid.SHORT,
              );
            }

            // login user
            const result = await auth().signInWithEmailAndPassword(
              email,
              password,
            );

            // log user
            console.log(result.user);

            // set user
            setUser(result.user);

            // toast
            ToastAndroid.show(
              'User logged in successfully',
              ToastAndroid.SHORT,
            );
          } catch (e) {
            console.log(e);
            ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
            return e;
          }
        },

        register: async (email, password, name, phoneNo) => {
          try {
            // field validations
            if (!name || !email || !password) {
              Alert.alert('Please fill all the fields');
              return;
            }

            // check email format
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
              Alert.alert('Please enter a valid email');
              return;
            }

            // create user
            const result = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );

            // update profile
            await result.user.updateProfile({
              displayName: name,
            });

            // store user in firestore
            await firestore().collection('users').doc(result.user.uid).set({
              name: name,
              email: email,
              savedPosts: [],
              posts: [],
            });

            // set user
            setUser(result.user);

            console.log(result.user);

            // toast
            ToastAndroid.show(
              'User registered successfully',
              ToastAndroid.SHORT,
            );
          } catch (e) {
            console.log(e);
            ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
          }
        },

        logout: async () => {
          try {
            await auth().signOut();
            setUser(null);
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
