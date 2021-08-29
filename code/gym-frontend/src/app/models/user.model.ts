import { Config } from './config.model';
import { Mark } from './mark.model';

export interface User {
  userName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  marks?: Mark[];
  config?: Config;
}
