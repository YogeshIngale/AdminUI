import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { SignUpService } from '../shared/services/sign-up.service';
import { NgForm } from '@angular/forms';
import { CommonToastrService } from '../shared/services/common-toastr-service.service';
import { Router } from '@angular/router';
import { Userdata } from '../shared/interfaces/userdata';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BaseService } from '../shared/services/base.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    public isFirstStep = true;
    public isSecondStep = false;
    public isThirdStep = false;
    public userdata: Userdata = new Userdata();
    public sectionUrl: string;
    public baseUrl = environment.apiHost;
    // public emailUrl = "http://www.scienceindiafest.org/iisf-registration/members/sendMailByApi";
    public emailUrl = "http://dashboard.scienceindiafest.org/mail/testmail.php";

    @ViewChild('regform', { static: false }) public form: NgForm;
    public countriesArray = [];
    public countryIndex = 0;
    public statesArray = [];
    public countryObj = null;
    public loading = false;
    constructor(private signUpService: SignUpService, private httpClient: HttpClient, private toastr: CommonToastrService, private router: Router, private location: Location, private baseService: BaseService) { }

    ngOnInit() {

        this.signUpService.getJsonData("../../assets/json/countries.json").subscribe((res) => {
            this.countriesArray = res['countries'];
        })

        // this.emailUrl = this.location['_platformLocation']['location']['origin'] + '/' + this.emailUrl;
        this.emailUrl = this.emailUrl;
    }

    selectStep(indexNum) {
        // debugger;
        switch (indexNum) {
            case 0:
                this.isFirstStep = true;
                this.isSecondStep = false;
                this.isThirdStep = false;
                break;
            case 1:
                this.isFirstStep = false;
                this.isSecondStep = true;
                this.isThirdStep = false;
                break;
            case 2:
                this.isFirstStep = false;
                this.isSecondStep = false;
                this.isThirdStep = true;
                break;
            default:
                this.isFirstStep = true;
                this.isSecondStep = false;
                this.isThirdStep = false;
        }
    }
    // public getSections(){
    //     debugger;

    //     return this.httpClient.get('http://13.233.76.250:3000/api/sections', {
    //       headers: new HttpHeaders({
    //            'Content-Type':  'application/json',
    //          })
    //     }).subscribe((reponse)=>{
    //         debugger;
    //        let data= reponse['data'];
    //        });
    // }
    register(regform: NgForm) {

        if (!regform.valid) {
            this.toastr.showInfo('Please fill all fields');
            return;
        }
        this.userdata.isActive = 1;
        return this.httpClient.post(`${this.baseUrl}applicationusers`, this.userdata, {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        })
            .subscribe((reponse: any) => {
                let signUpResponce = reponse['data'];
                if ('CODE' in signUpResponce) {
                    if (signUpResponce['CODE'] == 'EXISTS') {
                        this.toastr.showInfo('User with same username and email already exists');
                    } else {
                        let userdata = signUpResponce;
                        let bodyText = "Thank you for registering in IISF 2019. Your Username is " + userdata.password + " and password is " + userdata.password;
                        let fullName = userdata.firstname + " " + userdata.lastname;
                        let emailTemplate = {
                            "title": "Registration Successful",
                            "mailBody": bodyText,
                            "toMail": userdata.email,
                            "fullName": fullName
                        }
                        // console.log(emailTemplate);
                        this.router.navigate(['/login']);
let pareamData="toMail="+userdata.email+"&mailBody="+bodyText +"&=title='Registration Successful'";
                        this.httpClient.post(this.emailUrl, pareamData, {
                            headers: new HttpHeaders({
                                'content-type': 'application/x-www-form-urlencoded',
                            })
                        }).subscribe(res => {
                            this.toastr.showSuccess('You are registered and username and password has been sent to your email id successfully');
                        }, (error) => {
                            // this.toastr.showError('Server error');
                        });
                    }
                } else {
                    let userdata = signUpResponce;
                    let bodyText = "Thank you for registering in IISF 2019. Your Username is " + userdata.password + " and password is " + userdata.password;
                    let fullName = userdata.firstname + " " + userdata.lastname;
                    let emailTemplate = {
                        "title": "Registration Successful",
                        "mailBody": bodyText,
                        "toMail": userdata.email,
                        "fullName": fullName
                    }
                    // console.log(emailTemplate);
                    this.router.navigate(['/login']);

                    let pareamData="toMail="+userdata.email+"&mailBody="+bodyText +"&=title='Registration Successful'";
                        this.httpClient.post(this.emailUrl, pareamData, {
                            headers: new HttpHeaders({
                                'content-type': 'application/x-www-form-urlencoded',
                            })
                        }).subscribe(res => {
                        this.toastr.showSuccess('You are registered and username and password has been sent to your email id successfully');
                    }, (error) => {
                        // this.toastr.showError('Server error');
                    });
                }

            }, (error) => {

                this.toastr.showError('Server error');
            });

        // this.signUpService.signUpUser(this.userdata).subscribe((res) => {
        //     this.toastr.showSuccess('You are registered successfully');
        //     this.router.navigate(['/login']);
        // }, (error) => {
        //     this.toastr.showError('Server error');
        // })
    }

    storeCountryId(countryObj) {
        this.userdata.country = countryObj.country;
        this.statesArray = countryObj.states;
    }
}
