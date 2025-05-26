import React, {useCallback, useImperativeHandle, useRef} from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {getSize} from '../../utils/responsive';
import {COLORS} from '../../theme/colors';

export type InputCodeHandler = {
  focus(): void;
};

type Props = {
  code: string;
  length: number;
  onChangeCode?: (code: string) => void | Promise<void>;
  onFullFill?: (code: string) => void | Promise<void>;

  passcode?: boolean;
  passcodeChar?: string;
  autoFocus?: boolean;
  oneTimeCode?: boolean;

  style?: ViewStyle;
  codeContainerStyle?: ViewStyle;
  codeContainerCaretStyle?: ViewStyle;
  codeTextStyle?: TextStyle;

  testID?: string;
  error?: boolean | undefined;
  errorMg?: string;
  successMg?: string;
};

const TextFieldCode = React.forwardRef<InputCodeHandler, Props>(
  (
    {
      code,
      length,
      onChangeCode,
      onFullFill,
      passcode,
      passcodeChar,
      autoFocus,
      oneTimeCode,
      style,
      codeContainerStyle,
      codeContainerCaretStyle,
      codeTextStyle,
      testID,
      error = false,
      errorMg,
      successMg,
    },
    ref,
  ) => {
    const textInputCode = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        textInputCode.current!.focus();
      },
    }));

    const onPressCode = useCallback(() => {
      textInputCode.current!.focus();
    }, []);

    const onChangeText = useCallback(
      (value: string) => {
        const newCode = value.replace(/[^0-9]/g, '');
        if (code === newCode) return;

        onChangeCode && onChangeCode(newCode);

        if (newCode.length === length) {
          // Keyboard.dismiss()
          InteractionManager.runAfterInteractions(() => {
            onFullFill && onFullFill(newCode);
          });
        }
      },
      [code, length, onChangeCode, onFullFill],
    );

    const extractCode = (index: number) => {
      if (code.length <= index) return '-';

      if (passcode) {
        return passcodeChar || '*';
      }

      return code.substr(index, 1);
    };
    const BORDER_ERROR = error ? {borderColor: COLORS.primary} : null;
    const renderCode = (index: number) => (
      <View
        style={
          code.length === index
            ? [styles.codeContainerCaret, codeContainerCaretStyle, BORDER_ERROR]
            : [styles.codeContainer, codeContainerStyle, BORDER_ERROR]
        }
        key={'input-code-' + index.toString()}>
        <Text style={[styles.codeTextStyle, {...codeTextStyle}]}>
          {extractCode(index)}
        </Text>
      </View>
    );

    return (
      <>
        <View style={style}>
          <TouchableOpacity
            onPress={onPressCode}
            style={{alignItems: 'stretch'}}
            activeOpacity={1}>
            {/* <Block row space={'between'}> */}
            {/*   {Array(length) */}
            {/*     .fill(0) */}
            {/*     .map((item, index) => renderCode(index))} */}
            {/* </Block> */}
          </TouchableOpacity>

          {/* {error ? ( */}
          {/*   <Block row marginLeft={0} marginTop={getSize.m(8)}> */}
          {/*     <Text style={styles.txtIncorrectVerification} preset="subBody"> */}
          {/*       {errorMg || translate('verification.IncorrectVerification')} */}
          {/*     </Text> */}
          {/*   </Block> */}
          {/* ) : ( */}
          {/*   !!successMg && ( */}
          {/*     <Block row marginLeft={0} marginTop={getSize.m(8)}> */}
          {/*       <Text style={{color: palette.SGreen40}} preset="subBody"> */}
          {/*         {successMg} */}
          {/*       </Text> */}
          {/*     </Block> */}
          {/*   ) */}
          {/* )} */}
        </View>

        <TextInput
          value={code}
          onChangeText={onChangeText}
          ref={textInputCode}
          maxLength={length}
          autoFocus={autoFocus}
          caretHidden={true}
          textContentType={oneTimeCode ? 'oneTimeCode' : undefined}
          keyboardType="number-pad"
          style={styles.textInput}
          testID={testID}
        />
      </>
    );
  },
);

const styles = StyleSheet.create({
  codeContainer: {
    alignItems: 'center',
    borderColor: COLORS.gray,
    borderRadius: 10,
    borderWidth: 1,
    height: getSize.m(50),
    justifyContent: 'center',
    margin: 5,
    width: getSize.m(50),
  },

  codeContainerCaret: {
    alignItems: 'center',
    borderColor: COLORS.gray,
    borderRadius: 10,
    borderWidth: 1,
    height: getSize.m(50),
    justifyContent: 'center',
    margin: 5,
    width: getSize.m(50),
  },
  codeTextStyle: {
    color: COLORS.gray,
    fontSize: getSize.m(16),
  },
  textInput: {fontSize: 0, height: 1, margin: 0, opacity: 0, padding: 0},
  txtIncorrectVerification: {
    color: COLORS.primary,
    flex: 1,
  },
});

TextFieldCode.defaultProps = {
  autoFocus: false,
  error: false,
};

export default TextFieldCode;
