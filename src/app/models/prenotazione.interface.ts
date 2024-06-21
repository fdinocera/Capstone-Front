
export interface PrenotazioneResponse {
    content: Prenotazione[];
}


export interface Prenotazione {
    id: number;
    nomeCliente: string;
    adulti: number;
    bambini: number;
    checkIn: string;
    checkOut: string;
    piattaforma: string;
    costoSoggiorno: number;
}