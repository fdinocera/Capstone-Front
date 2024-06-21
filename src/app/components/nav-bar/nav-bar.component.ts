import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/models/auth-data.interface';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    user!: AuthData | null
    constructor(private authSrv: AuthService) { }
    ngOnInit(): void {
        this.authSrv.user$.subscribe((user) => {
            this.user = user;
        });
    }

    logout() {
        this.authSrv.logout();
    }
}