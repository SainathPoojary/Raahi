import React, {useEffect} from 'react';
import colors from '../res/js/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
export default function Suggestion({title, subtitle, distance, onPress}) {
  return (
    <TouchableOpacity style={styles.recentDest} onPress={onPress}>
      {/* <View style={styles.recentDestLeft}>
        <View style={styles.locationIcon}>
          <Icon name="location-on" size={16} color={colors.gray_100} />
        </View>
        <Text style={styles.locIconText}>{distance} km</Text>
      </View> */}
      <View style={styles.recentDestRight}>
        <Text style={styles.recentDestRightTitle}>{title}</Text>
        <Text style={styles.recentDestRightSubTitle}>{subtitle}</Text>
        {/* Line */}
        <View style={styles.seperator} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recentDest: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  recentDestLeft: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 2,
  },

  locationIcon: {
    backgroundColor: colors.gray_400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderRadius: 20,
  },
  locIconText: {
    color: colors.gray_300,
    fontSize: 12,
  },
  recentDestRight: {
    flex: 5,
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  recentDestRightTitle: {
    marginBottom: 2,
    fontWeight: '700',
    color: "gray",
  },
  recentDestRightSubTitle: {
    color: "gray",
    marginBottom: 4,
  },

  seperator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_400,
    height: 1,
  },
});