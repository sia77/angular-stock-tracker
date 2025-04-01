import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavigationComponent } from "./components/main-navigation/main-navigation.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavigationComponent, FooterComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-stock-tracker';
}
