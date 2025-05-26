import {SCREEN_WIDTH} from '@constant/Screen';
import {curveBasis, line} from 'd3-shape';
import {useMemo} from 'react';
import {parse} from 'react-native-redash';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type GenerateTabShapePath = (
  position: number,
  ajustHeight: number,
) => string;

const NUM_TABS = 4;
const SCALE = 0.7;
const TAB_HEIGHT = 64;

const generateTabShapePath: GenerateTabShapePath = (position, ajustHeight) => {
  const ajustWidth = SCREEN_WIDTH / NUM_TABS;
  const tabX = ajustWidth * position;
  const lineGenerator = line().curve(curveBasis);
  const tab = lineGenerator([
    [tabX - 100 * SCALE, 0],
    [tabX - (65 + 35) * SCALE, 0],
    [tabX - (50 - 10) * SCALE, -6 * SCALE],
    [tabX - (50 - 15) * SCALE, (ajustHeight - 14) * SCALE],
    [tabX + (50 - 15) * SCALE, (ajustHeight - 14) * SCALE],
    [tabX + (50 - 10) * SCALE, -6 * SCALE],
    [tabX + (65 + 35) * SCALE, 0],
    [tabX + 100 * SCALE, 0],
  ]);
  return `${tab}`;
};

const usePath = () => {
  const insets = useSafeAreaInsets();
  const tHeight = TAB_HEIGHT + insets.bottom;
  const ajustHeight = tHeight - insets.bottom;

  const containerPath = useMemo(() => {
    return `M0,0L${SCREEN_WIDTH},0L${SCREEN_WIDTH},0L${SCREEN_WIDTH},${tHeight}L0,${tHeight}L0,0`;
  }, [tHeight]);

  const curvedPaths = useMemo(() => {
    return Array.from({length: NUM_TABS}, (_, index) => {
      const tabShapePath = generateTabShapePath(index + 0.5, ajustHeight);
      return parse(`${tabShapePath}`);
    });
  }, [ajustHeight]);

  return {containerPath, curvedPaths, tHeight};
};

export default usePath;
