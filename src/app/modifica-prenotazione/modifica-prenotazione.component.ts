import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../models/prenotazione.interface';
import { PrenotazioneService } from '../service/prenotazione.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-modifica-prenotazione',
    templateUrl: './modifica-prenotazione.component.html',
    styleUrls: ['./modifica-prenotazione.component.scss']
})
export class ModificaPrenotazioneComponent implements OnInit {

    prenotazione!: Prenotazione;

    constructor(private prenotazioniServ: PrenotazioneService, private router: ActivatedRoute,) { }

    ngOnInit(): void {
        var btnOpen = document.getElementById('btn-open');
        if (btnOpen) {
            btnOpen.click()
        }

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
        this.prenotazioniServ.deletePrenotazione(id).subscribe(data => {

            this.prenotazioniServ.getPrenotazioniFromCurrent().subscribe(data => {
                this.prenotazioniServ.setNuovePrenotazioni(data);
            })
        })
    }
}

