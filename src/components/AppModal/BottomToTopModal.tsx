/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import {colors} from '../../Styles/theme';
import AppIcon, {iconFamily} from '../AppIcon/AppIcon';

const {height: screenHeight} = Dimensions.get('window');

interface GetContentHeight {
  (heightValue?: number): number;
}

const getContentHeight: GetContentHeight = heightValue => {
  return screenHeight * (heightValue ?? 0.4);
};

interface BottomToTopModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  heightValue?: number;
  contentContainerStyle?: object;
  children: React.ReactNode;
  closeFunc?: () => void;
  nestedScrollEnabled?: boolean;
  showDragBar?: boolean;
  showCloseButton?: boolean;
  topRadius?: number;
  customHeight?: number;
}

const BottomToTopModal: React.FC<BottomToTopModalProps> = ({
  visible,
  setVisible,
  heightValue,
  contentContainerStyle,
  children,
  closeFunc,
  nestedScrollEnabled = false,
  showDragBar = false,
  showCloseButton = false,
  topRadius = 0,
  customHeight,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const finalModalHeight = customHeight ?? getContentHeight(heightValue);
  const slideAnim = useRef(new Animated.Value(finalModalHeight)).current; // Initial position

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [modalVisible]);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Slide up to the top
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: finalModalHeight, // Slide down back to the bottom
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false); // Callback to setVisible after animation completes
      });
    }
  }, [visible, slideAnim, setVisible, finalModalHeight]);

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: finalModalHeight, // Slide down to the height of the modal
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (closeFunc) {
        closeFunc();
      } else {
        setVisible(false);
      }
    });
  };

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: slideAnim}}],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = ({nativeEvent}: {nativeEvent: any}) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 100) {
        hideModal(); // Close if swiped down enough
      } else {
        // Snap back to open position if not swiped down enough
        Animated.timing(slideAnim, {
          toValue: 0, // Snap back to open position
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  // Clamp the animated value to avoid exceeding bounds
  const translateY = slideAnim.interpolate({
    inputRange: [0, finalModalHeight],
    outputRange: [0, finalModalHeight],
    extrapolate: 'clamp',
  });

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={modalVisible}
      onRequestClose={hideModal}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={hideModal}>
            <View style={{width: '100%', flexGrow: 1}} />
          </TouchableWithoutFeedback>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}>
            <Animated.View
              style={{
                width: '100%',
                transform: [{translateY}],
                height: finalModalHeight,
              }}>
              <View
                style={[
                  styles.modal,
                  {
                    borderTopLeftRadius: topRadius,
                    borderTopRightRadius: topRadius,
                  },
                ]}>
                {showDragBar && <View style={styles.dragBar} />}
                {showCloseButton && (
                  <AppIcon
                    name={'close'}
                    family={iconFamily.antDesign}
                    color={'#1F2937'}
                    size={25}
                    style={{alignSelf: 'flex-end'}}
                    onPress={hideModal}
                  />
                )}
                <ScrollView
                  style={{width: '100%', flex: 1}}
                  nestedScrollEnabled={nestedScrollEnabled}
                  contentContainerStyle={contentContainerStyle}>
                  {children}
                </ScrollView>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default BottomToTopModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    height: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  dragBar: {
    height: 8,
    width: '50%',
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 15, // Optional for aesthetics
  },
});
