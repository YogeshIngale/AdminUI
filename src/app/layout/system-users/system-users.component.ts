import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CommonToastrService } from 'src/app/shared/services/common-toastr-service.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { Location } from '@angular/common';
import { ExcelService } from 'src/app/shared/services/export-excel.service';

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
    public questionKeys = {};
    public questionMapKeys = {};

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
    public baseUrl = '';
    public sectionUrl = '';
    public userformsUrl = '';
    public downloadUrl = '';
    public attachment: any[] = [];
    public userSectionId = '';
    public userswithSetion = [];
    public userSectionCode = '';
    public excelDataArray = [];

    constructor(private httpClient: HttpClient, private config: NgbModalConfig, private modalService: NgbModal, private router: Router, private location: Location, private toastr: CommonToastrService, private baseService: BaseService, private excelService: ExcelService) {
        this.sectionUrl = `${environment.apiHost}sections`;
        this.baseUrl = `${environment.apiHost}forms/getFormbyId`;
        this.userformsUrl = `${environment.apiHost}userforms`;
        this.downloadUrl = `${environment.apiHost}userforms/downloadfile`;
        config.backdrop = 'static';
        config.keyboard = false;
        this.pageUrl = this.location['_platformLocation']['location']['origin'];
        // console.log(this.pageUrl);
    }

    ngOnInit() {
        const user = JSON.parse(localStorage.getItem('userDetails'));
        this.userSectionId = user.line2;
        this.getSystemUsers();
    }


    public getSystemUsers() {
        let sectionidObj = {
            sectionid: this.userSectionId
        }
        return this.httpClient.get(this.baseService.formUrlParam(this.userformsUrl, sectionidObj), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse: any[]) => {
            this.usersList = reponse['data'];
            let userSectionId = 0;
            if (this.userSectionId !== '') {
                userSectionId = parseInt(this.userSectionId);
            }
            this.usersList = this.usersList.sort((a, b) => {
                return <any>new Date(b.answeredDatetime) - <any>new Date(a.answeredDatetime);
            });
            // console.log(this.usersList);
            this.getFormbysectionid(this.usersList[0], 0);
        }, (error) => {
            //
            this.toastr.showError('Server error');
        });
    }


    getFormbysectionid(item, usersListIndex) {
        this.isViewForm = false;
        this.attachment = item.attachment;
        this.httpClient.get(this.baseUrl + '?sectionid=' + item.sectionid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {

            this.formlist = reponse['data'];
            this.formObj = this.formlist[0];
            this.getSections();
            this.answeredformData = this.usersList[usersListIndex].formAnswerdData;

            setTimeout(() => {
                this.isViewForm = true;
            }, 100);
        }, (error) => {

            this.toastr.showError('Server error');
        });
    }

    public getSections() {
        return this.httpClient.get(this.sectionUrl, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {
            const sectionListArray: any[] = reponse['data'];
            const userSectionObj: any = sectionListArray.filter(x => (x.sectionid == this.userSectionId));
            this.userSectionCode = userSectionObj[0].sectioncode;
            let questionArray = this.formObj['formData']['components'];
            questionArray.forEach(element => {
                this.questionKeys[element.key] = '';
                this.questionMapKeys[element.key] = element.label;
            });
        }, (error) => {
            //
            this.toastr.showError('Server error');
        });
    }


    exportAsXLSX(): void {
        this.usersList.forEach((element, index) => {
            let tempData = this.questionKeys;
            const tempquestionKeys = this.questionMapKeys;
            tempData = element['formAnswerdData']['data'];
            let excelObj = {};
            excelObj['Files'] = '';
            if (element.attachment !== null && element.attachment != undefined) {
                element.attachment.forEach((fileElement, index) => {
                    if (index == 0) {
                        excelObj['Files'] = fileElement.originalname;
                    } else {
                        excelObj['Files'] += ', ' + fileElement.originalname;
                    }
                });
            }
            excelObj['Full_Name'] = element.user.firstname + ' ' + element.user.lastname;
            excelObj['User_Id'] = this.userSectionCode + '' + element['userid'];
            for (let key in tempquestionKeys) {
                if (key in tempData) {
                    excelObj[tempquestionKeys[key]] = tempData[key];
                } else {
                    excelObj[tempquestionKeys[key]] = "";
                }
            }
            this.excelDataArray.push(excelObj);
        });
        this.excelService.exportAsExcelFile(this.excelDataArray, 'users_list');
    }

    downloadfile(filename) {
        const downloadObj = {
            filename: filename
        };
        window.open(this.baseService.formUrlParam(this.downloadUrl, downloadObj), '_blank')
    }


    // open(content, filename) {
    //     const downloadObj = {
    //         filename: filename
    //     };
    //     this.fileSrc = this.baseService.formUrlParam(this.downloadUrl, downloadObj);
    //     this.fileSrc = 'http://docs.google.com/viewer?url=' + this.fileSrc;
    //     this.modalService.open(content, { size: 'lg' });
    // }

}
