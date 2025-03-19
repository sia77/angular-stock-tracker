import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  imports: [RouterModule, CommonModule],
  templateUrl: './main-navigation.component.html',
  styleUrl: './main-navigation.component.css'
})
export class MainNavigationComponent {
  isMenuOpen = false;  // Variable to control the menu visibility

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;  // Toggle the menu open/close state
  }

}
