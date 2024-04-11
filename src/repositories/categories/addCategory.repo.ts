import {KeyService, service, useApiMutation} from 'repositories/services';
import {CategoryIdModel, CategoryModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategories.repo';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type AddCategoryProps = {onSuccess?: () => void} | void;
type AddCategoryInput = CategoryModel;
type AddCategoryOutput = CategoryIdModel;
export const useAddCategoryRepo = (props: AddCategoryProps) => {
  const queryClient = useQueryClient();

  const {mutate: addCategory, ...rest} = useApiMutation<
    AddCategoryOutput,
    AddCategoryInput
  >({
    mutationKey: [KeyService.ADD_CATEGORY],
    mutationFn: async data => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<AddCategoryOutput, AddCategoryInput>(
        'categories',
        data,
      );
      return response.data;
    },
    onSuccess: category => {
      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES, undefined],
        oldData => (oldData ? [category, ...oldData] : oldData),
      );
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_ALL_CATEGORIES, undefined],
      });

      if (typeof props === 'undefined') return;
      props.onSuccess?.();
    },
  });
  return {addCategory, ...rest};
};
