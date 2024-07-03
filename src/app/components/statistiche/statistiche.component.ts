import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';
import { Prenotazione } from 'src/app/models/prenotazione.interface';
import { Chart } from 'chart.js/auto';

@Component({
    selector: 'app-statistiche',
    templateUrl: './statistiche.component.html',
    styleUrls: ['./statistiche.component.scss']
})
export class StatisticheComponent implements OnInit {

    //grafici
    ch1!: Chart;
    ch2!: Chart;
    ch3!: Chart;

    //annoCorrente
    annoCorrente = new Date().getFullYear();

    //occupazione immobile
    prenotazioni: Prenotazione[] = [];
    mesi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    totaleGiorni = 0;

    //prezzo medio giornaliero su base mensile
    pmgMese = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    pmgAnno = 0;

    //incassi su base mensile
    incassoMese = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    incassoAnno = 0;

    constructor(private prenotazioneService: PrenotazioneService) { }

    ngOnInit() {
        this.calcolaDatiPerAnno(this.annoCorrente);
        this.ch1 = this.creaGrafico("myChart1", "", this.mesi);
        this.ch2 = this.creaGrafico("myChart2", "", this.mesi);
        this.ch3 = this.creaGrafico("myChart3", "", this.mesi);
    }

    creaGrafico(nomeGrafico: string, didascalia: string, datiGrafico: number[]) {
        
        Chart.defaults.color= '#A7D4AD';
        Chart.defaults.font.size=14;

        return new Chart(nomeGrafico, {
            type: 'line',
            data: {
                labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settebre', 'Ottobre', 'Novembre', 'Dicembre'],
                datasets: [{
                    label: didascalia,
                    data: datiGrafico,
                    borderWidth: 3,
                    borderColor: "#145459",
                    backgroundColor: '#A7D4AD',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        });
    }

    aggiornaGrafico(nomeGrafico: Chart, didascalia: string, datiGrafico: number[]) {

        nomeGrafico.data.datasets[0].label = didascalia
        nomeGrafico.data.datasets[0].data = datiGrafico;
        nomeGrafico.update();
    }

    //da correggere
    private percentualeOccupazioneMese() {
        const giornoMill = 1000 * 60 * 60 * 24;

        this.prenotazioni.forEach(prenot => {

            let start = Date.parse(prenot.checkIn);
            const stop = Date.parse(prenot.checkOut);

            while (start < stop) {
                let d = new Date(start);

                this.mesi[d.getMonth()]++;
                start += giornoMill;
            }
        })
        this.totaleGiorni = this.mesi.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    private dateDiff(dataCheckin: string, dataCheckout: string) {
        return Math.floor((Date.parse(dataCheckout) - Date.parse(dataCheckin)) / 86400000);
    }

    private prezzoMedioGiornaliero(mese: number) {
        let totGiorni = 0;
        let totImporto = 0;

        this.prenotazioni.forEach(prenot => {

            let d = new Date(prenot.checkIn);
            if (d.getMonth() === mese) {
                totGiorni += this.dateDiff(prenot.checkIn, prenot.checkOut);
                totImporto += prenot.costoSoggiorno;
            }
        });
        if (totImporto == 0 && totGiorni == 0) return 0;
        return totImporto / totGiorni;
    }

    private pmgSuBaseAnnua() {
        let count = 0;
        let accumulator = 0;

        for (let index = 0; index < 12; index++) {
            if (this.pmgMese[index] > 0) {
                count++;
                accumulator += this.pmgMese[index];
            }
        }
        return accumulator / count;
    }

    private incassiSuBaseMensile() {
        this.prenotazioni.forEach(prenot => {
            let index = new Date(prenot.checkIn).getMonth();
            this.incassoMese[index] += prenot.costoSoggiorno;
            this.incassoAnno += prenot.costoSoggiorno;
        });
    }

    annoSuccessivo() {
        this.annoCorrente++;
        this.calcolaDatiPerAnno(this.annoCorrente);
    }

    annoPrecedente() {
        this.annoCorrente--;
        this.calcolaDatiPerAnno(this.annoCorrente);
    }

    calcolaDatiPerAnno(year: number) {

        //occupazione immobile
        this.prenotazioni = [];
        this.mesi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.totaleGiorni = 0;

        //prezzo medio giornaliero
        this.pmgMese = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.pmgAnno = 0;

        //incassi su base mensile
        this.incassoMese = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.incassoAnno = 0;

        //carica prenotazioni
        this.prenotazioneService.getPrenotazioniByYear(year).subscribe(data => {
            this.prenotazioni = data;

            //dati occupazione immobile
            this.percentualeOccupazioneMese();

            //prezzo medio giornaliero su base mensile
            for (let index = 0; index < 12; index++) {
                this.pmgMese[index] = this.prezzoMedioGiornaliero(index);
            }

            //prezzo medio giornaliero su base annua
            this.pmgAnno = this.pmgSuBaseAnnua();
            if (isNaN(this.pmgAnno)) this.pmgAnno = 0;

            //incassi su base mensile e incasso annuo
            this.incassiSuBaseMensile();

            this.aggiornaGrafico(this.ch1, "Occupazione immobile - Anno " + this.annoCorrente + " - Soggiorni: " + data.length, this.mesi);
            this.aggiornaGrafico(this.ch2, "Prezzo medio giornaliero - Anno " + this.annoCorrente + " - Soggiorni: " + data.length, this.pmgMese);
            this.aggiornaGrafico(this.ch3, "Incassi - Anno " + this.annoCorrente + " - Soggiorni: " + data.length, this.incassoMese);
        });
    }
}