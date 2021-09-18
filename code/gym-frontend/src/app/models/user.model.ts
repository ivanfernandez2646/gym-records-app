import { Config } from './config.model';
import { Mark } from './mark.model';

export interface User {
  _id?: string;
  userName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  marks?: Mark[];
  config?: Config;
}
