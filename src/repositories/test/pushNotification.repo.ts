import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type PushNotificationOutput = null;
export const usePushNotificationRepo = () => {
  const {mutate: pushNotification, ...rest} =
    useApiMutation<PushNotificationOutput>({
      mutationKey: [KeyService.TEST_PUSH_NOTIFICATION],
      mutationFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const response = await service.post<PushNotificationOutput, {}>(
          'tests/push-notification',
          {},
        );
        return response.data;
      },
    });

  return {pushNotification, ...rest};
};
