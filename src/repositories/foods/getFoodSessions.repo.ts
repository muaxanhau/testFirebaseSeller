import {KeyService, service, useApiQuery} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';
import {RoleEnum, StatusFoodEnum} from 'models';

type GetFoodSessionsOutput = {
  id: string;
  status: StatusFoodEnum;
  food: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    role: RoleEnum;
  };
}[];
export const useGetFoodSessionsRepo = () => {
  const {data: foodSessions, ...rest} = useApiQuery<GetFoodSessionsOutput>({
    queryKey: [KeyService.GET_FOOD_SESSIONS],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetFoodSessionsOutput>(
        'foods/sessions',
      );
      return response.data;
    },
  });

  return {foodSessions, ...rest};
};
