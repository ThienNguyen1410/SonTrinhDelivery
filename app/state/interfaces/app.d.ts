import {Action} from 'easy-peasy';

export interface AppModel {
  loading: boolean;
  setLoading: Action<this, boolean>;
}
