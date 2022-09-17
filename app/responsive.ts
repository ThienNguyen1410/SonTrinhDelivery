import {Dimensions} from 'react-native';

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
