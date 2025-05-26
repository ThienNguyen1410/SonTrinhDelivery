import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '@theme/colors';
import {getSize} from '@util/responsive';
import Block from '@component/block';

const CONTAINER: TextStyle = {
  height: 44,
  width: 44,
  backgroundColor: COLORS.white,
  borderColor: COLORS.primary,
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  color: COLORS.black,
  fontWeight: '700',
  fontSize: 16,
};

const SUCCESS_TEXT: TextStyle = {
  fontWeight: '400',
  fontSize: getSize.m(12),
  lineHeight: getSize.m(18),
  color: COLORS.validIcon,
};

const ERROR_TEXT = {
  ...SUCCESS_TEXT,
  color: COLORS.primary,
  flex: 1,
};

export interface PasscodeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  passcode: string[];
  setPasscode: React.Dispatch<React.SetStateAction<string[]>>;
  error?: boolean;
  errorMsg?: string;
  showMessage?: boolean;
}

/**
 * Describe your component here
 */
export const Passcode = function Passcode(props: PasscodeProps) {
  const {passcode, setPasscode, style, boxStyle, error = undefined} = props;

  const passcodeBoxes = Array.from({length: 6}, () =>
    React.createRef<TextInput>(),
  );

  const handleInput = React.useCallback(
    (index, text) => {
      setPasscode(prevPasscode => {
        const newPasscode = [...prevPasscode];
        newPasscode[index] = text;
        return newPasscode;
      });
    },
    [setPasscode],
  );

  const handleKeyPress = React.useCallback(
    index => e => {
      if (e.nativeEvent.key === 'Backspace') {
        if (index > 0) {
          passcodeBoxes[index - 1].current?.focus();
        }
      } else if (index < 5) {
        passcodeBoxes[index + 1].current?.focus();
        if (index + 1 === 6) {
          console.log('INDEX : ', index);
          Keyboard.dismiss();
        }
      }
    },
    [passcodeBoxes],
  );

  useEffect(() => {
    if (passcode[passcode.length - 1] != '') {
      Keyboard.dismiss(); // Dismiss the keyboard when 6 digits are entered
    }
  }, [passcode]);

  return (
    <>
      <View style={style}>
        {passcode.map((text, index) => (
          <TextInput
            ref={passcodeBoxes[index]}
            style={[
              CONTAINER,
              boxStyle,
              error && {borderColor: COLORS.primary},
              {margin: getSize.m(10)},
            ]}
            placeholder="-"
            textAlign="center"
            textAlignVertical="center"
            keyboardType="number-pad"
            maxLength={1}
            key={index}
            value={text}
            secureTextEntry={false}
            onChangeText={input => handleInput(index, input)}
            onKeyPress={handleKeyPress(index)}
            caretHidden
            onFocus={() => {
              passcodeBoxes[index].current?.focus();
            }}
            placeholderTextColor={COLORS.gray}
          />
        ))}
      </View>
    </>
  );
};
