/**
 * Created by erivelto on 23/05/21
 */
import {Checkin} from '../checkin/checkin';

export interface Guest {
  id: string;
  name?: string;
  lastname?: string;
  document?: string;
  phone?: string;
  email?: string;
}
