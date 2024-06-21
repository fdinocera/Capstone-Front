import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    // userReg!: Signup

    constructor(private authSrv: AuthService, private router: Router) { }

    // onSubmit(form: NgForm) {
    //   console.log(form.value);
    //   try {
    //      this.authSrv.register(form.value).subscribe();
    //     this.router.navigate(['/login'])
    //   } catch (error) {
    //     console.error(error);
    //   } 
    // }

    onSubmit(form: NgForm) {
        console.log(form.value);
        this.authSrv.register(form.value).subscribe(
            () => {
                //alert('Registration completed!');
                this.router.navigate(['/login']);
            },
            (error) => {
                alert(error);
            }
        );
    }
}
