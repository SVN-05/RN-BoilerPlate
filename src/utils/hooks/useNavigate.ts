import {useNavigation} from '@react-navigation/native';
const useNavigate = () => {
  const navigation = useNavigation();

  const goTo = (screenName: string, keys: object) => {
    navigation?.navigate(screenName, keys);
  };

  const goBack = () => {
    navigation?.goBack();
  };

  const replace = (screenName: string, keys = {}) => {
    navigation.replace(screenName, keys);
  };

  return {goTo, goBack, replace};
};

export default useNavigate;
