import { Component, OnDestroy, OnInit } from '@angular/core';
import { Prenotazione } from 'src/app/models/prenotazione.interface';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    prenotazione!: Prenotazione;
    isChecked = false;

    constructor(private prenotazioniService: PrenotazioneService) { }

    ngOnInit(): void {
        this.prenotazioniService.getPrenotazioneCurrent().subscribe(data => {
            this.prenotazione = data;
        });
    }

    formatData(data: string) {
        //formattazione data
        return this.prenotazioniService.formatData(data);
    }

    ngOnDestroy(): void {

        //salva dati soggiorno corrente
        this.prenotazioniService.putPrenotazione(this.prenotazione, this.prenotazione.id).subscribe();
    }

    scadenzaComunicazioneDatiPS() {
        let data = new Date(this.prenotazione.checkIn);
        data.setDate(data.getDate() + 1);

        const giorni = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
        const dd = String(data.getDate()).padStart(2, '0');
        const mm = String(data.getMonth() + 1).padStart(2, '0');
        return `${giorni[data.getDay()]} ${dd}/${mm} 23:59`;
    }
}