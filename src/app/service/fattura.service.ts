// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment.development';
// import { FatturaResponse } from '../models/fattura.interface';
// import { Fattura } from '../models/fattura.interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class FatturaService {

//   apiUrL = environment.apiURL;
//   constructor(private http:HttpClient) {   }

//   getFattura(){
//     return this.http.get<FatturaResponse>(`${this.apiUrL}fatture`);
//   }
  
//   getFatturaByCliente(id:number){
//     return this.http.get<FatturaResponse>(`${this.apiUrL}fatture/filter?clienteId=${id}`);
//   }
  
//   postFattura(fattura: Fattura){
//     return this.http.post(`${this.apiUrL}fatture`,fattura,{ responseType: 'text' });
//   }

   
// }
