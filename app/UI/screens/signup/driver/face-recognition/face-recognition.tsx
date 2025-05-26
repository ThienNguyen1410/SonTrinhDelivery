import React, {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {BackIcon, CameraIcon} from '../../../../components/icons/CustomIcons';
import {AuthParamList} from '../../../../../navigation/AuthStack';
import {styles} from './styles';
import {translate} from '../../../../components/language';
import {COLORS} from '../../../../../theme/colors';
import {requestCameraPermission} from '../../../../../utils/permission/RequestPermission';
import {launchCamera} from 'react-native-image-picker';
import {useStoreActions, useStoreState} from '../../../../../state/store/store';

export const FaceRecognitionScreen: FC<
  StackScreenProps<AuthParamList, 'faceRecognition'>
> = ({navigation}) => {
  const {setAvartarUrl} = useStoreActions(action => action.driver);
  const {driver} = useStoreState(state => state.driver);

  async function takePhotoAvatar() {
    const isPermissionGranted = await requestCameraPermission();
    if (isPermissionGranted) {
      launchCamera({mediaType: 'photo', cameraType: 'front'}, response => {
        if (response.didCancel) {
          Alert.alert(translate('errors.cancelTakePhoto'));
        } else if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        } else {
          if (response.assets != undefined) {
            setAvartarUrl(response.assets[0].uri);
          }
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <View style={styles.header}>
          <BackIcon action={() => navigation.goBack()} />
          <Text style={styles.text_header}>
            {translate('face-recognition.title')}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.instruction_container}>
          <Text style={styles.text_instruction}>
            {translate('face-recognition.instruction')}
          </Text>
        </View>
        <View style={styles.text_container}>
          <TouchableOpacity
            style={styles.avatar_container}
            onPress={() => takePhotoAvatar()}>
            {driver.generalInfo.avatarUri != undefined ? (
              <Image
                style={styles.image}
                source={{uri: driver.generalInfo.avatarUri}}
              />
            ) : (
              <CameraIcon />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.footer_button}>
          <TouchableOpacity
            disabled={driver.generalInfo.avatarUri == undefined}
            style={[
              styles.button_container,
              {
                borderColor:
                  driver.generalInfo.avatarUri != undefined
                    ? COLORS.primary
                    : COLORS.gray,
                backgroundColor:
                  driver.generalInfo.avatarUri != undefined
                    ? COLORS.primary
                    : COLORS.white,
              },
            ]}
            onPress={() => navigation.navigate('driverVerifyCode')}>
            <Text
              style={[
                styles.text_button,
                {
                  color:
                    driver.generalInfo.avatarUri != undefined
                      ? COLORS.white
                      : COLORS.gray,
                },
              ]}>
              {translate('common.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
