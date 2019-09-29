import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonToastrService } from 'src/app/shared/services/common-toastr-service.service';
import * as jsPDF from 'jspdf'
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

const URL = environment.apiHost + 'upload';
@Component({
    selector: 'app-userform',
    templateUrl: './userform.component.html',
    styleUrls: ['./userform.component.scss'],
    animations: [routerTransition()]
})
export class UserFormComponent implements OnInit, AfterViewInit {
    public uploader: FileUploader = new FileUploader({
        url: URL,
        disableMultipart: false,
        autoUpload: true,
        method: 'post',
        itemAlias: 'attachment',
        allowedFileType: ['image', 'pdf', 'compress', 'doc', 'xls', 'ppt']
    });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    public formData = new FormData();
    public answeredformData: any = {};
    public isViewForm = false;
    public modalTitle = "Confirmation";
    public modalBody = "Are you sure you want to submit this form?";
    public requiredQuesArray = [];
    public isFormSubmitted: boolean;
    public attachment = [];
    public formObj: Object = {
        sectionid: 0,
        formname: '',
        isactive: 1,
        formData: '',
        isFileUpload: 0
    };
    public answeredformObj: Object = {
        formid: 0,
        userid: 0,
        formAnswerdData: '',
        answeredDatetime: new Date(),
        sectionid: 0,
        reviewby: 0,
        isreview: false,
        reviewnote: '',
        approvedby: 0,
        isApproved: false,
        modifieddate: new Date(),
        isActive: 1
    };

    public formlist = [];

    public baseUrl: string;
    public submissionbaseUrl: string;
    percentDone: number;
    uploadSuccess: boolean;
    constructor(private httpClient: HttpClient, private router: Router, private toastr: CommonToastrService) {
        localStorage.removeItem('form');
        this.isFormSubmitted = false;
        this.baseUrl = `${environment.apiHost}forms/getFormbyId`;
        this.submissionbaseUrl = `${environment.apiHost}userforms`;
        this.answeredformData = {
            data: {}
        };
    }

    ngOnInit() {
        if (localStorage.getItem('userformdata')) {
            this.isFormSubmitted = true;
            this.answeredformData = JSON.parse(localStorage.getItem('userformdata'));
            console.log(this.answeredformData);
        }
    }


    ngAfterViewInit() {
        this.isViewForm = false;
        this.getFormbysectionid();

    }


    public getFormbysectionid() {

        let sectionObj = JSON.parse(localStorage.getItem('section'));
        return this.httpClient.get(this.baseUrl + "?sectionid=" + sectionObj.sectionid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {

            this.formlist = reponse['data'];
            this.formObj = this.formlist[0];
            let formData = this.formObj['formData'].components;
            if ('components' in this.formObj['formData']) {
                if (formData.length > 0) {
                    formData.forEach((element, index) => {
                        let keyVal = {
                            key: '',
                            isRequired: false,
                            isdepandant: false
                        };
                        if ('validate' in element) {
                            if ('required' in element.validate) {
                                if ('conditional' in element) {
                                    if ('when' in element.conditional) {
                                        if (element.conditional.when === '') {
                                            keyVal = {
                                                key: element.key,
                                                isRequired: element.validate.required,
                                                isdepandant: false
                                            };
                                        } else {
                                            keyVal = {
                                                key: element.key,
                                                isRequired: element.validate.required,
                                                isdepandant: true
                                            };
                                        }
                                    }
                                }
                            }
                        }
                        if (keyVal.isRequired === true) {
                            this.requiredQuesArray.push(keyVal);
                        }
                    });
                }
            }
            setTimeout(() => {
                this.isViewForm = true;
            }, 100);
            console.log(this.requiredQuesArray);
            console.log(this.formObj['formData'].components);
        }, (error) => {

            this.toastr.showError('Server error');
        });
    }
    submitform() {
        let userRes = JSON.parse(localStorage.getItem('userDetails'));
        //this.userRole=userRes['usertype'];
        this.answeredformObj['formid'] = this.formObj['formid'];
        this.answeredformObj['userid'] = userRes['userid'];
        this.answeredformObj['sectionid'] = this.formObj['sectionid'];
        this.answeredformObj['formAnswerdData'] = this.answeredformData;
        this.answeredformObj['attachment'] = this.attachment;
        let ansKeysVal = this.answeredformObj['formAnswerdData'].data;
        let ansKeys = Object.keys(this.answeredformObj['formAnswerdData'].data);
        // console.log((this.answeredformObj['formAnswerdData']));
        console.log((this.answeredformData));
        let requiredElementsFields = [];
        console.log(this.requiredQuesArray);
        console.log(ansKeys);
        this.requiredQuesArray.forEach((element, index) => {
            for (let key of ansKeys) {
                if ((element.key == key) && (!element.isdepandant) && ansKeysVal[key] == '') {
                    console.log(element.key);
                    requiredElementsFields.push(false);
                }
            }
        });
        if (requiredElementsFields.length > 0) {
            this.toastr.showInfo('Plese fill required fields with star.');
            return false;
        }

        this.httpClient.post(this.submissionbaseUrl, this.answeredformObj, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {

            localStorage.removeItem('section');
            this.router.navigate(['/sections']);
            this.toastr.showSuccess('Form submited successfully');
        }, (error) => {

            this.toastr.showError('Server error');
        });
    }
    editForm(form) {
        localStorage.setItem('form', JSON.stringify(form));

        this.router.navigate(['/createform']);
    }

    elementInViewport(el) {
        let top = el.offsetTop;
        let left = el.offsetLeft;
        let width = el.offsetWidth;
        let height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top >= window.pageYOffset &&
            left >= window.pageXOffset &&
            (top + height) <= (window.pageYOffset + window.innerHeight) &&
            (left + width) <= (window.pageXOffset + window.innerWidth)
        );
    }

    downloadPdf() {
        const elementToPrint = document.getElementById('obrz'); //The html element to become a pdf
        const pdf = new jsPDF('p', 'pt', 'a3');
        pdf.addHTML(elementToPrint, () => {
            pdf.save('print_form.pdf');
        });
    }
    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    public onFileSelected(event: EventEmitter<File[]>) {
        const file: File = event[0];
        let formData = new FormData();
        formData.append('file', file);
        console.log(this.formData);
        let url = environment.apiHost + 'upload';
        this.httpClient.post(url, formData, { reportProgress: true, observe: 'events' })
            .subscribe(resEvent => {
                if (resEvent.type === HttpEventType.UploadProgress) {
                    this.percentDone = Math.round(100 * resEvent.loaded / resEvent.total);
                } else if (resEvent instanceof HttpResponse) {
                    console.log(resEvent);
                    let fileObj = {
                        filename: resEvent['body']['filename'],
                        originalname: resEvent['body']['originalname']
                    }
                    this.attachment.push(fileObj);
                    this.uploadSuccess = true;
                }
                // });
            }, (error) => {

                this.toastr.showError('Server error');
            });
    }
}
