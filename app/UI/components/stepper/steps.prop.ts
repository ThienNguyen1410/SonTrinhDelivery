import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export interface StepProps {
  style?: StyleProp<ViewStyle>;
  /**
   * Children componet
   *  Icons, text inside circle
   */
  children?: React.ReactNode;
  /**
   * Order Date
   * Show date of customer order
   */
  date?: string;
  /**
   * Order Time
   * Show time in of customer order
   */
  time?: string;
  /**
   * Line
   * Disable vertical line
   */

  disableLine?: boolean;
  /**
   * Circle
   * Circle color
   */
  circleColor?: string;
  /**
   * Line
   * Line color
   */
  lineColor?: string;
}
