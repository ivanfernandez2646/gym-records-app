import { Exercise } from './exercise.model';
import { User } from './user.model';

export interface Mark {
  _id?: string;
  weight?: number;
  serie?: number;
  reps?: number;
  exercise?: Exercise | string;
  user?: User | string;
}
