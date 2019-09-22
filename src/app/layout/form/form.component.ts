import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonToastrService } from 'src/app/shared/services/common-toastr-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ModalComponent } from 'src/app/shared-module/components/modal/modal.component';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    public formObj: Object = {
        sectionid: 0,
        formname: '',
        isactive: 1,
        formData: ''
    };
    @ViewChild('modalPopUp',{static:false}) public modalPopUp: ModalComponent;
    public modalTitle = "Confirmation";
    public modalBody = "Are you sure you want to save this form?";

    public loading = false;

    public formData: Object = {
        components: []
    };
    public sectionList: [];
    public baseUrl: string;
    public sectionUrl: string;
    constructor(private httpClient: HttpClient, private toastr: CommonToastrService, private router: Router) {
        this.baseUrl = `${environment.apiHost}forms`;
        this.sectionUrl = `${environment.apiHost}sections`;
    }

    ngOnInit() {
        this.getSections();
        if (localStorage.getItem('form')) {
            this.formObj = JSON.parse(localStorage.getItem('form'));
            this.formData = this.formObj['formData'];
            localStorage.removeItem('form');
        }
    }
    public getSections() {

        return this.httpClient.get(this.sectionUrl, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {

            this.sectionList = reponse['data'];
        }, (error) => {

            this.toastr.showError('Server error');
        });
    }

    validateForm(formIo: NgForm) {
        if ((formIo.invalid) || (this.formObj['sectionid'] === 0) || (this.formObj['formname'] === '' || this.formData === '')) {
            this.toastr.showInfo('Form name, Form Data and Section are required');
            return false;
        }

        this.modalPopUp.open();
    }
    public submitForm() {

        this.formObj['formData'] = this.formData;

        return this.httpClient
            .post(this.baseUrl, this.formObj, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            })
            .subscribe(reponse => {
                this.toastr.showSuccess('Form saved successfully');
                this.router.navigate(['forms']);
            }, (error) => {
                this.toastr.showError('Server error');
            });
    }
}
