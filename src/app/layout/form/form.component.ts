import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    public formData: Object = {
        components: []
    };
    public sectionList: [];
    public baseUrl: string;
    public sectionUrl: string;
    constructor(private httpClient: HttpClient) {
        this.baseUrl = 'http://localhost:3000/forms';
        this.sectionUrl = 'http://localhost:3000/sections';
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
        debugger;

        return this.httpClient.get(this.sectionUrl, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {
            this.sectionList = reponse['data'];
        });
    }
    public submitForm() {
        debugger;
        this.formObj['formData'] = this.formData;
        return this.httpClient
            .post(this.baseUrl, this.formObj, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            })
            .subscribe(reponse => {
                console.log(reponse);
            });
    }
}
