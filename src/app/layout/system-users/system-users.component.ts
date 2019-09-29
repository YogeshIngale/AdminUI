import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CommonToastrService } from 'src/app/shared/services/common-toastr-service.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
const URL = environment.apiHost + 'upload';
@Component({
    selector: 'app-system-users',
    templateUrl: './system-users.component.html',
    styleUrls: ['./system-users.component.scss']
})
export class SystemUsersComponent implements OnInit {
    public usersList = [];
    public isViewForm = false;
    public formData = new FormData();
    public answeredformData: any = {};
    public formlist = [];

    public uploader: FileUploader = new FileUploader({
        url: URL,
        disableMultipart: false,
        autoUpload: true,
        method: 'post',
        itemAlias: 'attachment',
        allowedFileType: ['image', 'pdf', 'compress', 'doc', 'xls', 'ppt']
    });
    public formObj: Object = {
        sectionid: 0,
        formname: '',
        isactive: 1,
        formData: '',
        isFileUpload: false
    };
    baseUrl: string;
    sectionUrl: string;
    userforms: string;

    constructor(private httpClient: HttpClient, private modalService: NgbModal, private router: Router, private toastr: CommonToastrService, private baseService: BaseService) {
        this.baseUrl = `${environment.apiHost}forms/getFormbyId`;
        this.userforms = `${environment.apiHost}userforms`;
    }

    ngOnInit() {
        this.getSystemUsers();
    }
    public getSystemUsers() {
        return this.httpClient.get(this.userforms, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse: any[]) => {
            console.log(reponse);
            this.usersList = reponse['data'];
            this.getFormbysectionid(this.usersList[0], 0);
        }, (error) => {
            //
            this.toastr.showError('Server error');
        });
    }

    public getFormbysectionid(item, usersListIndex) {
        this.isViewForm = false;
        this.httpClient.get(this.baseUrl + "?sectionid=" + item.sectionid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {

            this.formlist = reponse['data'];
            this.formObj = this.formlist[0];
            this.answeredformData = this.usersList[usersListIndex].formAnswerdData;
            setTimeout(() => {
                this.isViewForm = true;
            }, 100);
            console.log(this.formlist);
        }, (error) => {

            this.toastr.showError('Server error');
        });
    }


}
