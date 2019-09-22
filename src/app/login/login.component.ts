import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Userdata } from '../shared/interfaces/userdata';
import { SignUpService } from '../shared/services/sign-up.service';
import { CommonToastrService } from '../shared/services/common-toastr-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public userdata: Userdata = new Userdata();
    public loading = false;
    constructor(
        public router: Router,
        private signUpService: SignUpService,
        private toastr: CommonToastrService
    ) { }

    ngOnInit() { }

    onLoggedin() {
        let userlogin = { "username": this.userdata.username, "password": this.userdata.password }
        //   localStorage.setItem('isLoggedin', 'true');
        //      localStorage.setItem('userDetails', JSON.stringify(userRes));

        this.signUpService.signInUser(userlogin).subscribe((userRes) => {
            let userResObjects = Object.keys(userRes);
            if (userResObjects.length > 0) {
                let responseObj: Userdata = userRes['data'];
                this.toastr.showSuccess('Welocome ' + responseObj.firstname + ' ' + responseObj.lastname);
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('userDetails', JSON.stringify(responseObj));
                if (responseObj['usertype'] === 'admin') {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/sections']);
                }
            } else {
                this.toastr.showInfo('Please enter valid credentials');
            }
        },
            (error) => {
                this.toastr.showError('Server error');
            });


    }
}



