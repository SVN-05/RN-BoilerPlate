import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {colors} from '../../../../Styles/theme';
import AppText from '../../../AppText/AppText';
import {fontSizes} from '../../../../constants/constants';
import {Controller} from 'react-hook-form';
import AppLoader from '../../../AppLoader/AppLoader';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {BASE_URL} from '../../../../utils/api';
import {ErrorText} from '../../../microComponents/ErrorText';
import {flexCol, flexRow} from '../../../../Styles/commonsStyles';
import {iconFamily} from '../../../AppIcon/AppIcon';

const AppAttachmentPicker = ({
  placeholder,
  fileTypes = [],
  allowMultiSelection = false,
  control,
  name,
  error,
  rules,
  uploadUrl,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const disableField = disabled || disable;

  const handleAttachment = async onChange => {
    setIsLoading(true); // Start loading state
    try {
      const res = await DocumentPicker.pick({
        type: fileTypes,
        allowMultiSelection,
      });

      const {uri, name, type} = res?.[0] || {};
      const formData = new FormData();

      // Append the file to FormData
      formData.append('file', {
        uri,
        name,
        type,
      });

      const response = await fetch(`${BASE_URL}${uploadUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get response text for error logging
        console.error('Error response:', errorText);
        Toast.show({type: 'error', text2: 'Error in uploading file.'});
        return; // Early exit on error
      }

      const data = await response.json();
      if (data) {
        Toast.show({type: 'success', text2: 'File uploaded successfully.'});
        onChange(data?.data);
        setDisable(true);
      } else {
        Toast.show({type: 'error', text2: 'Error in uploading file.'});
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Toast.show({type: 'error', text2: 'Error in uploading file.'});
        console.error(err);
      }
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  const renderPicker = (onChange, value) =>
    isLoading ? (
      <AppLoader isTransparentLoader={isLoading} />
    ) : (
      <View style={flexCol}>
        <TouchableOpacity
          disabled={disableField}
          style={styles.inputContainer(error)}
          onPress={() => handleAttachment(onChange)}>
          <AppIcon
            name={'upload'}
            family={iconFamily.feather}
            size={20}
            color={colors.black}
          />
          <AppText
            text={placeholder}
            fs={fontSizes.md}
            textStyle={{marginTop: 22}}
          />
        </TouchableOpacity>
        {value && (
          <TouchableOpacity
            style={{
              width: '50%',
              marginTop: 10,
              backgroundColor: colors.grey1A1A19,
              borderRadius: 5,
              paddingHorizontal: 5,
              paddingVertical: 2,
              ...flexRow,
              columnGap: 5,
            }}
            onPress={() => {
              setDisable(false);
              onChange(undefined);
            }}>
            <AppText
              numberOfLines={1}
              textStyle={{flex: 1}}
              text={String(value?.file)?.substring(
                value?.file?.lastIndexOf('/') + 1,
              )}
            />
            <AppIcon
              name={'closecircle'}
              family={iconFamily.antDesign}
              size={20}
              color={colors.black}
            />
          </TouchableOpacity>
        )}
      </View>
    );

  return (
    <View style={styles.container}>
      {control ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({field: {onChange, value}}) => renderPicker(onChange, value)}
        />
      ) : (
        renderPicker(() => {})
      )}
      <ErrorText error={error} />
    </View>
  );
};

export default AppAttachmentPicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...flexCol,
  },
  inputContainer: error => ({
    width: '100%',
    height: 199,
    borderStyle: 'dashed',
    borderColor: error ? colors.errorColor : colors.inputBorderColor,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...flexCol,
  }),
});
