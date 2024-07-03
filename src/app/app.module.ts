import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { StatisticheComponent } from './components/statistiche/statistiche.component';
import { AuthGuard } from './auth/auth.guard';
import { PrenotazioneDetailsComponent } from './components/prenotazione-details/prenotazione-details.component';
import { ModificaPrenotazioneComponent } from './modifica-prenotazione/modifica-prenotazione.component';



const routes: Route[] = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'prenotazioni',
        component: PrenotazioniComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'statistiche',
        component: StatisticheComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'prenotazioni/:id',        
        component: ModificaPrenotazioneComponent,        
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: ''
    },

];
@NgModule({
    declarations: [AppComponent,
        HomeComponent,
        NavBarComponent,
        RegisterComponent,
        LoginComponent,
        PrenotazioniComponent,
        StatisticheComponent,
        PrenotazioneDetailsComponent,
        ModificaPrenotazioneComponent,
        ],


    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },        
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
