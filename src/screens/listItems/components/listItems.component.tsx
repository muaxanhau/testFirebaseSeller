import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import {useAddCartRepo, useGetItemsByCategoryIdRepo} from 'repositories';
import {
  ActivityIndicatorComponent,
  FlatListComponent,
  TextComponent,
} from 'components';
import {colors, valueStyles} from 'values';

type ListItemsProps = ComponentBaseModel<{id: string}>;
export const ListItemsComponent: FC<ListItemsProps> = ({id}) => {
  const {items, refetch, fetchNextPage} = useGetItemsByCategoryIdRepo({id});

  return (
    <FlatListComponent
      data={items}
      contentContainerStyle={styles.container}
      keyExtractor={({id}) => id}
      onRefresh={refetch}
      renderItem={({item}) => (
        <ItemComponent id={item.id} name={item.name} color={item.color} />
      )}
      onLoadMore={() => fetchNextPage()}
    />
  );
};

type ItemProps = ComponentBaseModel<{
  id: string;
  name: string;
  color: string;
}>;
const ItemComponent: FC<ItemProps> = ({id, name, color}) => {
  const {addCart, isPending} = useAddCartRepo({
    onSuccess: () => Alert.alert('Alert', 'Item is added to your cart'),
  });

  const onPress = () => addCart({itemId: id, quantity: 1});

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <TextComponent style={styles.itemTitle}>{name}</TextComponent>
        <TextComponent>({color})</TextComponent>
        {isPending && <ActivityIndicatorComponent />}
      </View>
    </TouchableOpacity>
  );
};

const {padding2} = valueStyles;
const styles = StyleSheet.create({
  container: {
    gap: valueStyles.gap,
    padding: padding2,
  },
  itemContainer: {
    backgroundColor: colors.green100,
    borderRadius: valueStyles.borderRadius2,
    borderColor: colors.green,
    borderWidth: valueStyles.line2,
    aspectRatio: 3 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    gap: valueStyles.gap,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
});
