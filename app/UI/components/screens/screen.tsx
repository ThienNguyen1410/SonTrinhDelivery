import * as React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isNonScrolling, offsets, presets} from './screen.presets';
import {ScreenProps} from './screen.props';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const insetStyle = {paddingTop: props.unsafe ? 0 : insets.top};

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar barStyle={props.statusBar || 'dark-content'} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[preset.inner, insetStyle, style]}>{props.children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const insetStyle = {paddingTop: props.unsafe ? 0 : insets.top};

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar barStyle={props.statusBar || 'dark-content'} />
      {props.dissmissKeyboardOnTouch ?? true ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[preset.outer, backgroundStyle, insetStyle]}>
            <ScrollView
              style={[preset.outer, backgroundStyle]}
              contentContainerStyle={[preset.inner, style]}
              keyboardShouldPersistTaps={
                props.keyboardShouldPersistTaps || 'handled'
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              {props.children}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={[preset.outer, backgroundStyle, insetStyle]}>
          <ScrollView
            style={[preset.outer, backgroundStyle]}
            contentContainerStyle={[preset.inner, style]}
            keyboardShouldPersistTaps={
              props.keyboardShouldPersistTaps || 'handled'
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {props.children}
          </ScrollView>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
