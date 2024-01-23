import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextS from './TextS';

export default function Card({
  transportationMode = 'walk',
  source,
  destination,
  cost,
  time,
  message,
}) {
  const VehicleIcon = {
    train: <Icon name="train" size={30} color="white" />,
    flight: <Icon name="flight" size={30} color="white" />,
    bus: <Icon name="directions-bus" size={30} color="white" />,
    walk: <Icon name="directions-walk" size={30} color="white" />,
    taxi: <Icon name="local-taxi" size={30} color="white" />,
  };

  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 8,
      }}>
      <View className={'flex-row items-center px-4 '}>
        <View
          style={{
            backgroundColor: '#4D39FF',
            borderRadius: 30,
            padding: 15,
          }}>
          {VehicleIcon[transportationMode]}
        </View>
        <View className={'space-y-2 ml-[14]  flex-1'}>
          <TextS numberOfLines={1} fontWeight={600}>
            {source}
          </TextS>

          <TextS
            style={{
              width: '100%',
            }}
            numberOfLines={1}
            fontWeight={600}>
            {destination}
          </TextS>
          <View className="flex-row space-x-2">
            <View
              style={{
                backgroundColor: '#4D39FF',
                borderRadius: 30,
                paddingHorizontal: 18,
                justifyContent: 'center',
              }}>
              <TextS className={' text-white '} fontWeight={600}>
                ${cost}
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
                {time} hr
              </TextS>
            </View>
          </View>
        </View>
      </View>
      {message && (
        <View
          style={{
            marginTop: 15,
          }}
          className="border-t border-[#C1CDFD] flex-grow"
        />
      )}
      {message && (
        <TextS
          style={{
            marginTop: 15,
            textAlign: 'center',
          }}>
          {message}
        </TextS>
      )}
    </View>
  );
}
