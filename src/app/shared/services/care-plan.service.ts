import { Injectable } from '@angular/core';
import { ICarePlanModel } from '../interfaces/careplans.interface';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { appApiResources } from 'src/app/app.constants';
import { catchError, retry, map } from 'rxjs/operators';


@Injectable()
export class CarePlanService {
    public planlist: ICarePlanModel[];
    public planObj: ICarePlanModel = <ICarePlanModel>{};
    public planPages: any;
    public QuestionsPages: any;
    public totalQuestions: number;
    public totalPages: number;
    public patientId: string;
    constructor(
        public httpClient: HttpClient,
        private datePipe: DatePipe,
        public baseService: BaseService,
        public care

    ) {
        //   let self = this;
        //   this.storageService.getItem("appUserId").then(function(obj) {
        //     self.patientId = obj.value;
        //   });

        this.patientId = localStorage.getItem('appUserId');
    }

    public getPatientCurrentPlans() {
        this.planlist = new Array<ICarePlanModel>();
        let queryparam = {
            currentdatetime: this.getCurrentDate(),
            patientId: this.patientId
        };
        this.getPatientPlans(queryparam).subscribe(data => {
            this.planlist = data;
        });
    }

    // getPatientPlansHistroy() {
    //   this.planlist = new Array<ICarePlanModel>();
    //   let queryparam = {
    //     currentdatetime: this.getCurrentDate(),
    //     patientId: this.patientId
    //   };
    //   this.getPatientPlansHistroy(queryparam).subscribe(data => {
    //     this.planlist = data;
    //   });
    // }

    public getPlanDetails(packageId) {
        let queryparam = {
            packageId: packageId
        };
        this.getPlanById(queryparam).subscribe(data => {
            this.planObj = data;
        });
    }

    public getPatientCurrentPlan(assigntopatientid, packageId) {
        let queryparam = {
            currentdatetime: this.getCurrentDate(),
            patientId: this.patientId,
            assigntopatientid: assigntopatientid,
            packageId: packageId
        };

        return this.getPatientPlan(queryparam).subscribe(data => {
            this.planObj = data;
            this.planObj.answeredFormData = {};
            this.planObj.formDataObj = JSON.parse(this.planObj.formData);
            this.planObj.formDataObj.forEach(element => {
                if (element.values) {
                    this.planObj.answeredFormData[element.key] = {};
                }
            });
            this.getPageQuestions(0);
        });
    }

    //getActual Questions total number
    public setActualQuestionsNumber(): any {
        this.totalQuestions = this.planObj.formDataObj.filter(function (obj: any) {
            return obj.type != "html";
        }).length;
    }

    //get total pages number
    public setQuestionsPagesNumber(): any {
        this.planObj.formDataObj.forEach((item, index) => {
            this.getPageQuestions(index);
            if (this.QuestionsPages.length > 0) {
                this.totalPages++;
            }
        });
    }

    // get set of questions
    public getPageQuestions(index) {
        this.QuestionsPages = [];
        //If tabindex set
        this.QuestionsPages = this.planObj.formDataObj.filter(function (obj: any) {
            if (obj.tabIndex) {
                return obj.tabIndex === index;
            } else {
                return false;
            }
        });

        if (this.QuestionsPages.length == 0) {
            let checkquestionViewIndex = index - 1;
            if (checkquestionViewIndex <= -1) {
                checkquestionViewIndex = 0;
            }

            this.QuestionsPages = [];
            let checkforQuestionview = this.planObj.formDataObj[
                checkquestionViewIndex
            ];
            if (checkforQuestionview) {
                if (checkforQuestionview.type == "html") {
                    index = index + 1;
                    this.QuestionsPages.push(checkforQuestionview);
                }
            }

            if (this.planObj.formDataObj[index]) {
                this.planObj.formDataObj[index];
                this.QuestionsPages.push(this.planObj.formDataObj[index]);
            }
        }
    }

    submitAnswers() {
        this.planObj.answereddatetime = this.getCurrentDate();
        this.planObj.answeredFormData = JSON.stringify(
            this.planObj.answeredFormData
        );

        return this.submitAnswersReq(this.planObj);
    }

    getCurrentDate(): string {
        return this.formatdate(new Date());
    }

    formatdate(date): string {
        return this.datePipe.transform(date, 'MM-dd-yyyy');
    }

    formUrlParam(url, data) {
        let queryString: string = '';
        for (const key in data) {

            if (data.hasOwnProperty(key)) {
                if (!queryString) {
                    queryString = `?${key}=${data[key]}`;
                } else {
                    queryString += `&${key}=${data[key]}`;
                }
            }
        }
    }

    ////-----/////


    getPatientPlans(queryparam): Observable<any> {
        let url = this.formUrlParam(
            appApiResources.getPatientPlans,
            queryparam
        );
        return this.httpClient.get(`${url}`).pipe(catchError(this.baseService.handleError));
    }

    // getPatientPlansHistroy(queryparam): Observable<Array<ICarePlanModel>> {
    //     let url = this.formUrlParam(
    //         appApiResources.getPatientPlansHistroy,
    //         queryparam
    //     );
    //     return this.httpClient.get(url).pipe(
    //         (catchError(this.baseService.handleError));
    // );
    // }

    getPatientPlan(queryparam): Observable<any> {
        let url = this.formUrlParam(
            appApiResources.getPatientPlan,
            queryparam
        );
        return this.httpClient.get(`${url}`).pipe(catchError(this.baseService.handleError));
    }

    getPlanById(queryparam): Observable<any> {
        let url = this.formUrlParam(
            appApiResources.getPlanById,
            queryparam
        );
        return this.httpClient.get(`{$url}`).pipe(catchError(this.baseService.handleError));
    }

    submitAnswersReq(formObj) {
        return this.httpClient.post(appApiResources.submitAnswers, formObj).pipe(catchError(this.baseService.handleError));
    }

}
