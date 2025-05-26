import React, {forwardRef} from 'react';
import {StyleSheet, TextInput, TextStyle} from 'react-native';
import {COLORS} from '@theme/colors';

interface PasscodeBoxProps {
  [key: string]: any;
}

const TEXT: TextStyle = {
  color: COLORS.gray,
  fontWeight: '700',
  fontSize: 16,
  borderWidth: 1,
  borderColor: 'red',
  height: '100%',
  // lineHeight: 24,
};

const passcodeBox = (
  props: PasscodeBoxProps,
  ref: React.LegacyRef<TextInput>,
) => {
  return (
    <TextInput
      ref={ref}
      style={[TEXT, styles.container]}
      textAlign="center"
      textAlignVertical="center"
      keyboardType="number-pad"
      maxLength={1}
      selectionColor={COLORS.validIcon}
      {...props}
      // caretHidden={true}
    />
  );
};

export const PasscodeBox = forwardRef(passcodeBox);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderColor: COLORS.gray,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    color: COLORS.black,
    display: 'flex',
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 44,
  },
});
