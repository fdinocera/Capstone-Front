import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';
import { Prenotazione } from 'src/app/models/prenotazione.interface';

@Component({
    selector: 'prenotazione-details',
    templateUrl: './prenotazione-details.component.html',
    styleUrls: ['./prenotazione-details.component.scss'],
})
export class PrenotazioneDetailsComponent implements OnInit {

    prenotazione!: Prenotazione;    

    constructor(
        private router: ActivatedRoute,
        private prenotazioniServ: PrenotazioneService,
    ) { }

    ngOnInit(): void {

        //set backgroun body
        document.body.classList.add('dark-background');

        this.router.params.subscribe((params) => {
            const id = +params['id'];
            this.prenotazioniServ.getPrenotazione(id).subscribe((data) => {
                this.prenotazione = data;                
            });
        });        
    }

    modificaPrenotazione(form: NgForm, id: number) {
        this.prenotazioniServ.putPrenotazione(this.prenotazione, this.prenotazione.id).subscribe(data => {
            this.prenotazioniServ.getPrenotazioniFromCurrent().subscribe(data => {
                this.prenotazioniServ.setNuovePrenotazioni(data);
            })
        })
    }

    eliminaPrenotazione(id: number) {
        this.prenotazioniServ.deletePrenotazione(id).subscribe();
    }

    formatData(data: string) {
        return this.prenotazioniServ.formatData(data);
    }    
}