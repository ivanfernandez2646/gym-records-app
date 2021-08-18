import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { ErrorModel } from 'src/utils/error.model';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(e: MongoError, host: ArgumentsHost) {
    console.log(e);
    const resp = host.switchToHttp().getResponse();
    switch (e.code) {
      case 11000:
        resp.status(409).json(new ErrorModel(e.code, e.message, e.errmsg));
    }
  }
}
