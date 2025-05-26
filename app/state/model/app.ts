import {action} from 'easy-peasy';
import {AppModel} from '../@types/app';

export const AppStore: AppModel = {
  loading: false,
  setLoading: action((state, loadingState) => {
    state.loading = loadingState;
  }),
};
