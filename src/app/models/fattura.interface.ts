// export interface FatturaResponse {
//     content: Fattura[];
//   }
  
//   export interface Fattura {
//     id: number;
//     dataImporto: string;
//     importo: number;
//     numero: string;
//     statoFattura: string;
//     cliente: Cliente;
//   }
  
//   export interface Cliente {
//     id: number;
//     ragioneSociale: string;
//     partitaIva: string;
//     email: string;
//     dataInserimento: string;
//     dataUltimoContatto: string;
//     fatturatoAnnuale: number;
//     pec: string;
//     telefono: string;
//     emailContatto: string;
//     nomeContatto: string;
//     cognomeContatto: string;
//     telefonoContatto: string;
//     logoAziendale: string;
//     tipoSocieta: string;
//     indirizzi: Indirizzo[];
//   }
  
//   export interface Indirizzo {
//     id: number;
//     tipoSede: string;
//     via: string;
//     civico: string;
//     cap: string;
//     localita: Localita;
//   }
  
//   export interface Localita {
//     id: number;
//     pfProvincia: number;
//     pfComune: number;
//     nomeComune: string;
//     provincia: Provincia;
//   }
  
//   export interface Provincia {
//     id: number;
//     siglaProvincia: string;
//     regione: string;
//     nomeProvincia: string;
//   }