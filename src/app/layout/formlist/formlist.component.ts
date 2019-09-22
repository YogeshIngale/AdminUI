import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonToastrService } from 'src/app/shared/services/common-toastr-service.service';

@Component({
    selector: 'app-formlist',
    templateUrl: './formlist.component.html',
    styleUrls: ['./formlist.component.scss'],
    animations: [routerTransition()]
})
export class FormListComponent implements OnInit {

    public formObj: Object = {
        sectionid: 0,
        formname: '',
        isactive: 1,
        formData: ''
    };

    public formlist: [];
    public baseUrl: string;
    public loading: boolean = false;
    constructor(private httpClient: HttpClient, private router: Router,private toastr:CommonToastrService) {
        localStorage.removeItem('form');
        this.baseUrl = `${environment.apiHost}forms`;
    }

    ngOnInit() {
        this.getForms();
    }


    public getForms() {

        return this.httpClient.get(this.baseUrl, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {
            this.formlist = reponse['data'];
        }, (error) => {
            this.toastr.showError('Server error');

        });
    }

    editForm(form) {
        localStorage.setItem('form', JSON.stringify(form));

        this.router.navigate(['/createform']);
    }
}
