import {useState, useEffect} from 'react';
import {Animated} from 'react-native';
import {fadeAnimDuration} from '../../constants/constants';

const useFadeAnimation = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeAnimDuration,
      useNativeDriver: true,
    }).start();
  }, []);

  return fadeAnim;
};

export default useFadeAnimation;
