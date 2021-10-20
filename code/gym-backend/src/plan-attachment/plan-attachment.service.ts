import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Dropbox, DropboxResponse, files } from 'dropbox';
import { Model, Types } from 'mongoose';
import {
  CreatePlanAttachmentDTO,
  DownloadedFileDTO,
} from 'src/dto/plan-attachment.dto';
import {
  PlanAttachment,
  PlanAttachmentDocument,
} from 'src/schemas/plan-attachment.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class PlanAttachmentService {
  constructor(
    @InjectModel(PlanAttachment.name)
    private planAttachmentModel: Model<PlanAttachmentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService
  ) {}

  async findAllByUserAndDate(
    userId: string,
    month: number,
    year: number
  ): Promise<PlanAttachment[]> {
    return await this.planAttachmentModel.find({
      user: new Types.ObjectId(userId),
      month: month,
      year: year,
    });
  }

  async create(
    createPlanAttachmentDTO: CreatePlanAttachmentDTO,
    file: Express.Multer.File
  ): Promise<PlanAttachment> {
    try {
      const dbx: Dropbox = new Dropbox({
        accessToken: this.configService.get<string>('DROPBOX_ACCESS_TOKEN'),
      });
      const fileUploaded: DropboxResponse<files.FileMetadata> =
        await dbx.filesUpload({
          path: `/${createPlanAttachmentDTO.user}/${
            createPlanAttachmentDTO.name
          }.${file.originalname.split('.')[1]}`,
          contents: file.buffer,
        });

      const session = await this.planAttachmentModel.startSession();
      session.startTransaction();
      const newPlanAttachment: PlanAttachmentDocument =
        new this.planAttachmentModel(createPlanAttachmentDTO);
      newPlanAttachment.path = fileUploaded.result.path_display;
      const user: UserDocument = await this.userModel.findById(
        createPlanAttachmentDTO.user
      );
      newPlanAttachment.user = new Types.ObjectId(user.id);
      user.planAttachments.push(newPlanAttachment);
      const planAttachmentSaved: PlanAttachmentDocument =
        await newPlanAttachment.save();
      await user.save();

      await session.commitTransaction();
      session.endSession();
      return planAttachmentSaved;
    } catch (err) {
      throw err;
    }
  }

  //TODO: Implement transactions in download and delete file
  async downloadFile(path: string): Promise<DownloadedFileDTO> {
    try {
      const dbx: Dropbox = new Dropbox({
        accessToken: this.configService.get<string>('DROPBOX_ACCESS_TOKEN'),
      });
      const fileDownload: DropboxResponse<files.FileMetadata> =
        await dbx.filesDownload({ path: path });
      const downloadedFileDTO = new DownloadedFileDTO(
        fileDownload.result.name,
        fileDownload.result.size,
        fileDownload.result['fileBinary'],
        path.split('/')[1] //TODO: Is the id of the user. I don't check for the moment if this user is the own of the file
      );
      return downloadedFileDTO;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string, path: string): Promise<boolean> {
    try {
      const dbx: Dropbox = new Dropbox({
        accessToken: this.configService.get<string>('DROPBOX_ACCESS_TOKEN'),
      });
      await dbx.filesDeleteV2({
        path: path,
      });
      const deletePlanAttachment: PlanAttachmentDocument =
        await this.planAttachmentModel.findById(id);
      await deletePlanAttachment.deleteOne();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
