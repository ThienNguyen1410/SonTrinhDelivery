import React, {FC, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {CollapseProps} from './collapse.props';

export const CollapsableContainer = (props: CollapseProps) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = props.expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [props.expanded]);

  return (
    <Animated.View style={[collapsableStyle, {overflow: 'hidden'}]}>
      <View style={{position: 'absolute'}} onLayout={onLayout}>
        {props.children}
      </View>
    </Animated.View>
  );
};
