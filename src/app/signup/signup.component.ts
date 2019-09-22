import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { SignUpService } from '../shared/services/sign-up.service';
import { NgForm } from '@angular/forms';
import { CommonToastrService } from '../shared/services/common-toastr-service.service';
import { Router } from '@angular/router';
import { Userdata } from '../shared/interfaces/userdata';
import { HttpHeaders,HttpClient  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    public baseUrl:string;

    @ViewChild('regform', { static: false }) public form: NgForm;
    public countriesArray = [];
    public countryIndex = 0;
    public statesArray = [];
    public countryObj = null;

    constructor(private signUpService: SignUpService, private httpClient :HttpClient, private toastr: CommonToastrService, private router: Router) { }

    ngOnInit() {
        this.signUpService.getJsonData().subscribe((res) => {
            this.countriesArray = res['countries'];
        })
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
        return this.httpClient.post(this.baseUrl,this.userdata,{
            headers: new HttpHeaders({
                'content-type':  'application/json',
              })
        })
          .subscribe((reponse)=>{
            this.toastr.showSuccess('You are registered successfully');
            this.router.navigate(['/login']);
             });

        // this.signUpService.signUpUser(this.userdata).subscribe((res) => {
        //     this.toastr.showSuccess('You are registered successfully');
        //     this.router.navigate(['/login']);
        // }, (error) => {
        //     this.toastr.showError('Server Error');
        // })
    }

    storeCountryId(countryObj) {
        this.userdata.country = countryObj.country;
        this.statesArray = countryObj.states;
    }
}
