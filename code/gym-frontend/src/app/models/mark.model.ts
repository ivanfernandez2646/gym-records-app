import { Exercise } from './exercise.model';
import { User } from './user.model';

export interface Mark {
  _id?: string;
  weight?: number;
  serie?: number;
  reps?: number;
  rir?: number;
  date?: Date;
  exercise?: Exercise | string;
  user?: User | string;
}
