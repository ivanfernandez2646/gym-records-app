import { Exercise } from './exercise.model';

export interface Mark {
  height?: number;
  serie?: number;
  reps?: number;
  date?: Date;
  exercise?: Exercise;
  user?: string;
}
