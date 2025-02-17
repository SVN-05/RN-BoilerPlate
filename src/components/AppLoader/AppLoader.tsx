import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {flexCol} from '../../styles/commonsStyles';
import {colors} from '../../styles/theme';

import {ReactNode} from 'react';

interface AppLoaderProps {
  children: ReactNode;
  showLoader?: boolean;
  isTransparentLoader?: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({
  children,
  showLoader = false,
  isTransparentLoader = false,
}) => {
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={isTransparentLoader}>
        <View
          style={[
            styles.parent,
            {
              backgroundColor: colors.transparentGrey,
            },
          ]}>
          <ActivityIndicator
            animating={isTransparentLoader}
            color={colors.primaryColor}
            size={'large'}
          />
        </View>
      </Modal>
      {showLoader ? (
        <ActivityIndicator
          animating={showLoader}
          color={colors.primaryColor}
          size={'large'}
        />
      ) : (
        children
      )}
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    ...flexCol,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryBackground,
  },
  parent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
