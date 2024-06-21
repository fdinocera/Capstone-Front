import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register.interface';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthData } from '../models/auth-data.interface';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiURL = environment.apiURL;

    private authSub = new BehaviorSubject<AuthData | null>(null);
    user$ = this.authSub.asObservable();
    jwtHelper = new JwtHelperService();
    timeOut: any;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    register(data: Register) {
        return this.http
            .post(`${this.apiURL}auth/register`, data, { responseType: 'text' })
            .pipe(catchError(this.errors));
    }

    login(data: { email: string; password: string }) {
        console.log('data: ', data);
        return this.http.post<AuthData>(`${this.apiURL}auth/login`, data).pipe(
            tap(async (data) => {
                console.log('Auth data: ', data);
            }),
            tap((data) => {
                this.authSub.next(data);
                localStorage.setItem('user', JSON.stringify(data));
                this.autoLogout(data);
            }),
            catchError(this.errors)
        );
    }

    logout() {
        this.authSub.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    autoLogout(user: AuthData) {
        const dateExpiration = this.jwtHelper.getTokenExpirationDate(user.accessToken) as Date;
        const millisecondsExp = dateExpiration.getTime() - new Date().getTime();
        this.timeOut = setTimeout(() => {
            this.logout();
        }, millisecondsExp);
    }

    restore() {
        const userJson = localStorage.getItem('user');
        if (!userJson) {
            return;
        }
        const user: AuthData = JSON.parse(userJson);
        this.authSub.next(user);

        //controlla se la sessione è scaduta
        const dateExpiration = this.jwtHelper.getTokenExpirationDate(user.accessToken) as Date;
        const millisecondsExp = dateExpiration.getTime() - new Date().getTime();
        console.log("scadenza:" + millisecondsExp);
        if (millisecondsExp < 0) {
            this.logout();
        }
    }

    private errors(err: any) {
        console.log(err.error);
        switch (err.error) {
            case 'Email already exists':
                return throwError('The user already exists.');
                break;

            case 'Incorrect password':
                return throwError('Incorrect password');
                break;

            case 'Cannot find user':
                return throwError('User not found');
                break;

            default:
                return throwError('Request error');
                break;
        }
    }
}
