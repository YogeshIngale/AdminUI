import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { SpinnerService } from './shared/services/spinner.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    activeRequests: number = 0;
    constructor(private spinnerService: SpinnerService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if (this.activeRequests === 0) {
            this.spinnerService.startLoading();
        // }

        this.activeRequests++;
        return next.handle(request).pipe(
            tap(() => {
                // this.activeRequests--;
                // if (this.activeRequests === 0) {
                    this.spinnerService.stopLoading();
                // }
            })
        )
    };

    //   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: `Bearer ${this.auth.getToken()}`
    //       }
    //     });
    //     return next.handle(request);
    //   }
}
