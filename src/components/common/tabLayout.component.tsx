import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import {ComponentBaseModel, ComponentWithChildBaseModel} from 'models';
import {TextComponent} from './text.component';
import {colors, valueStyles} from 'values';
import {useLayout} from 'utils';
import {FlatListComponent} from './flatList.component';

type RendererType = 'all' | 'focused';
type TabLayoutProps = ComponentBaseModel<{
  titles: string[];
  contents: ReactNode[];
  rendererType?: RendererType;
}>;
export const TabLayoutComponent: FC<TabLayoutProps> = ({
  titles,
  contents,
  rendererType = 'focused',
}) => {
  const [index, setIndex] = useState(0);
  const {onLayout, width} = useLayout();
  const refContent = useRef<FlatList>(null);

  const onPress = (index: number) => () => {
    setIndex(index);
    refContent.current?.scrollToOffset({offset: width * index, animated: true});
  };
  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(index);
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View>
        <FlatListComponent
          style={styles.titleContainer}
          contentContainerStyle={styles.titleWrapper}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          data={titles}
          renderItem={({item, index: indexSelf}) => (
            <TouchableOpacity
              key={indexSelf}
              style={[
                styles.title,
                {
                  backgroundColor:
                    index === indexSelf
                      ? colors.primary100
                      : colors.transparent,
                },
              ]}
              onPress={onPress(indexSelf)}>
              <TextComponent>{item}</TextComponent>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        ref={refContent}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        pagingEnabled
        decelerationRate="fast"
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        scrollEventThrottle={32}
        onMomentumScrollEnd={onMomentumScrollEnd}
        data={contents}
        renderItem={({item, index: selfIndex}) => (
          <ContentComponent
            key={selfIndex}
            width={width}
            selfIndex={selfIndex}
            currIndex={index}
            children={item}
            rendererType={rendererType}
          />
        )}
      />
    </View>
  );
};

type ContentProps = ComponentWithChildBaseModel<{
  width: number;
  selfIndex: number;
  currIndex: number;
  rendererType: RendererType;
}>;
const ContentComponent: FC<ContentProps> = ({
  children,
  width,
  selfIndex,
  currIndex,
  rendererType,
}) => {
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    if (rendererType === 'all') return;
    if (firstRender) return;

    selfIndex === currIndex && setFirstRender(true);
  }, [selfIndex, currIndex]);

  return (
    <View style={{width}}>
      {(firstRender || rendererType === 'all') && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: valueStyles.padding2,
  },
  titleWrapper: {
    gap: valueStyles.gap,
  },
  title: {
    paddingHorizontal: valueStyles.padding2,
    paddingBottom: valueStyles.padding3,
  },
});
