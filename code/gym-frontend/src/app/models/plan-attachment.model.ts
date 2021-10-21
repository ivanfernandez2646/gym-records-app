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

export interface CreatePlanAttachmentForm {
  monthYear?: string;
  type?: string;
  name?: string;
  user?: string;
  file?: File;
}

export interface CreatePlanAttachmentDTO {
  month?: number;
  year?: number;
  type?: string;
  name?: string;
  user?: string;
  file?: File;
}

export interface DownloadedFileDTO {
  fileName: string;
  size: number;
  data: Uint8Array;
  user: string;
}
