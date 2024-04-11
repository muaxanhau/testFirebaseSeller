import {ActionStoreBaseModel} from 'models';
import {create} from 'zustand';

type State = {
  token?: string;
};
type Action = ActionStoreBaseModel<{
  setAuth: (input: State) => void;
}>;
const initialState: State = {
  token: undefined,
};
export const useAuthStore = create<State & Action>(set => ({
  ...initialState,
  reset: () => set(initialState),
  setAuth: input => set(state => ({...state, ...input})),
}));
