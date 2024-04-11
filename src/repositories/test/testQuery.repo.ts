import {KeyService, service, useApiQuery} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type TestQueryProps = {};
export type TestQueryOutput = null;
export const useTestQueryRepo = ({}: TestQueryProps) => {
  const {data: queryData, ...rest} = useApiQuery<TestQueryOutput>({
    queryKey: [KeyService.TEST_QUERY],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<TestQueryOutput>('somethings/query');
      return response.data;
    },
    enabled: false,
  });

  return {queryData, ...rest};
};
