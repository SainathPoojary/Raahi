import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TextS from '../components/TextS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthProvider';
import {useNavigation} from '@react-navigation/native';

export default function Settings() {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('profile')}
        style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="person" size={25} color="#2b2b2b" />
          <TextS fontWeight={500} style={styles.text}>
            Profile
          </TextS>
        </View>
        <Icon name="arrow-forward-ios" size={20} color="#000" />
      </TouchableOpacity>

      <View style={{height: 1, backgroundColor: '#d0cfcf'}} />

      <TouchableOpacity style={styles.card} onPress={logout}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="logout" size={25} color="#2b2b2b" />
          <TextS fontWeight={500} style={styles.text}>
            Logout
          </TextS>
        </View>
        <Icon name="arrow-forward-ios" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  text: {
    color: '#3b3b3b',
    fontSize: 18,
    marginLeft: 10,
    includeFontPadding: false,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
