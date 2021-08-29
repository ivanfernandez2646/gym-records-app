import { Mark } from './mark.model';

export interface Exercise {
  marks: Mark[];
  name: string;
  description: string;
  muscle: string;
}
