import {KeyService, service, useApiQuery} from 'repositories/services';
import {CartIdModel, ItemIdModel} from 'models';
import {Prettify, utils} from 'utils';
import {devToolConfig} from 'config';

export type GetUserCartsSelfOutput = Prettify<
  Omit<CartIdModel, 'userId' | 'itemId'> & {
    item: ItemIdModel;
  }
>[];
export const useGetUserCartsSelfRepo = () => {
  const {data: carts, ...rest} = useApiQuery<GetUserCartsSelfOutput>({
    queryKey: [KeyService.GET_USER_CARTS_SELF],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetUserCartsSelfOutput>('carts');

      return response.data;
    },
  });

  return {carts, ...rest};
};
