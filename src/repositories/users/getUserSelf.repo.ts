import {KeyService, service, useApiQuery} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';
import {UserIdModel} from 'models';

export type GetUserOutput = UserIdModel;
export const useGetUserSelfRepo = () => {
  const {data: user, ...rest} = useApiQuery<GetUserOutput>({
    queryKey: [KeyService.GET_USER_SELF],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetUserOutput>('users/self');
      return response.data;
    },
  });

  return {user, ...rest};
};
