import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import {useGetUserCartsSelfRepo} from 'repositories';
import {FlatListComponent, TextComponent} from 'components';
import {dateUtil} from 'utils';
import {colors, valueStyles} from 'values';

export const ListCartsComponent: FC<ComponentBaseModel> = () => {
  const {carts, refetch} = useGetUserCartsSelfRepo();

  return (
    <FlatListComponent
      data={carts}
      keyExtractor={({id}) => id}
      contentContainerStyle={styles.container}
      onRefresh={refetch}
      renderItem={({
        item: {
          item: {name, color},
          quantity,
          createdAt,
        },
      }) => (
        <CartComponent
          name={name}
          color={color}
          quantity={quantity}
          createdAt={createdAt}
        />
      )}
    />
  );
};

type CartProps = ComponentBaseModel<{
  name: string;
  color: string;
  quantity: number;
  createdAt: Date;
}>;
const CartComponent: FC<CartProps> = ({name, color, quantity, createdAt}) => {
  return (
    <View style={styles.wrapper}>
      <TextComponent>Name: {name}</TextComponent>
      <TextComponent>Color: {color}</TextComponent>
      {/* <TextComponent>Quantity: {quantity}</TextComponent> */}
      <TextComponent>Date: {dateUtil.getDayTime(createdAt)}</TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: valueStyles.gap2,
    paddingTop: valueStyles.padding2,
    paddingHorizontal: valueStyles.padding2,
  },
  wrapper: {
    padding: valueStyles.padding3,
    backgroundColor: colors.red100,
    borderRadius: valueStyles.borderRadius2,
    borderWidth: valueStyles.line,
    borderColor: colors.red,
  },
});
