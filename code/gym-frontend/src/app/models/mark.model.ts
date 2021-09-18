import { Exercise } from './exercise.model';

export interface Mark {
  _id?: string;
  height?: number;
  serie?: number;
  reps?: number;
  date?: Date;
  exercise?: Exercise;
  user?: string;
}
