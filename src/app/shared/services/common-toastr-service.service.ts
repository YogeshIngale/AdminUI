import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class CommonToastrService {

    constructor(private toastr: ToastrService) { }

    showSuccess(message) {
        this.toastr.success(message, 'Success', {
            timeOut: 3000
        });
    }
    showError(message) {
        this.toastr.error(message, 'Error', {
            timeOut: 3000
        });
    }
    showWarning(message) {
        this.toastr.warning(message, 'Required', {
            timeOut: 3000
        });
    }
    showInfo(message) {
        this.toastr.info(message, 'Refer', {
            timeOut: 3000
        });
    }
}
