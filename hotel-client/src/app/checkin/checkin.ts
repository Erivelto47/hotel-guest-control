/**
 * Created by erivelto on 23/05/21
 */
import {Guest} from '../guest/guest';

export interface Checkin {
  id: string;
  checkin?: Date;
  checkout?: Date;
  guest: Guest;
  total: number;
  laststay: number;
}
