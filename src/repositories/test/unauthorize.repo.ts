import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type UnauthorizeOutput = null;
export const useUnauthorizeRepo = () => {
  const {mutate: unauthorize, ...rest} = useApiMutation<UnauthorizeOutput>({
    mutationKey: [KeyService.TEST_UNAUTHORIZE],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<UnauthorizeOutput>(
        'tests/unauthorize',
      );
      return response.data;
    },
  });

  return {unauthorize, ...rest};
};
