import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'about', component: AboutComponent }, 
    { path: 'search-result', component: SearchResultComponent },
    // { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route (redirect unknown paths)
  ];
