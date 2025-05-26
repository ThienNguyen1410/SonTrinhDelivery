import {Dimensions, Platform, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('screen');

// Iphone X/XS/11 Pro
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

/**
 * Responsive by width screen. (Image Size)
 */
const scale = (size: number) => {
  return (width / DESIGN_WIDTH) * size;
};

/**
 * Responsive by height screen.
 */
const verticalScale = (size: number) => {
  return (height / DESIGN_HEIGHT) * size;
};

/**
 * @alias Responsive for padding - margin - fontSize.
 */
const moderateScale = (size: number, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

export const getSize = {
  m: moderateScale,
  s: scale,
  v: verticalScale,
  width,
  height,
};

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

export const ifIphoneX = (iphoneXStyle: any, regularStyle: any): any => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

export function getStatusBarHeight(safe?: any) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
