import {KeyService, service, useApiQuery} from 'repositories/services';
import {CategoryIdModel, ItemIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllCategoriesWithItemsOutput = (CategoryIdModel & {
  items: ItemIdModel[];
})[];
export const useGetAllCategoriesWithItemsRepo = () => {
  const {data: categoriesWithItems, ...rest} =
    useApiQuery<GetAllCategoriesWithItemsOutput>({
      queryKey: [KeyService.GET_ALL_CATEGORIES_WITH_ITEMS],
      queryFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const response = await service.get<GetAllCategoriesWithItemsOutput>(
          'categories/items',
        );

        return response.data;
      },
    });

  return {categoriesWithItems, ...rest};
};
