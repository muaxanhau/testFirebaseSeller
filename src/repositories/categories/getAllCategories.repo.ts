import {KeyService, service, useApiQuery} from 'repositories/services';
import {CategoryIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllCategoriesProps = {restaurantId?: string};
export type GetAllCategoriesOutput = CategoryIdModel[];
export const useGetAllCategoriesRepo = ({
  restaurantId,
}: GetAllCategoriesProps) => {
  const {data: categories, ...rest} = useApiQuery<GetAllCategoriesOutput>({
    queryKey: [KeyService.GET_ALL_CATEGORIES, restaurantId],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetAllCategoriesOutput>('categories', {
        params: {
          restaurantId,
        },
      });
      return response.data;
    },
  });

  return {categories, ...rest};
};
