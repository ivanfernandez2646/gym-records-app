import { Config } from './config.model';
import { Mark } from './mark.model';
import { PlanAttachment } from './plan-attachment.model';

export interface User {
  _id?: string;
  userName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  marks?: Mark[];
  planAttachments?: PlanAttachment[];
  config?: Config;
}
