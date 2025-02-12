import React, {useState} from 'react';
import {View, Image, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../Styles/theme';
import AppText from '../AppText/AppText';

interface AppImageProps {
  source: {uri: string} | number;
  style?: object;
  errorMessage?: string;
  customName?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  src?: string;
  [key: string]: any;
}

const AppImage: React.FC<AppImageProps> = ({
  source,
  style,
  errorMessage,
  customName,
  resizeMode = 'cover',
  src,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const showText = (customName && error) || src?.length === 0;

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: showText ? colors.primaryColor : colors.transparent,
    },
    loader: {
      position: 'absolute',
    },
    errorText: {
      color: showText ? colors.white : 'red',
      position: 'absolute',
      textTransform: showText ? 'uppercase' : 'none',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: resizeMode,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <ActivityIndicator color={colors.primaryColor} style={styles.loader} />
      )}
      {(error || showText) && (
        <AppText textStyle={styles.errorText}>
          {showText ? customName : errorMessage || 'Error loading image'}
        </AppText>
      )}

      <Image
        src={src}
        alt="image"
        source={source}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        onError={handleError}
        style={styles.image}
        {...rest}
      />
    </View>
  );
};

export default AppImage;
