import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SoggiornoCorrente } from '../models/soggiorno-corrente.interface';

@Injectable({
    providedIn: 'root'
})
export class SoggiornoCorrenteService {

    apiURL = environment.apiURL;
    constructor(private http: HttpClient) { }

    getSoggiornoCorrente(id: number) {
        return this.http.get<SoggiornoCorrente>(`${this.apiURL}prenotazioni/soggiornoCorrente/${id}`);        
    }

    postSoggiornoCorrente(soggiornoCorrente: SoggiornoCorrente) {
        return this.http.post<SoggiornoCorrente>(`${this.apiURL}prenotazioni/soggiornoCorrente`, soggiornoCorrente);

    }

    putSoggiornoCorrente(id: number, datiSoggCorrente: SoggiornoCorrente) {
        return this.http.put<SoggiornoCorrente>(`${this.apiURL}prenotazioni/soggiornoCorrente/${id}`, datiSoggCorrente);
    }

    deleteSoggiornoCorrente(id: number) {
        return this.http.delete<SoggiornoCorrente>(`${this.apiURL}prenotazioni/soggiornoCorrente/${id}`);
    }
}
