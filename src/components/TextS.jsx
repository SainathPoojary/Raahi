import {Text} from 'react-native';

export default function TextS({
  children,
  fontWeight = 400,
  style,
  className,
  numberOfLines,
}) {
  const styles = {
    100: 'Poppins-Thin',
    200: 'Poppins-ExtraLight',
    300: 'Poppins-Light',
    400: 'Poppins-Regular',
    500: 'Poppins-Medium',
    600: 'Poppins-SemiBold',
    700: 'Poppins-Bold',
    800: 'Poppins-ExtraBold',
    900: 'Poppins-Black',
  };

  return (
    <Text
      className={className}
      numberOfLines={numberOfLines}
      style={[{fontFamily: styles[fontWeight], color: '#000'}, style]}>
      {children}
    </Text>
  );
}
