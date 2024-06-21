import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SoggiornoCorrente } from '../models/soggiorno-corrente.interface';
import { Prenotazione } from '../models/prenotazione.interface';

@Injectable({
    providedIn: 'root'
})
export class SoggiornoCorrenteService {

    apiURL = environment.apiURL;
    constructor(private http: HttpClient) { }

    getSoggiornoCorrente() {
        return this.http.get<SoggiornoCorrente[]>(`${this.apiURL}prenotazioni/soggiornoCorrente`);
    }

    putSoggiornoCorrente(id: number, datiSoggCorrente: SoggiornoCorrente) {
        return this.http.put<SoggiornoCorrente>(`${this.apiURL}prenotazioni/soggiornoCorrente/${id}`, datiSoggCorrente);
    }    
}
