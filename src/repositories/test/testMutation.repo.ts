import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type TestMutationProps = {};
export type TestMutationOutput = null;
export const useTestMutationRepo = ({}: TestMutationProps) => {
  const {data: mutationData, ...rest} = useApiMutation<TestMutationOutput>({
    mutationKey: [KeyService.TEST_MUTATION],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<TestMutationOutput>(
        'somethings/mutation',
      );
      return response.data;
    },
  });

  return {mutationData, ...rest};
};
