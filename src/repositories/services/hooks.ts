import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  InfiniteData,
} from '@tanstack/react-query';

type ApiQueryProps<Output> = UseQueryOptions<Output, unknown, Output, QueryKey>;
export const useApiQuery = <Output>(props: ApiQueryProps<Output>) => {
  return useQuery<Output, unknown>(props);
};

type ApiMutationProps<Output, Input> = UseMutationOptions<
  Output,
  unknown,
  Input
>;
export const useApiMutation = <Output, Input = void>(
  props: ApiMutationProps<Output, Input>,
) => {
  return useMutation<Output, unknown, Input>(props);
};

type ApiInfiniteQueryProps<Output> = UseInfiniteQueryOptions<
  Output,
  unknown,
  InfiniteData<Output, unknown>,
  Output,
  QueryKey,
  number
>;
export const useApiInfiniteQuery = <Output>(
  props: ApiInfiniteQueryProps<Output>,
) => {
  return useInfiniteQuery<
    Output,
    unknown,
    InfiniteData<Output>,
    QueryKey,
    number
  >(props);
};
