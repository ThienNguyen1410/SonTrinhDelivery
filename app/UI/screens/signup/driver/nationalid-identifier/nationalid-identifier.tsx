import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {translate} from '../../../../components/language';
import {AuthParamList} from '../../../../../navigation/AuthStack';
import {styles} from './styles';
import {launchCamera} from 'react-native-image-picker';
import {requestCameraPermission} from '../../../../../utils/permission/RequestPermission';
import {BackIcon, CameraIcon} from '../../../../components/icons/CustomIcons';
import {useStoreActions, useStoreState} from '../../../../../state/store/store';
import {COLORS} from '../../../../../theme/colors';

export const NationalIdIdentifierScreen: FC<
  StackScreenProps<AuthParamList, 'nationalIdIdentifier'>
> = ({navigation}) => {
  const [isFullField, setFullField] = useState<boolean>(false);
  const {driver} = useStoreState(state => state.driver);
  const {setFrontNationIDCardUri, setBackNationIDCardUri} = useStoreActions(
    action => action.driver,
  );

  async function takePhotoFrontCard() {
    const isPermissionGranted = await requestCameraPermission();
    if (isPermissionGranted) {
      launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
        if (response.didCancel) {
          Alert.alert(translate('errors.cancelVerification'));
        } else if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        } else {
          if (response.assets != undefined) {
            setFrontNationIDCardUri(response.assets[0].uri);
          }
        }
      });
    }
  }

  async function takePhotoBackCard() {
    const isPermissionGranted = await requestCameraPermission();
    if (isPermissionGranted) {
      launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
        if (response.didCancel) {
          Alert.alert(translate('account'));
        } else if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        } else {
          if (response.assets != undefined) {
            setBackNationIDCardUri(response.assets[0].uri);
          }
        }
      });
    }
  }

  useEffect(() => {
    if (
      driver.verificationInfo.frontNationIDCardUri != undefined &&
      driver.verificationInfo.backNationIDCardUri != undefined
    ) {
      setFullField(true);
    }
  }, [
    driver.verificationInfo.frontNationIDCardUri,
    driver.verificationInfo.backNationIDCardUri,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <View style={styles.header}>
          <BackIcon action={() => navigation.goBack()} />
          <Text style={styles.text_header}>
            {translate('nationalIdIdentifer.nationalID')}
          </Text>
        </View>
      </View>
      <View style={styles.card_container}>
        <View style={styles.text_container}>
          <Text style={styles.text_instruction}>
            {translate('nationalIdIdentifer.instruction')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => takePhotoFrontCard()}>
          <View style={styles.center_row}>
            {driver.verificationInfo.frontNationIDCardUri != undefined ? (
              <Image
                style={styles.image}
                source={{uri: driver.verificationInfo.frontNationIDCardUri}}
              />
            ) : (
              <CameraIcon />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.text_container}>
          <Text style={styles.text_instruction}>
            {translate('nationalIdIdentifer.frontCard')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => takePhotoBackCard()}>
          <View style={styles.center_row}>
            {driver.verificationInfo.backNationIDCardUri != undefined ? (
              <Image
                style={styles.image}
                source={{uri: driver.verificationInfo.backNationIDCardUri}}
              />
            ) : (
              <CameraIcon />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.text_container}>
          <Text style={styles.text_instruction}>
            {translate('nationalIdIdentifer.backCard')}
          </Text>
        </View>
        <View style={styles.footer_button}>
          <TouchableOpacity
            style={[
              styles.button_container,
              {
                borderColor: isFullField ? COLORS.primary : COLORS.gray,
                backgroundColor: isFullField ? COLORS.primary : COLORS.white,
              },
            ]}
            disabled={!isFullField}
            onPress={() => navigation.navigate('licenseIdentifier')}>
            <Text
              style={[
                styles.text_button,
                {
                  color: isFullField ? COLORS.white : COLORS.gray,
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
