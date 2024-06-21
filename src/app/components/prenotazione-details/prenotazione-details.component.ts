import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';
import { Prenotazione } from 'src/app/models/prenotazione.interface';
import { AuthData } from 'src/app/models/auth-data.interface';
import { HttpClient } from '@angular/common/http';



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

        let button = document.getElementById('openModalButton');
        if (button) {
            button.click();
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

    // modificaPrenotazione(form: NgForm, id: number) {
    //     this.prenotazioniServ.putPrenotazione(form.value, id).subscribe(() => {
    //         this.prenotazioniServ.getPrenotazioniFromCurrent().subscribe(data =>{
    //             this.prenotazioniServ.setNuovePrenotazioni(data);
    //         })
    //     });        
    // }


    eliminaPrenotazione(id:number){
        this.prenotazioniServ.deletePrenotazione(id).subscribe();
    }



    //user!: AuthData;
    //prenotazioni: Prenotazione[] = [];

    //constructor(private prenotazioneSrv: PrenotazioneService) {}	


    // ngOnInit(): void {
    // 	//sottoscrive notifica variazioni delle prenotazioni
    // 	this.prenotazioneSrv.nuovePrenotazioni$.subscribe(data => {
    // 		this.prenotazioni = data;

    // 		//ordina per data checkin discendente
    // 		this.prenotazioni.sort(function (a, b) { return Date.parse(a.checkIn) - Date.parse(b.checkIn) })
    // 	});


    // 	//leggi record PRENOTAZIONI		
    // 	this.prenotazioneSrv.getPrenotazioniFromCurrent().subscribe(data => {
    // 		this.prenotazioni = data;

    // 		//ordina per data checkin discendente
    // 		this.prenotazioni.sort(function (a, b) { return Date.parse(a.checkIn) - Date.parse(b.checkIn) })
    // 	})
    // }

    // addCliente(form: NgForm) {

    //     this.prenotazioniServ.postPrenotazione(form.value).subscribe(() =>
    //         this.prenotazioniServ.getPrenotazioniFromCurrent().subscribe(data => {
    //             this.prenotazioni = data;

    //             //ordina per data checkin discendente
    //             this.prenotazioni.sort(function (a, b) { return Date.parse(a.checkIn) - Date.parse(b.checkIn) })
    //         })
    //     );
    // }

    formatData(data: string) {
        return this.prenotazioniServ.formatData(data);
    }   
}