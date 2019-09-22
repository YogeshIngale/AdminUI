import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Userdata } from '../shared/interfaces/userdata';
import { SignUpService } from '../shared/services/sign-up.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public userdata: Userdata = new Userdata();
     constructor(
        public router: Router,
     private signUpService:SignUpService
    ) { }

    ngOnInit() { }

    onLoggedin() {
         let userlogin = {  "username":this.userdata.username, "password": this.userdata.password }
     //   localStorage.setItem('isLoggedin', 'true');
  //      localStorage.setItem('userDetails', JSON.stringify(userRes));
        this.signUpService.signInUser(userlogin).subscribe((userRes)=>{
            let responseObj=userRes['data'];
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('userDetails', JSON.stringify(responseObj));
        if(responseObj['usertype']==='admin')
        {
            this.router.navigate(['/dashboard']);
        }else{
this.router.navigate(['/sections']);
        }

        })


    }
}



