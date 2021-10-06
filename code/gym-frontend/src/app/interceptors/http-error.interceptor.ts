import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          if (error.status === 400) {
            error.error.exception.response.message.forEach((m: string) => {
              errorMessage += m + '\n';
            });
          }
        }

        this.loaderService.hideLoader();
        this.toastService.showToast(errorMessage, 'bottom', 'warning');
        return throwError(() => error);
      })
    );
  }
}
