import {database} from '../service/firebase/database';

function createUser() {
  database.ref('/user/').set();
}
