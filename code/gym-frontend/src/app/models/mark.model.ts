import { Exercise } from './exercise.model';

export interface Mark {
  _id?: string;
  weight?: number;
  serie?: number;
  reps?: number;
  exercise?: Exercise;
  user?: string;
}
