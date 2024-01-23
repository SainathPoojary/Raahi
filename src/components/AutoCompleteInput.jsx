import React, {useEffect, useState} from 'react';
import {autoComplete, geoCoding} from '../utils/util';
import Suggestion from './Suggestion';
import {ScrollView, TextInput, View} from 'react-native';

const AutoCompleteInput = ({
  markerText="", setData,
  placeholder = 'Enter Location',
  style,
  containerStyle,
  border = true,
}) => {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [sourceSelected, setSourceSelected] = useState(false);

  useEffect(() => {
    autoComplete(text, setSuggestions);
  }, [text]);

  const handleClick = (data, lat, long) => {
    setData({
      lat,
      long,
      placeId: data.placeId,
      title: data.title,
      subtitle: data.subtitle,
    });
    setText(data.title + data.subtitle);
  };

  const updateSource = text => {
    setText(text);
    setSourceSelected(false);
  };

  return (
    <View style={containerStyle}>
      <TextInput
        className={`rounded-xl pl-5 text-black bg-white border-2 border-white ${
          border && 'focus:border-blue-700'
        }`}
        value={markerText != ""  ? markerText : text}
        onChangeText={updateSource}
        placeholderTextColor={'gray'}
        style={[{fontFamily: 'Poppins-Medium'}, style]}
        placeholder={placeholder}
      />
      {text.length > 0 && !sourceSelected && (
        <ScrollView className="rounded-b-xl w-full h-40 bg-white">
          {suggestions.map(data => {
            return (
              <Suggestion
                title={data.title}
                subtitle={data.subtitle}
                distance={data.distance}
                key={data.placeId}
                onPress={async () => {
                  const latLng = await geoCoding(data.placeId);
                  console.log(latLng);
                  setSourceSelected(true);
                  handleClick(data, latLng.lat, latLng.lng);
                }}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default AutoCompleteInput;
