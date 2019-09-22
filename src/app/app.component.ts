import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loading: boolean = false;
    loadingSubscription: Subscription;


    constructor(public spinnerService: SpinnerService) {
    }

    ngOnInit() {
        this.loadingSubscription = this.spinnerService.loadingStatus.subscribe((value) => {
            this.loading = value;
        });
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }
}
