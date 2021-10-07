import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showToast(
    message: string,
    position: 'bottom' | 'top' | 'middle' = 'bottom',
    color: string = 'success'
  ) {
    const toast = await this.toastController.create({
      message,
      position,
      duration: message.length > 30 ? 5000 : 2000,
      color,
    });
    toast.present();
  }
}
