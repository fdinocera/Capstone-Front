import { Component, OnDestroy, OnInit } from '@angular/core';
import { Prenotazione } from 'src/app/models/prenotazione.interface';
import { SoggiornoCorrente } from 'src/app/models/soggiorno-corrente.interface';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';
import { SoggiornoCorrenteService } from 'src/app/service/soggiorno-corrente.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    prenotazione!: Prenotazione;
    // soggiornoCorrente: SoggiornoCorrente[] = [];
    //soggiornoCorrente!: SoggiornoCorrente;
    isChecked = false;

    constructor(private prenotazioniService: PrenotazioneService, private soggiornoCorrenteService: SoggiornoCorrenteService) { }

    ngOnInit(): void {

        this.prenotazioniService.getPrenotazioneCurrent().subscribe(data => {
            this.prenotazione = data;
        });

        // this.soggiornoCorrenteService.getSoggiornoCorrente(2).subscribe(data2 => {
        //     this.soggiornoCorrente = data2;
        //     this.soggiornoCorrente.comunicazioneDatiPS = data2.comunicazioneDatiPS;
        //     this.soggiornoCorrente.dataInizio = data2.dataInizio;
        //     this.soggiornoCorrente.problemaOspite = data2.problemaOspite;
        //     this.soggiornoCorrente.soluzioneOspite = data2.soluzioneOspite;
        // });

        //this.soggiornoCorrenteService.deleteSoggiornoCorrente(2);

        // if (!this.soggiornoCorrente.id) {
        //     let sogg: SoggiornoCorrente = {
        //         id: 0,
        //         dataInizio: this.prenotazione.checkIn,
        //         comunicazioneDatiPS: false,
        //         riversamentoSomme: false,
        //         problemaOspite: "",
        //         soluzioneOspite: ""
        //     };

        //     this.soggiornoCorrente = sogg;
        //     this.soggiornoCorrenteService.postSoggiornoCorrente(sogg);
        // }

        //this.soggiornoCorrenteService.putSoggiornoCorrente(this.soggiornoCorrente[0].id, this.soggiornoCorrente[0]).subscribe();

        //azzera dati per nuovo soggiorno
        // if (this.soggiornoCorrente.length > 0) {
        //     if (this.soggiornoCorrente[0].dataInizio !== this.prenotazione.checkIn) {
        //         this.soggiornoCorrente[0].dataInizio = this.prenotazione.checkIn
        //         this.soggiornoCorrente[0].comunicazioneDatiPS = false;
        //         this.soggiornoCorrente[0].riversamentoSomme = false;
        //         this.soggiornoCorrente[0].problemaOspite = "";
        //         this.soggiornoCorrente[0].soluzioneOspite = "";
        //         this.soggiornoCorrenteService.putSoggiornoCorrente(this.soggiornoCorrente[0].id, this.soggiornoCorrente[0]).subscribe();
        //     }
        // }
    }

    formatData(data: string) {
        //formattazione data
        return this.prenotazioniService.formatData(data);
    }

    ngOnDestroy(): void {

        console.log(this.prenotazione)

        //salva dati soggiorno
        //this.soggiornoCorrenteService.postSoggiornoCorrente(this.soggiornoCorrente).subscribe();
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
