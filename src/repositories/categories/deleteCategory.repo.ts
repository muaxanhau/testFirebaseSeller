import {KeyService, service, useApiMutation} from 'repositories/services';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategories.repo';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type DeleteCategoryInput = {id: string};
type DeleteCategoryOutput = null;
export const useDeleteCategoryRepo = () => {
  const queryClient = useQueryClient();

  const {mutate: deleteCategory, ...rest} = useApiMutation<
    DeleteCategoryOutput,
    DeleteCategoryInput
  >({
    mutationKey: [KeyService.DELETE_CATEGORY],
    mutationFn: async ({id}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.delete(`categories/${id}`);
      return response.data;
    },
    onMutate: ({id}) => {
      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES, undefined],
        oldData => {
          const deletedCategories = oldData?.filter(
            category => category.id !== id,
          );
          return deletedCategories;
        },
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_ALL_CATEGORIES, undefined],
      });
    },
  });
  return {deleteCategory, ...rest};
};
