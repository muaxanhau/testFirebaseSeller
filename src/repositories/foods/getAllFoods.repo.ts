import {KeyService, service, useApiQuery} from 'repositories/services';
import {FoodIdModel, SubCategoryIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllFoodsProps = {
  restaurantId: string;
  categoryId: string;
  subCategoryId: string;
};
export type GetAllFoodsOutput = FoodIdModel[];
export const useGetAllFoodsRepo = ({
  restaurantId,
  categoryId,
  subCategoryId,
}: GetAllFoodsProps) => {
  const {data: foods, ...rest} = useApiQuery<GetAllFoodsOutput>({
    queryKey: [
      KeyService.GET_ALL_FOODS,
      restaurantId,
      categoryId,
      subCategoryId,
    ],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetAllFoodsOutput>('foods', {
        params: {
          restaurantId,
          categoryId,
          subCategoryId,
        },
      });
      return response.data;
    },
  });

  return {foods, ...rest};
};
