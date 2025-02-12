import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {colors} from '../../Styles/theme';
import {flexCol} from '../../Styles/commonsStyles';

interface AlertModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
  closeFunc?: () => void;
  animationType?: 'none' | 'slide' | 'fade';
}

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  setVisible,
  children,
  closeFunc,
  animationType,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = () => {
    if (closeFunc) {
      closeFunc();
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <Modal
      transparent={true}
      animationType={animationType}
      visible={modalVisible}
      onRequestClose={hideModal}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.alertCard}>{children}</View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  modalContainer: {
    ...flexCol,
    flex: 1,
    justifyContent: 'center', // This centers the modal content vertically
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  overlay: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  alertCard: {
    width: '90%',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    zIndex: 2,
  },
});
