export interface Prenotazione {
    id: number;
    nomeCliente: string;
    adulti: number;
    bambini: number;
    checkIn: string;
    checkOut: string;
    piattaforma: string;
    costoSoggiorno: number;

    problemaOspite: string;
    soluzioneOspite:  boolean;
    comunicazioneDatiPs: boolean;
    riversamentoSomme: string;
}