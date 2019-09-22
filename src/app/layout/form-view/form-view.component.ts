import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckInInterface } from 'src/app/shared/interfaces/check-in_interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BaseService } from 'src/app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from 'src/app/shared-module/components';
import { catchError, retry } from 'rxjs/operators';



@Component({
    selector: 'app-form-view',
    templateUrl: './form-view.component.html',
    styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {


    public checkInObj: CheckInInterface; //object created for CheckInInterface class
    public answerData = {};
    public answerCount = 0;
    public questionCounter = 0;
    public formData: any;
    public data: any;
    public formDataId: any;
    public planSettingId: any;
    public signatureImage: string;
    public conditionalQuestions = [];
    public classList: string[] = [];
    public isDisabled: boolean;
    public assessmentData = [];
    public questionSetPerPage = [];
    public assessmentDataIndex: number = 0;
    public isChecked: boolean = false;
    public setOrder = ["radio", "selectboxes", "checkbox"];
    public totalNonEmptyAssessmentData: number = 1;
    public currentQuestionSetIndex: number = 1;
    public progressWidth = 0;
    @ViewChild('app_modal', { static: false }) app_modal: ModalComponent;
    ;

    constructor(
        public datepipe: DatePipe,
        public httpClient: HttpClient,
        public baseService: BaseService,
    ) {
        let params = localStorage.getItem('data');
        // var params = this.dummyFormdataObj;

        if (params.length > 0) {
            this.data = JSON.parse(params);
            this.checkInObj = new CheckInInterface();
            this.checkInObj.form = this.data.form;
            console.log(this.data.form);
            // this.checkInObj.form.formData = this.checkInObj.form.formData.replace(/\\"/g, '\\"');

            // let formData = JSON.parse(this.checkInObj.form.formData);
            let formData = this.checkInObj.form.formData;
            // this.checkInObj.form.formData = JSON.parse(this.checkInObj.form.formData);
            this.checkInObj.form.formData = this.checkInObj.form.formData;

            let uniqueRandomNum = [];
            let uniqueKeys = [];

            // to categarise questions with respect to tabindex
            formData.forEach(element => {
                if (uniqueKeys.indexOf(element.key) < 0) {
                    if ("tabindex" in element) {
                        if (
                            !isNaN(element.tabindex) &&
                            element.tabindex != "" &&
                            element.tabindex != null
                        ) {
                            let multiTempAssessmentData = [];
                            let multiRandom = Math.floor((Math.random() + 1) * 1001);
                            while (uniqueRandomNum.indexOf(multiRandom) >= 0) {
                                multiRandom = Math.floor((Math.random() + 1) * 1001);
                            }
                            uniqueRandomNum.push(multiRandom);
                            formData.forEach(innerElement => {
                                if ("tabindex" in innerElement) {
                                    if (
                                        element.key !== innerElement.key &&
                                        uniqueKeys.indexOf(innerElement.key) < 0 &&
                                        element.tabindex === innerElement.tabindex
                                    ) {
                                        innerElement.tabindex = multiRandom;
                                        multiTempAssessmentData.push(innerElement);
                                        uniqueKeys.push(innerElement.key);
                                        this.collectConditionalQuestion(
                                            innerElement,
                                            this.assessmentData.length
                                        );
                                        this.collectConditionalQuestion(
                                            element,
                                            this.assessmentData.length
                                        );
                                    }
                                }
                            });
                            uniqueKeys.push(element.key);
                            element.tabindex = multiRandom;
                            multiTempAssessmentData.push(element);
                            if (multiTempAssessmentData.length > 0) {
                                this.assessmentData.push(multiTempAssessmentData);
                            }
                        } else {
                            let singleTempAssessmentData = [];
                            let singleRandom = Math.floor((Math.random() + 1) * 1001);
                            while (uniqueRandomNum.indexOf(singleRandom) >= 0) {
                                singleRandom = Math.floor((Math.random() + 1) * 1001);
                            }
                            uniqueRandomNum.push(singleRandom);
                            element.tabindex = singleRandom;
                            singleTempAssessmentData.push(element);
                            this.assessmentData.push(singleTempAssessmentData);
                            this.collectConditionalQuestion(
                                element,
                                this.assessmentData.length - 1
                            );
                        }
                    } else {
                        let singleTempAssessmentData = [];
                        let singleRandom = Math.floor((Math.random() + 1) * 1001);
                        while (uniqueRandomNum.indexOf(singleRandom) >= 0) {
                            singleRandom = Math.floor((Math.random() + 1) * 1001);
                        }
                        uniqueRandomNum.push(singleRandom);
                        element.tabindex = singleRandom;
                        singleTempAssessmentData.push(element);
                        this.assessmentData.push(singleTempAssessmentData);
                        this.collectConditionalQuestion(
                            element,
                            this.assessmentData.length - 1
                        );
                    }
                }
            });

            // removing all condtional questions from assessmentData
            this.conditionalQuestions.forEach(element => {
                let indexNum = -1;
                this.assessmentData[element.indexPosition].forEach((data, index) => {
                    if (data.key == element.depandantQuestion.key) {
                        indexNum = index;
                    }
                });
                if (indexNum >= 0) {
                    this.assessmentData[element.indexPosition].splice(indexNum, 1);
                }
            });

            console.log(this.assessmentData);
            console.log(this.conditionalQuestions);

            // getting current page questions with radio buttons first
            this.questionSetPerPage = this.assessmentData[this.assessmentDataIndex];
            this.questionSetPerPage = this.sortArray(this.questionSetPerPage);

            // to check if any required field in question
            this.checkValidation();
            // calculating total questions and current question
            this.getTotalNonEmptyQuestionCount();

            if (this.checkInObj.form.answeredFormData) {
                this.answerData = JSON.parse(this.checkInObj.form.answeredFormData);
            } else {
                this.checkInObj.form.formData.forEach(element => {
                    if (element.values) {
                        this.answerData[element.key] = {};
                    }
                });
            }
            this.viewQuestionsForm();
        }
    }

    ngOnInit() {

    }

    ngOnChanges() {
        if (Object.keys(this.answerData).length >= 0)
            this.answerCount = Object.keys(this.answerData).length;
    }

    radioSelect() {

    }

    sortArray(questionSetPerPage) {
        return questionSetPerPage.sort(
            (a, b) => this.setOrder.indexOf(a.type) - this.setOrder.indexOf(b.type)
        );
    }

    // used to get all conditional questions;
    collectConditionalQuestion(element, indexPosition) {
        if ("conditional" in element) {
            if (
                "when" in element.conditional &&
                "eq" in element.conditional &&
                "show" in element.conditional
            ) {
                if (
                    element.conditional.when != null &&
                    element.conditional.when != ""
                ) {
                    let tempConditionalquestion = {
                        key: element.conditional.when,
                        value: element.conditional.eq,
                        indexPosition: indexPosition,
                        depandantQuestion: element
                    };
                    this.conditionalQuestions.push(tempConditionalquestion);
                }
            }
        }
    }

    // drawClear() {
    //     this.signaturePad.clear();
    // }

    // drawComplete(objkey) {
    //     this.signatureImage = this.signaturePad.toDataURL();
    //     this.answerData[objkey] = this.signatureImage;
    // }

    goToHome() {
        this.app_modal.open();
        // let alert = this.alertCtrl.create({
        //     title: "Follow-up",
        //     message: "Are you sure you want to exit?",
        //     buttons: [
        //         {
        //             text: "Discard",
        //             cssClass: "no",
        //             role: "No",
        //             handler: () => {
        //                 this.navCtrl.push(PatientplandashbordPage);
        //             }
        //         },
        //         {
        //             text: "Save",
        //             cssClass: "yes",
        //             handler: () => {
        //                 this.submit("HOME");
        //             }
        //         }
        //     ]
        // });
        // alert.present();
    }

    //push multiple checkbox  values result

    pushValues(event, objkey) {
        let optionValues = [];
        if (!this.answerData[objkey]) {
            optionValues = [];
        } else {
            optionValues = this.answerData[objkey];
        }
        optionValues[0] = event.target.checked;
        this.answerData[objkey] = optionValues;
        this.isChecked = this.answerData[objkey][0];
    }

    setCheckboxValue(option, objkey) {
        let arrOptions = this.answerData[objkey];
        if (
            arrOptions &&
            arrOptions.length > 0 &&
            arrOptions.indexOf(option) != -1
        ) {
            return true;
        }
    }

    identify(index, item) {
        return item.value;
    }

    viewQuestionsForm() {
        this.formDataId = this.checkInObj.form.formid;

        this.formData = this.checkInObj.form.formData;

        this.planSettingId = this.checkInObj.form.refPlanSettingId;
    }

    /**Function to go on next data after clicking next button */
    next() {
        if (
            this.assessmentDataIndex >= 0 &&
            this.assessmentDataIndex <= this.assessmentData.length - 1
        ) {
            this.assessmentDataIndex++;
            while (this.assessmentData[this.assessmentDataIndex].length == 0) {
                this.next();
            }
            this.questionSetPerPage = this.assessmentData[this.assessmentDataIndex];
            this.questionSetPerPage = this.sortArray(this.questionSetPerPage);
        }
        // to check if any required field in question
        this.checkValidation();
        // calculating total questions and current question
        this.getTotalNonEmptyQuestionCount();
        // console.log(this.answerData);
    }

    /**Function for going on previous data after clicking on previous button */
    previous() {
        if (
            this.assessmentDataIndex >= 0 &&
            this.assessmentDataIndex <= this.assessmentData.length - 1
        ) {
            this.assessmentDataIndex--;
            while (this.assessmentData[this.assessmentDataIndex].length == 0) {
                this.previous();
            }
            this.questionSetPerPage = this.assessmentData[this.assessmentDataIndex];
            this.questionSetPerPage = this.sortArray(this.questionSetPerPage);
        }
        // to check if any required field in question
        this.checkValidation();
        // calculating total questions and current question
        this.getTotalNonEmptyQuestionCount();
    }

    checkConditionalStatus(questionSet, value) {
        setTimeout(() => {
            this.conditionalQuestions.forEach((element, index) => {
                let alreadyExistIndex = -1;
                this.assessmentData[element.indexPosition].forEach(
                    (dataElement, index) => {
                        if (dataElement.key == element.depandantQuestion.key) {
                            alreadyExistIndex = index;
                        }
                    }
                );
                if (element.key == questionSet.key && element.value == value) {
                    // adding question if user has clicked radio button
                    if (alreadyExistIndex < 0) {
                        this.assessmentData[element.indexPosition].push(
                            element.depandantQuestion
                        );
                    }
                } else {
                    if (element.key == questionSet.key) {
                        // removing all condtional questions associated  with other radio options on current question
                        this.answerData[element.depandantQuestion.key] = {};
                        if (alreadyExistIndex >= 0) {
                            this.assessmentData[element.indexPosition].splice(
                                alreadyExistIndex,
                                1
                            );
                        }
                    }
                }
            });
            // to check if any required field in question
            this.checkValidation();
            // calculating total questions and current question
            this.getTotalNonEmptyQuestionCount();
        }, 100);
    }
    // to check if any required field in question
    checkValidation() {
        this.classList = [];
        this.questionSetPerPage.forEach(element => {
            if ("validate" in element) {
                if ("required" in element.validate) {
                    if (
                        (element.type == "checkbox" ||
                            element.type == "radio" ||
                            element.type == "selectboxes") &&
                        element.validate.required == true
                    ) {
                        this.classList.push(element.key);
                    }
                    setTimeout(() => {
                        this.requiredValidation(element.type, element.key);
                    }, 200);
                }
            }
        });
        if (this.classList.length == 0) {
            this.isDisabled = false;
        }
    }

    //check at least one checked in required field
    requiredValidation(inputType, className) {
        if (this.classList.length <= 1) {
            switch (inputType) {
                case "selectboxes" || "checkbox":
                    if (this.classList.indexOf(className) >= 0) {
                        this.isDisabled = !this.getCheckBoxStatus(this.classList);
                    } else {
                        if (this.classList.indexOf(className) >= 0) {
                            this.isDisabled = false;
                        }
                    }
                    break;

                case "radio":
                    if (this.classList.indexOf(className) >= 0) {
                        this.isDisabled = !this.getRadioBoxStatus(className);
                    } else {
                        if (this.classList.indexOf(className) >= 0) {
                            this.isDisabled = false;
                        }
                    }
                    break;
            }
        } else if (this.classList.length > 1) {
            if (
                inputType == "selectboxes" ||
                inputType == "checkbox" ||
                inputType == "radio"
            ) {
                if (this.classList.indexOf(className) >= 0) {
                    let checkRequiredOfQuestionSet = [];
                    let nonSelctedLength = this.classList.length;
                    while (nonSelctedLength) {
                        checkRequiredOfQuestionSet.push("false");
                        nonSelctedLength--;
                    }
                    this.classList.forEach((element, index) => {
                        if (typeof this.answerData[element] == "object") {
                            if (Object.keys(this.answerData[element]).length != 0) {
                                checkRequiredOfQuestionSet[index] = this.getCheckBoxStatus(
                                    element
                                )
                                    ? "true"
                                    : "false";
                            } else {
                                checkRequiredOfQuestionSet[index] = "false";
                            }
                        }
                        if (typeof this.answerData[element] == "string") {
                            checkRequiredOfQuestionSet[index] = this.getCheckBoxStatus(
                                element
                            )
                                ? "true"
                                : "false";
                        }
                    });
                    this.isDisabled =
                        checkRequiredOfQuestionSet.indexOf("false") >= 0 ? true : false;
                } else {
                    if (this.classList.indexOf(className) >= 0) {
                        this.isDisabled = false;
                    }
                }
            }
        }
    }

    // returns checkbox validation
    getCheckBoxStatus(className) {
        let cheBoxObj = JSON.parse(JSON.stringify(this.answerData[className]));
        let isAtLeastOnechecked = false;
        for (let key in cheBoxObj) {
            if (cheBoxObj[key]) {
                isAtLeastOnechecked = true;
            }
        }
        return isAtLeastOnechecked;
    }

    // returns radio validation
    getRadioBoxStatus(className) {
        let cheBoxObj = JSON.parse(JSON.stringify(this.answerData[className]));
        let isAtLeastOnechecked = false;

        if (cheBoxObj.length > 0) {
            isAtLeastOnechecked = true;
        }
        return isAtLeastOnechecked;
    }

    /**Function for submitting answer with input and description */
    public formObj = {};
    submit(action: string) {
        if (Object.keys(this.answerData).length >= 0) {
            for (let element in this.answerData) {
                if (element.toLocaleLowerCase().includes("datetime")) {
                    var formattedDate = this.answerData[element]
                        .replace("T", " ")
                        .replace("Z", " ");
                    this.answerData[element] = this.datepipe.transform(
                        new Date(formattedDate),
                        "yyyy-MM-dd hh:mm a"
                    );
                }
            }
        }
        this.formObj = {
            refplanSettingId: this.planSettingId,
            refassigntopatientid: this.data.refassigntopatientid,
            refformid: this.formDataId,
            refpatientid: this.data.refpatientid,
            refpackageid: this.data.refpackageid,
            answereddatetime: this.datepipe.transform(new Date(), "yyyy-MM-dd HH:mm"),
            answeredformObj: JSON.stringify(this.answerData),
            showtoday: "",
            questionformObj: JSON.stringify(this.checkInObj.form.formData),
            answeredFormStatus: action === "HOME" ? false : true,
            showtodatetime: this.data.form.showtodatetime,
            senderId: this.data.refpatientid,
            targetId: this.data.refuserid,
            senderUserType: "PATIENT",
            targetUserType: 'erxdoctor ',
            patientname: localStorage.getItem('patientUserName'),
            formname: this.data.form.formname
        };

        if (action === "HOME") {
            this.submitForm(this.formObj).subscribe(res => {
                // this.navCtrl.push(PatientplandashbordPage);
            });
        } else {
            // let alert = this.alertCtrl.create({
            //     title: "Follow-up",
            //     message: "Do you want to submit this?",
            //     buttons: [
            //         {
            //             text: "No",
            //             cssClass: "no",
            //             role: "No"
            //         },
            //         {
            //             text: "Yes",
            //             cssClass: "yes",
            //             handler: () => {
            //                 this.submitForm(this.formObj).subscribe(
            //                     res => {
            //                         // this.navCtrl.push(ThankYouPage, { data: res.json() });
            //                     },
            //                     err => {
            //                         return err;
            //                     }
            //                 );
            //             }
            //         }
            //     ]
            // });
            // alert.present();
        }
    }

    // calculating total questions and current question
    getTotalNonEmptyQuestionCount() {
        let nonEmptyAssessmentData = this.assessmentData.filter(x => {
            return x.length > 0;
        });
        this.totalNonEmptyAssessmentData = nonEmptyAssessmentData.length;
        nonEmptyAssessmentData.forEach((element, index) => {
            if (this.questionSetPerPage.length > 0) {
                let foundIndex = -1;
                element.forEach((x, indexNum) => {
                    if (x.key == this.questionSetPerPage[0].key) {
                        foundIndex = indexNum;
                    }
                });
                if (foundIndex >= 0) {
                    this.currentQuestionSetIndex = index + 1;
                }
            }
        });
        this.progressWidth =
            (this.currentQuestionSetIndex / this.totalNonEmptyAssessmentData) * 100;
    }

    getPlaceholder(questionSet) {
        if ('placeholder' in questionSet) {
            return questionSet.placeholder
        }

        return "";
    }

    setRadioValue(key, value) {
        this.answerData[key] = value;
    }

    submitForm(formObj): Observable<any> {
        let url = `${environment.apiHost}PatientPlan/createupdateAnswerdPlanforms`;

        return this.httpClient.post(url, formObj)
            .pipe(catchError(this.baseService.handleError));
    }
}
