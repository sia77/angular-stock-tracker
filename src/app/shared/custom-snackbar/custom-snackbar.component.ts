import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-custom-snackbar',
  imports: [MatIconModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.css'
})
export class CustomSnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) {}

  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}




