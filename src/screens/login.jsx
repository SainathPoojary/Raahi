import {useContext, useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../context/AuthProvider';
import images from '../res/js/images';
import TextS from '../components/TextS';
import IconTextInput from '../components/IconTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import animations from '../res/js/animations';

export default function Login({navigation}) {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Login screen');
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <View className="bg-[#fff] h-screen items-center py-[30] space-y-[18] justify-center">
      <LottieView
        source={animations.travel}
        autoPlay
        loop
        style={{
          width: '80%',
          height: 'auto',
          aspectRatio: 2 / 1,
        }}
      />
      <TextS fontWeight={600} className="text-2xl  text-black">
        Welcome back!
      </TextS>

      <View className="flex w-full items-start space-y-3 px-[20]">
        <View className="w-full space-y-1">
          <TextS className={'text-xs '}>E-mail Address</TextS>
          <IconTextInput
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholder={'E-mail Address'}
          />
        </View>
        <View className="w-full space-y-1">
          <TextS className={'text-xs '}>Password</TextS>
          <IconTextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder={'Enter your Password'}
          />
        </View>
      </View>

      <View className="flex-row items-center space-x-3">
        <View className="border-t border-[#9ea2a5]  flex-grow" />
        <TextS className={'text-[#9ea2a5] text-lg'} fontWeight={500}>
          or
        </TextS>
        <View className="border-t border-[#9ea2a5]  flex-grow" />
      </View>

      <View className="flex-row space-x-3">
        <TouchableOpacity className="p-[10] bg-[#F5F7FD] border-[1.5px] border-[#d2dfe9] rounded-xl">
          <Image source={images.googleLogo} className=" w-[30] h-[30]" />
        </TouchableOpacity>
        <TouchableOpacity className="p-[10] bg-[#F5F7FD] border-[1.5px] border-[#d2dfe9] rounded-xl">
          <Image source={images.facebookLogo} className=" w-[30] h-[30]" />
        </TouchableOpacity>
        <TouchableOpacity className="p-[10] bg-[#F5F7FD] border-[1.5px] border-[#d2dfe9] rounded-xl">
          <Image source={images.appleLogo} className=" w-[30] h-[30]" />
        </TouchableOpacity>
      </View>

      <View className="items-center space-y-2 w-full">
        <TouchableOpacity
          className="bg-black rounded-lg p-[10] flex-row justify-center space-x-2 w-[93%]"
          onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <TextS className={'text-white m-0'} fontWeight={600}>
                Log in
              </TextS>
              <Icon name="arrow-forward" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
        <View className="flex-row space-x-2 justify-center items-center">
          <TextS>Dont have an account?</TextS>
          <Pressable onPress={() => navigation.navigate('register')}>
            <TextS className={'text-primary'} fontWeight={600}>
              Sign up now.
            </TextS>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
