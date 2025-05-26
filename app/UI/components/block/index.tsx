import React from 'react';
import {Animated, View} from 'react-native';
import {
  handlePadding,
  handleMargin,
  handleSquare,
  handleRound,
  passedStyle,
} from '@util/shared';
import {IBlock} from './types';
import styles from './styles';
import {getSize} from '@util/responsive';
import {isNumber} from 'lodash';
import {COLORS} from '@theme/colors';

const Block: React.FC<IBlock> = ({
  flex,
  flexShrink,
  flexGrow,
  row,
  column,
  shadow,
  backgroundColor,
  space,
  padding,
  margin,
  alignStart,
  alignCenter,
  alignEnd,
  wrap,
  justifyCenter,
  justifyEnd,
  justifyStart,
  justifySpaceBetween,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  radius,
  height,
  width,
  square,
  round,
  borderWidth,
  relative,
  absolute,
  top,
  left,
  right,
  bottom,
  borderColor,
  animated,
  children,
  overflow,
  alignSelf,
  style,
  opacity,
  borderTopLeftRadius,
  borderTopRightRadius,
  ...props
}) => {
  const blockStyles = [
    flex && styles.block,
    flexShrink && styles.flexShrink,
    flexGrow && styles.flexGrow,
    !flex && {flex: 0},
    width && {width: isNumber(width) ? getSize.s(width) : width},
    height && {height: isNumber(height) ? getSize.s(height) : height},
    row && styles.row,
    column && styles.column,
    shadow && {
      ...styles.shadow,
      shadowColor: COLORS.primary,
    },
    wrap && {flexWrap: 'wrap'},
    backgroundColor && {
      backgroundColor: (COLORS as any)[backgroundColor],
    },
    backgroundColor && !(COLORS as any)[backgroundColor] && {backgroundColor},
    padding && {...handlePadding(getSize.m(padding))},
    margin && {...handleMargin(getSize.m(margin))},
    alignStart && styles.alignStart,
    alignCenter && styles.alignCenter,
    alignEnd && styles.alignEnd,
    justifyCenter && styles.justifyCenter,
    justifyStart && styles.justifyStart,
    justifyEnd && styles.justifyEnd,
    justifySpaceBetween && styles.justifySpaceBetween,
    space && {justifyContent: `space-${space}`},
    paddingTop && {paddingTop: getSize.m(paddingTop)},
    paddingRight && {paddingRight: getSize.m(paddingRight)},
    paddingBottom && {paddingBottom: getSize.m(paddingBottom)},
    paddingLeft && {paddingLeft: getSize.m(paddingLeft)},
    marginBottom && {marginBottom: getSize.m(marginBottom)},
    marginTop && {marginTop: getSize.m(marginTop)},
    marginRight && {marginRight: getSize.m(marginRight)},
    marginLeft && {marginLeft: getSize.m(marginLeft)},
    paddingHorizontal && {paddingHorizontal: getSize.m(paddingHorizontal)},
    paddingVertical && {paddingVertical: getSize.m(paddingVertical)},
    marginHorizontal && {marginHorizontal: getSize.m(marginHorizontal)},
    marginVertical && {marginVertical: getSize.m(marginVertical)},
    radius && {borderRadius: getSize.s(radius)},
    borderTopLeftRadius && {
      borderTopLeftRadius: getSize.s(borderTopLeftRadius),
    },
    borderTopRightRadius && {
      borderTopRightRadius: getSize.s(borderTopRightRadius),
    },
    borderWidth && {borderWidth: borderWidth},
    square && {...handleSquare(getSize.s(square))},
    round && {...handleRound(getSize.s(round))},
    borderColor && {
      borderColor: COLORS.gray || COLORS.primary,
    },
    relative && {position: 'relative'},
    absolute && {position: 'absolute'},
    isNumber(top) && {top: getSize.v(top)},
    isNumber(left) && {left: getSize.s(left)},
    isNumber(right) && {right: getSize.s(right)},
    isNumber(bottom) && {bottom: getSize.v(bottom)},
    isNumber(opacity) && {opacity: opacity},
    overflow && {overflow},
    alignSelf && {alignSelf},
    {...passedStyle(style)},
  ];

  if (animated) {
    return (
      <Animated.View style={blockStyles} {...props}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

export default Block;
