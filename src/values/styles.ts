import {Dimensions, TextStyle, ViewStyle} from 'react-native';
import {colors} from './colors';

const {width, height} = Dimensions.get('window');

export const valueStyles = {
  width,
  height,
  padding: 24,
  padding2: 16,
  padding3: 8,
  margin: 24,
  margin2: 16,
  margin3: 8,
  borderRadius2: 10,
  borderRadius: 24,
  gap: 16,
  gap2: 9,
  line: 0.2,
  line2: 0.5,
  line3: 1,
  icon: 24,
};

// rule for lineHeight: lineHeight = fontSize * 1.5
const textColor = colors.neutral900;
const textDefault: TextStyle = {
  fontSize: 17,
  lineHeight: 17 * 1.5,
  color: textColor,
};
const textH1: TextStyle = {
  fontSize: 35,
  lineHeight: 35 * 1.5,
  color: textColor,
};
const textH2: TextStyle = {
  fontSize: 27,
  lineHeight: 27 * 1.5,
  color: textColor,
};
const textH3: TextStyle = {
  fontSize: 22,
  lineHeight: 22 * 1.5,
  color: textColor,
};
const rowCenter: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const columnCenter: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const shadow: ViewStyle = {
  shadowColor: colors.neutral900,
  shadowOffset: {
    width: 1,
    height: 3,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 6,
};
const shadowTop: ViewStyle = {
  shadowColor: colors.neutral900,
  shadowOffset: {
    width: 0,
    height: -4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 6,
};
const fullParent: ViewStyle = {
  width: '100%',
  height: '100%',
};
const modalContainer: ViewStyle = {
  backgroundColor: colors.white,
  borderRadius: valueStyles.borderRadius2,
  padding: valueStyles.padding,
  width: valueStyles.width - valueStyles.padding2 * 2,
  gap: valueStyles.gap,
};

export const commonStyles = {
  textDefault,
  textH1,
  textH2,
  textH3,
  rowCenter,
  columnCenter,
  shadow,
  shadowTop,
  fullParent,
  modalContainer,
};
