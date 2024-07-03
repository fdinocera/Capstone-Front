import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private authSrv: AuthService, private router: Router) { }
   

    login(form: NgForm) {
        this.authSrv.login(form.value).subscribe(
            () => {
                this.router.navigate(['/']);
            },
            (error) => {
                alert(error);
                console.error(error);
            }
        );
    }
}
