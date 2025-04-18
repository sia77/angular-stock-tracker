import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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

  // Close the menu if the user clicks outside of it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    const menuElement = document.querySelector('.menu'); // Adjust the selector based on your menu class
    const isClickInsideMenu = menuElement?.contains(event.target as Node);
    const menuIcon = document.querySelector(".burger_icon");
    const isIconClicked = menuIcon?.contains(event.target as Node);

    // If the click is outside the menu, close the menu
    if (!isIconClicked && menuElement && !isClickInsideMenu ) {
      this.isMenuOpen = false;
    }
  }

}
