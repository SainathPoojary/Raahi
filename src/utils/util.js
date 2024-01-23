import Config from 'react-native-config';
const API_KEY = Config.GOOGLE_MAPS_API_KEY;

export const autoComplete = async (text, setResult) => {
  text.replace(/\s/g, '%20');
  const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=establishment&location=19.225086%2C 72.859972&radius=500&key=${API_KEY}`;
  await fetch(URL)
    .then(response => response.json())
    .then(json => {
      let predictions = [];
      for (let prediction of json.predictions) {
        predictions.push({
          title: prediction.structured_formatting.main_text,
          subtitle: prediction.structured_formatting.secondary_text,
          placeId: prediction.place_id,
          distance: 0,
        });
      }
      setResult(predictions);
    })
    .catch(e => {
      console.log('AutoComplete Error: ' + e);
    });
};

export const geoCoding = async place_id => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${API_KEY}`;
  let latLng = [];
  await fetch(URL)
    .then(response => response.json())
    .then(json => {
      latLng = json.results[0].geometry.location;
    })
    .catch(e => {
      console.log('Geocoding Error: ' + e);
    });
  return latLng;
};

export const reverseGeoCoding = async (lat, long) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;
  let data = {
    title: '',
    subtitle: '',
    placeId: '',
    latitude: lat,
    longitude: long,
  };
  await fetch(URL)
    .then(response => response.json())
    .then(json => {
      data.title = json.results[0].address_components[0].long_name;
      data.subtitle = json.results[0].formatted_address;
      data.placeId = json.results[0].place_id;
    })
    .catch(e => {
      console.log('Geocoding Error: ' + e);
    });
  return data;
};

export const getPolyline = async (origin, destination) => {
  try {
    console.log(origin, destination);
    const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${API_KEY}`;
    const response = await fetch(URL);
    const json = await response.json();
    const coordinates = [];

    console.log(json);

    for (let step of json.routes[0].legs[0].steps) {
      coordinates.push({
        latitude: step.start_location.lat,
        longitude: step.start_location.lng,
      });
    }

    coordinates.push({
      latitude: json.routes[0].legs[0].end_location.lat,
      longitude: json.routes[0].legs[0].end_location.lng,
    });

    return coordinates;
  } catch (e) {
    console.log(e);
  }
};
