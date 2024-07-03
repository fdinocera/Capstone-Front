import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from 'src/app/models/auth-data.interface';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';
import { Prenotazione } from 'src/app/models/prenotazione.interface';

@Component({
	selector: 'app-prenotazioni',
	templateUrl: './prenotazioni.component.html',
	styleUrls: ['./prenotazioni.component.scss']
})
export class PrenotazioniComponent implements OnInit {

	user!: AuthData;
	prenotazioni: Prenotazione[] = [];	

	constructor(private prenotazioneSrv: PrenotazioneService) { }
	
	ngOnInit(): void {	

		//sottoscrive notifica variazioni delle prenotazioni
		this.prenotazioneSrv.nuovePrenotazioni$.subscribe(data => {
			this.prenotazioni = data;

			//ordina per data checkin discendente
			this.prenotazioni.sort(function (a, b) { return Date.parse(a.checkIn) - Date.parse(b.checkIn) })
		});


		//leggi record PRENOTAZIONI		
		this.prenotazioneSrv.getPrenotazioniFromCurrent().subscribe(data => {
			this.prenotazioni = data;		

			//ordina per data checkin discendente
			this.prenotazioni.sort(function (a, b) { return Date.parse(a.checkIn) - Date.parse(b.checkIn) })
		})
	}

	addCliente(form: NgForm) {

		this.prenotazioneSrv.postPrenotazione(form.value).subscribe(() =>
			this.prenotazioneSrv.getPrenotazioniFromCurrent().subscribe(data => {
				this.prenotazioni = data;

				//ordina per data checkin discendente
				this.prenotazioni.sort(function (a, b) { return Date.parse(a.checkIn) - Date.parse(b.checkIn) })
			})
		);
	}

	formatData(data: string) {
		return this.prenotazioneSrv.formatData(data);
	}
}