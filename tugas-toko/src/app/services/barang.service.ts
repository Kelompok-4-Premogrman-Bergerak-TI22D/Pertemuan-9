import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarangService {
  
  // URL Backend
  private apiUrl = 'http://localhost:3000/api/barang';

  constructor(private http: HttpClient) { }

  // METHOD 1: Ambil semua barang (GET)
  getBarang(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // METHOD 2: Tambah barang baru (POST)
  tambahBarang(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}