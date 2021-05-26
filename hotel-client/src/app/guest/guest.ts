/**
 * Created by erivelto on 23/05/21
 */
export interface Guest {
  id: string;
  name: string;
  lastname: string;
  document: string;
  phone: string;
  image: string;
  email: string;
  checking: Date;
  checkout: Date;
}
