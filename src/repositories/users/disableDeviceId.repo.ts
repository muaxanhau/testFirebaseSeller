import {KeyService, service, useApiMutation} from 'repositories/services';
import {usePushNotification, utils} from 'utils';
import {devToolConfig} from 'config';

export type DisableDeviceIdOutput = null;
export const useDisableDeviceIdRepo = () => {
  const {getDeviceId} = usePushNotification();

  const {mutate: disableDeviceId, ...rest} =
    useApiMutation<DisableDeviceIdOutput>({
      mutationKey: [KeyService.DISABLE_DEVICE_ID],
      mutationFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const deviceId = await getDeviceId();
        !!deviceId?.length &&
          (await service.delete<DisableDeviceIdOutput>(
            `users/device-id/${deviceId}`,
          ));

        return null;
      },
    });

  return {disableDeviceId, ...rest};
};
