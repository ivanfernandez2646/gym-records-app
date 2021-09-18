import { Mark } from './mark.model';

export interface Exercise {
  _id?: string;
  marks?: Mark[];
  name?: string;
  description?: string;
  muscle?: string;
}
