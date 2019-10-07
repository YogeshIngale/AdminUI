import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { CommonToastrService } from 'src/app/shared/services/common-toastr-service.service';
import { BaseService } from 'src/app/shared/services/base.service';
@Component({
    selector: 'app-sections',
    templateUrl: './sections.component.html',
    styleUrls: ['./sections.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [routerTransition()]
})
export class SectionsComponent implements OnInit {

    public formObj: Object = {
        sectionid: 0,
        formname: '',
        isactive: 1,
        formData: ''
    };

    public sectionList = [];
    public sectionUrl: string;
    public userforms: string;
    public baseUrl: string;
    public shwoMessage: boolean = false;
    public delegateId = '';
    constructor(private httpClient: HttpClient, private modalService: NgbModal, private router: Router, private toastr: CommonToastrService, private baseService: BaseService) {
        localStorage.removeItem('section');
        localStorage.removeItem('userformdata');
        this.baseUrl = `${environment.apiHost}forms`;
        this.sectionUrl = `${environment.apiHost}sections`;
        this.userforms = `${environment.apiHost}userforms`;
    }

    ngOnInit() {
        this.getSections();
    }



    gotoForm(section) {
        localStorage.setItem('section', JSON.stringify(section));
        this.router.navigate(['/userform']);
    }
    editSection(content, section) {
        this.modalService.open(content, { size: 'lg' });
        // localStorage.setItem('section',JSON.stringify(section));

        // this.router.navigate(['/createform']);
    }
    addnewSection(content) {
        this.modalService.open(content, { size: 'lg' });
    }
    public getSections() {
        return this.httpClient.get(this.sectionUrl, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }).subscribe((reponse) => {
            //
            const sectionListArray = reponse['data'];
            const user = JSON.parse(localStorage.getItem('userDetails'));
            const userid = {
                'userid': user.userid
            };
            this.httpClient.get(this.baseService.formUrlParam(this.userforms, userid), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }).subscribe((res) => {
                const setionsAllowed = res['data'];
                const viewSections = [];
                if (setionsAllowed.length > 0) {
                    sectionListArray.forEach(element => {
                        setionsAllowed.forEach(sectionAllowed => {
                            if ((sectionAllowed.userid === user.userid) && (element.sectionid === sectionAllowed.sectionid)) {

                                if (viewSections != null && viewSections !== undefined) {
                                    if (viewSections.length > 0) {
                                        const findindex = viewSections.findIndex(x => (x.sectionid === element.sectionid));
                                        if (findindex === (-1)) {
                                            viewSections.push(element);
                                        }
                                    } else {
                                        // debugger;
                                        viewSections.push(element);
                                        const formData = sectionAllowed;
                                        localStorage.setItem('userformdata', JSON.stringify(formData));
                                    }
                                }

                            }
                        });
                    });
                    this.sectionList = viewSections;
                    if (setionsAllowed.length > 0) {
                        let userRes = JSON.parse(localStorage.getItem('userDetails'));
                        this.shwoMessage = true;
                        this.delegateId = this.sectionList[0]['sectioncode'] + '' + userRes['userid'];
                    }
                } else {
                    this.sectionList = sectionListArray;
                }
            });
        }, (error) => {
            //
            this.toastr.showError('Server error');
        });
    }
}
