import {Component, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly durationInSeconds = 30;

  constructor(private _snackBar: MatSnackBar) {
  }

  createNotification(message: string, type?: 'warning' | 'success' | 'information') {
    type = type ? type : 'information';
    this._snackBar.open(message, 'Close', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "end",
      panelClass: [type]
    });
  }
}

@Component({
  template: `
    <p>Notification Works</p>
  `,
  styles: [`

  `],
})
export class NotificationComponent {
}
