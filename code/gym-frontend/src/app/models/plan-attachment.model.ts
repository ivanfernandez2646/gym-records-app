import { User } from './user.model';

export interface PlanAttachment {
  _id?: string;
  path?: string;
  month?: number;
  year?: number;
  type?: string;
  name?: string;
  uploadDate?: Date;
  user?: User | string;
}
