import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type UpdateFoodSessionOutput = null;
type UpdateFoodSessionInput = {
  foodId: string;
};
export const useUpdateFoodSessionRepo = () => {
  const {mutate: updateFoodSession, ...rest} = useApiMutation<
    UpdateFoodSessionOutput,
    UpdateFoodSessionInput
  >({
    mutationKey: [KeyService.UPDATE_FOOD_SESSION],
    mutationFn: async ({foodId}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.put<UpdateFoodSessionOutput, undefined>(
        `foods/sessions/${foodId}`,
        undefined,
      );
      return response.data;
    },
  });

  return {updateFoodSession, ...rest};
};
