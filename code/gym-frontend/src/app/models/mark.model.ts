import { Exercise } from './exercise.model';
import { User } from './user.model';

export interface Mark {
  _id?: string;
  weight?: number;
  serie?: number;
  reps?: number;
  rir?: number;
  date?: Date;
  notes?: string;
  exercise?: Exercise | string;
  user?: User | string;
}
