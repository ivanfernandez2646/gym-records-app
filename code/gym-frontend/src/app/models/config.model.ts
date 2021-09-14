import { Exercise } from './exercise.model';
import { User } from './user.model';

export interface Config {
  weight?: number;
  height?: number;
  bmi?: number;
  favouriteExercise?: Exercise;
  user?: User;
}
