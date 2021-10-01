import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private loadingController: LoadingController) {}

  async showLoader(msg: string): Promise<void> {
    const res = await this.loadingController.create({
      message: msg,
    });
    this.isLoading$.next(true);
    res.present();
  }

  hideLoader() {
    this.loadingController.getTop().then((v) => {
      if (v) {
        this.isLoading$.next(false);
        this.loadingController.dismiss();
      }
    });
  }
}
