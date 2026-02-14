import { Component, OnInit } from '@angular/core';
import { BarangService } from '../services/barang.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonInput, 
  IonCard, 
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonButton, 
    IonInput, 
    IonCard, 
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    CommonModule, 
    FormsModule
  ],
})
export class HomePage implements OnInit {
  
  listBarang: any[] = [];
  namaBarangBaru = '';
  hargaBarangBaru = 0;

  constructor(private barangService: BarangService) {}

  ngOnInit() {
    this.ambilDataBarang();
  }

  ambilDataBarang() {
    this.barangService.getBarang().subscribe({
      next: (response: any) => {
        this.listBarang = response;
        console.log('✅ Data barang berhasil dimuat:', response);
      },
      error: (error: any) => {
        console.error('❌ Error mengambil data:', error);
        alert('Gagal mengambil data dari server. Pastikan server menyala!');
      }
    });
  }

  simpanBarang() {
    if (!this.namaBarangBaru || this.hargaBarangBaru <= 0) {
      alert('Nama barang dan harga harus diisi dengan benar!');
      return;
    }

    const dataBarang = {
      nama_barang: this.namaBarangBaru,
      harga: this.hargaBarangBaru
    };

    this.barangService.tambahBarang(dataBarang).subscribe({
      next: (response: any) => {
        console.log('✅ Data berhasil disimpan:', response);
        alert('Barang berhasil ditambahkan!');
        
        this.namaBarangBaru = '';
        this.hargaBarangBaru = 0;
        
        this.ambilDataBarang();
      },
      error: (error: any) => {
        console.error('❌ Error menyimpan data:', error);
        alert('Gagal menyimpan data. Cek console untuk detail.');
      }
    });
  }

  formatRupiah(angka: number): string {
    return 'Rp ' + angka.toLocaleString('id-ID');
  }
}