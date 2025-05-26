import {parse} from 'react-native-redash';

export const getPathXCenter = (currentPath: string) => {
  const curve = parse(currentPath).curves;
  const startPoint = curve[0].to;
  const endPoint = curve[curve.length - 1].to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};

export const getPathXCenterByIndex = (tabPaths: any[], index: number) => {
  const curve = tabPaths[index].curve;
  const startPoint = curve[0].to;
  const endPoint = curve[curve.length - 1].to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};
