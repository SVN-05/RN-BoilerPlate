import React from 'react';
import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export const iconFamily = {
  antDesign: 'AntDesign',
  entypo: 'Entypo',
  evilIcons: 'EvilIcons',
  feather: 'Feather',
  fontAwesome: 'FontAwesome',
  fontAwesome5: 'FontAwesome5',
  fontAwesome5Pro: 'FontAwesome5Pro',
  fontAwesome6: 'FontAwesome6',
  fontAwesome6Pro: 'FontAwesome6Pro',
  fontisto: 'Fontisto',
  foundation: 'Foundation',
  ionicons: 'Ionicons',
  materialCommunityIcons: 'MaterialCommunityIcons',
  materialIcons: 'MaterialIcons',
  octicons: 'Octicons',
  simpleLineIcons: 'SimpleLineIcons',
  zocial: 'Zocial',
};

const iconComponent = {
  [iconFamily.antDesign]: AntDesign,
  [iconFamily.entypo]: Entypo,
  [iconFamily.evilIcons]: EvilIcons,
  [iconFamily.feather]: Feather,
  [iconFamily.fontAwesome]: FontAwesome,
  [iconFamily.fontAwesome5]: FontAwesome5,
  [iconFamily.fontAwesome5Pro]: FontAwesome5Pro,
  [iconFamily.fontAwesome6]: FontAwesome6,
  [iconFamily.fontAwesome6Pro]: FontAwesome6Pro,
  [iconFamily.fontisto]: Fontisto,
  [iconFamily.foundation]: Foundation,
  [iconFamily.ionicons]: Ionicons,
  [iconFamily.materialCommunityIcons]: MaterialCommunityIcons,
  [iconFamily.materialIcons]: MaterialIcons,
  [iconFamily.octicons]: Octicons,
  [iconFamily.simpleLineIcons]: SimpleLineIcons,
  [iconFamily.zocial]: Zocial,
};

type AppIconProps = {
  family: string;
  name: string;
  size: number;
  color?: string;
  style?: object;
  onPress?: (event: NativeSyntheticEvent<NativeTouchEvent>) => void;
};

const AppIcon: React.FC<AppIconProps> = ({
  family,
  name,
  size,
  color,
  style,
  onPress,
}) => {
  if (!family) {
    return null;
  }

  const IconName = iconComponent[family] as unknown as React.ComponentType<any>;

  return (
    <IconName
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={onPress}
    />
  );
};

export default AppIcon;
