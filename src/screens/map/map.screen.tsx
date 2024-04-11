import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {RestaurantIdModel, ScreenBaseModel} from 'models';
import {
  BottomSheetComponent,
  BottomSheetRefProps,
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from 'values';
import {currPosition, regionDelta, useMainStackNavigation, utils} from 'utils';
import {useGetAllRestaurantsRepo} from 'repositories';

export const MapScreen: ScreenBaseModel = () => {
  const {restaurants} = useGetAllRestaurantsRepo();
  const navigation = useMainStackNavigation();
  const ref = useRef<BottomSheetRefProps>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantIdModel>();

  const onPressMarker = (restaurant: RestaurantIdModel) => () => {
    setSelectedRestaurant(restaurant);
    ref.current?.open();
  };
  const onPressGo = () => {
    ref.current?.close();
    navigation.navigate('ListFoods', {
      restaurantId: selectedRestaurant?.id!,
      restaurantName: selectedRestaurant?.name!,
    });
  };

  return (
    <>
      <BottomSheetComponent ref={ref} paddingHorizontal>
        <TextComponent type="h2">{selectedRestaurant?.name}</TextComponent>
        <TextComponent>
          Description: {selectedRestaurant?.description}
        </TextComponent>
        <TextComponent>Rate: {selectedRestaurant?.rate}</TextComponent>
        <TextComponent>Coordinate:</TextComponent>
        <TextComponent>
          {' '}
          - Latitude: {selectedRestaurant?.latitude}
        </TextComponent>
        <TextComponent>
          {' '}
          - Longitude: {selectedRestaurant?.longitude}
        </TextComponent>

        <ButtonComponent
          title="Go"
          onPress={onPressGo}
          style={{marginTop: 'auto'}}
        />
      </BottomSheetComponent>

      <ScreenLayoutComponent title="Map" disablePaddingTop enableBottom>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              ...currPosition,
              ...regionDelta,
            }}>
            {restaurants?.map((restaurant, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: restaurant.latitude,
                  longitude: restaurant.longitude,
                }}
                title={restaurant.name}
                onPress={onPressMarker(restaurant)}
              />
            ))}

            <>
              <Marker coordinate={currPosition} pinColor={colors.primary} />
              <Circle
                center={currPosition}
                radius={500}
                fillColor={utils.opacityColor(colors.primary, 0.2)}
                strokeColor={colors.neutral}
                strokeWidth={1}
              />
            </>
          </MapView>
        </View>
      </ScreenLayoutComponent>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
