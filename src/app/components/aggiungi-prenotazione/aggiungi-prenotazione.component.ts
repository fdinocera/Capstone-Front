import { Component } from '@angular/core';
import { Prenotazione } from 'src/app/models/prenotazione.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
    selector: 'app-aggiungi-prenotazione',
    templateUrl: './aggiungi-prenotazione.component.html',
    styleUrls: ['./aggiungi-prenotazione.component.scss']
})
export class AggiungiPrenotazioneComponent {

    prenotazione!: Prenotazione;

    constructor(
        //private activatedRoute: ActivatedRoute,
        private prenotazioniServ: PrenotazioneService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        // this.activatedRoute.params.subscribe((params) => {

        //     const id = +params['id'];
        //     this.prenotazioniServ.getPrenotazione(id).subscribe((data) => {
        //         this.prenotazione = data;
        //     });
        // });
    }

    salvaPrenotazione(form: NgForm) {

        console.log(form.value)
        alert("vedi log")

        this.prenotazioniServ.postPrenotazione(form.value).subscribe(data => {
            //this.router.navigate(['/prenotazioni']);
        });

        // this.prenotazioniServ.putPrenotazione(form.value, id).subscribe(() => {
        //     this.prenotazioniServ.getPrenotazioniFromCurrent().subscribe(data =>{
        //         this.prenotazioniServ.setNuovePrenotazioni(data);
        //     })
        // });        
    }

    chiudiForm() {
        this.router.navigate(['/prenotazioni']);
    }
}