import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Prenotazione } from '../models/prenotazione.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PrenotazioneService {

	apiURL = environment.apiURL;
	private prenotazioni$ = new BehaviorSubject<Prenotazione[]>([]);
	nuovePrenotazioni$ = this.prenotazioni$.asObservable();


	constructor(private http: HttpClient) { }

	setNuovePrenotazioni(prenotazioni: Prenotazione[]){
		this.prenotazioni$.next(prenotazioni);
	}	

	getPrenotazioni() {
		return this.http.get<Prenotazione[]>(`${this.apiURL}prenotazioni`);
	}

	getPrenotazione(id: number) {
		return this.http.get<Prenotazione>(`${this.apiURL}prenotazioni/${id}`);
	}

	postPrenotazione(prenotazione: Prenotazione) {
		return this.http.post<Prenotazione>(`${this.apiURL}prenotazioni`, prenotazione);
	}

	putPrenotazione(prenotazione: Prenotazione, id: number) {
		return this.http.put<Prenotazione>(`${this.apiURL}prenotazioni/${id}`, prenotazione);
	}

	deletePrenotazione(id: number) {
		return this.http.delete<Prenotazione>(`${this.apiURL}prenotazioni/${id}`);
	}

	getPrenotazioniByYear(year: number){
		return this.http.get<Prenotazione[]>(`${this.apiURL}prenotazioni/byYear/${year}`);
	}

	getPrenotazioniFromCurrent(){
		return this.http.get<Prenotazione[]>(`${this.apiURL}prenotazioni/FromCurrent`);
	}

	getPrenotazioneCurrent(){
		return this.http.get<Prenotazione>(`${this.apiURL}prenotazioni/current`);
	}

	public formatData(data: string) {

		const giorni = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
		const d = new Date(data);
		const dd = String(d.getDate()).padStart(2, '0');
		const mm = String(d.getMonth() + 1).padStart(2, '0');
		const yy = d.getFullYear();

		return `${giorni[d.getDay()]} ${dd}/${mm}/${yy}`;
	}
}
