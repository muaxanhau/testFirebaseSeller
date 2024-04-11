import {KeyService, service, useApiQuery} from 'repositories/services';
import {RestaurantIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllRestaurantsOutput = RestaurantIdModel[];
export const useGetAllRestaurantsRepo = () => {
  const {data: restaurants, ...rest} = useApiQuery<GetAllRestaurantsOutput>({
    queryKey: [KeyService.GET_ALL_RESTAURANTS],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetAllRestaurantsOutput>(
        'restaurants',
      );
      return response.data;
    },
  });

  return {restaurants, ...rest};
};
