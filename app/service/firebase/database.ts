import {firebase} from '@react-native-firebase/database';

export const database = firebase
  .app()
  .database(
    'https://delivery-be444-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );
