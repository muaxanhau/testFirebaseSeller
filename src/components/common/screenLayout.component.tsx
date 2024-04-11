import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {ComponentBaseModel, ComponentWithChildBaseModel} from 'models';
import {
  Edges,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {colors, images, valueStyles} from 'values';
import {useNavigation} from '@react-navigation/native';
import {TextComponent} from './text.component';

type ScreenLayoutProps = ComponentWithChildBaseModel<{
  enableBottom?: boolean;
  paddingHorizontal?: boolean;
  disablePaddingTop?: boolean;
  gap?: boolean;
  hideTopBar?: boolean;
  scrollable?: boolean;
  title?: string;
}>;
export const ScreenLayoutComponent: FC<ScreenLayoutProps> = ({
  children,
  style,
  enableBottom = false,
  paddingHorizontal = false,
  disablePaddingTop = false,
  gap = false,
  hideTopBar = false,
  scrollable = false,
  title,
}) => {
  const edges: Edges = enableBottom ? [] : ['bottom'];
  const padding = paddingHorizontal ? valueStyles.padding2 : 0;
  const gapValue = gap ? valueStyles.gap : 0;
  const viewStyle: StyleProp<ViewStyle> = [
    {
      flex: 1,
      paddingHorizontal: padding,
      paddingTop: disablePaddingTop ? 0 : valueStyles.padding2,
    },
    style,
  ];

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <TopBarComponent hideTopBar={hideTopBar} title={title} />

      {scrollable ? (
        <ScrollView style={viewStyle} contentContainerStyle={{gap: gapValue}}>
          {children}
        </ScrollView>
      ) : (
        <View style={[viewStyle, {gap: gapValue}]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

type TopBarProps = ComponentBaseModel<{
  hideTopBar?: boolean;
  title?: string;
}>;
const TopBarComponent: FC<TopBarProps> = ({hideTopBar, title}) => {
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = useState(true);
  const insets = useSafeAreaInsets();
  const hasTitle = !!title?.length;
  const limitTitle =
    hasTitle && title.length > 20 ? title.substring(20) + '...' : title;

  useEffect(() => {
    const canGoBack = navigation.canGoBack();
    setCanGoBack(canGoBack);
  }, []);

  if (!canGoBack || hideTopBar) {
    return <View style={{height: insets.top}} />;
  }

  return (
    <View style={styles.tabBarContainer}>
      <View style={{height: insets.top}} />

      <View style={styles.tabBarWrapper}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.buttonWrapper}>
          <Image source={images.chevronLeft} style={styles.buttonBack} />
        </TouchableOpacity>

        {hasTitle && (
          <View style={styles.titleContainer}>
            <TextComponent>{limitTitle}</TextComponent>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabBarContainer: {
    backgroundColor: colors.red100,
  },
  tabBarWrapper: {
    padding: valueStyles.padding2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    zIndex: 1,
  },
  buttonBack: {
    height: valueStyles.icon,
    width: valueStyles.icon,
    tintColor: colors.black,
    resizeMode: 'cover',
  },
});
