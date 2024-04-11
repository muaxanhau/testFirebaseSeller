import {KeyService, service, useApiQuery} from 'repositories/services';
import {SubCategoryIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllSubCategoriesProps = {
  restaurantId?: string;
  categoryId?: string;
};
export type GetAllSubCategoriesOutput = SubCategoryIdModel[];
export const useGetAllSubCategoriesRepo = ({
  restaurantId,
  categoryId,
}: GetAllSubCategoriesProps) => {
  const {data: subCategories, ...rest} = useApiQuery<GetAllSubCategoriesOutput>(
    {
      queryKey: [KeyService.GET_ALL_SUB_CATEGORIES, restaurantId, categoryId],
      queryFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const response = await service.get<GetAllSubCategoriesOutput>(
          'sub-categories',
          {
            params: {
              restaurantId,
              categoryId,
            },
          },
        );
        return response.data;
      },
    },
  );

  return {subCategories, ...rest};
};
