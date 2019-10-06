import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CommonToastrService } from 'src/app/shared/services/common-toastr-service.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { Location } from '@angular/common';

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
    public fileSrc = '';
    public pageUrl = '';

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
    baseUrl = '';
    sectionUrl = '';
    userforms = '';
    attachment: any[] = [];
    userSectionId = '';
    userswithSetion = [];

    constructor(private httpClient: HttpClient, private config: NgbModalConfig, private modalService: NgbModal, private router: Router, private location: Location, private toastr: CommonToastrService, private baseService: BaseService) {
        this.baseUrl = `${environment.apiHost}forms/getFormbyId`;
        this.userforms = `${environment.apiHost}userforms`;
        config.backdrop = 'static';
        config.keyboard = false;
        this.pageUrl = this.location['_platformLocation']['location']['origin'];
        console.log(this.pageUrl);
    }

    ngOnInit() {
        const user = JSON.parse(localStorage.getItem('userDetails'));
        this.userSectionId = user.line2;
        this.getSystemUsers();
    }

    open(content) {
        this.modalService.open(content, { size: 'lg' });
    }

    public getSystemUsers() {
        return this.httpClient.get(this.userforms, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse: any[]) => {
            this.usersList = reponse['data'];
            let userSectionId = 0;
            if (this.userSectionId !== '') {
                userSectionId = parseInt(this.userSectionId);
            }
            if (userSectionId !== 0) {
                this.usersList = this.usersList.filter(x => {
                    return x.sectionid === userSectionId;
                });
            }

            console.log(this.usersList);
            this.usersList = this.usersList.sort((a, b) => {
                return <any>new Date(b.answeredDatetime) - <any>new Date(a.answeredDatetime);
            });

            this.getFormbysectionid(this.usersList[0], 0);
        }, (error) => {
            //
            this.toastr.showError('Server error');
        });
    }


    public getFormbysectionid(item, usersListIndex) {
        this.isViewForm = false;
        this.attachment = item.attachment;
        this.httpClient.get(this.baseUrl + '?sectionid=' + item.sectionid, {
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
        }, (error) => {

            this.toastr.showError('Server error');
        });
    }


}
