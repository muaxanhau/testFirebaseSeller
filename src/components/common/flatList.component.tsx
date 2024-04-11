import {
  FlatListProps as FlatListRootProps,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  ComponentBaseModel,
  EnteringAnimationEnum,
  ExitingAnimationEnum,
} from 'models';
import {
  ActivityIndicatorComponent,
  TextComponent,
  ViewAnimationComponent,
} from 'components';
import {useIsLoading, useLayout, useTimeout, utils} from 'utils';
import Animated, {LinearTransition} from 'react-native-reanimated';

type FlatListProps<T> = ComponentBaseModel<
  Omit<
    FlatListRootProps<T>,
    'onRefresh' | 'onEndReached' | 'refreshing' | 'refreshControl'
  > & {
    onRefresh?: () => Promise<unknown>;
    onLoadMore?: () => void;
  }
>;
export const FlatListComponent = <T extends {}>({
  data,
  renderItem,
  horizontal,
  onRefresh,
  onLoadMore,
  ...rest
}: FlatListProps<T>) => {
  const isLoading = useIsLoading();
  const [refreshing, setRefreshing] = useState(false);
  const {onLayout, height} = useLayout();
  const refLimitTimeoutOnEndReached = useRef(true);

  const hasData = !!data?.length;
  const showFooter = !horizontal && hasData;
  const showLoadMore = !!onLoadMore && isLoading && hasData && !refreshing;

  const onRefreshData = async () => {
    if (!onRefresh) return;

    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };
  const onEndReached = () => {
    if (!onLoadMore) return;
    if (refLimitTimeoutOnEndReached.current) return;
    if (!hasData || isLoading) return;

    onLoadMore();
  };

  useTimeout(() => {
    // at first time render, even we have data but UI have not rendered yet,
    // so onEndReached would be trigger
    // prevent this case by delay time to listen this event
    refLimitTimeoutOnEndReached.current = false;
  }, 1000);

  return (
    <Animated.FlatList
      data={data}
      onLayout={onLayout}
      itemLayoutAnimation={LinearTransition.stiffness(200)}
      horizontal={horizontal}
      refreshing={refreshing}
      onRefresh={horizontal ? undefined : onRefreshData}
      scrollEventThrottle={16}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        showFooter ? (
          <View style={styles.footer}>
            {showLoadMore && <ActivityIndicatorComponent />}
          </View>
        ) : null
      }
      ListEmptyComponent={
        <View style={[styles.empty, {height}]}>
          {isLoading ? (
            <ActivityIndicatorComponent />
          ) : (
            <TextComponent>Empty...</TextComponent>
          )}
        </View>
      }
      renderItem={data => (
        <ViewAnimationComponent
          entering={EnteringAnimationEnum.FADE_IN_RIGHT}
          exiting={ExitingAnimationEnum.FADE_OUT}
          delay={data.index * 100}>
          {renderItem?.(data)}
        </ViewAnimationComponent>
      )}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: utils.hp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
