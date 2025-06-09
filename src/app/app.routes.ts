import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ServicesComponent } from './components/services/services.component';
import { TopNewsComponent } from './components/top-news/top-news.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'about', component: AboutComponent }, 
    { path: 'search-result', component: SearchResultComponent },
    // { path: 'services', component: ServicesComponent },
    { path: 'news', component: TopNewsComponent },
    // { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route (redirect unknown paths)
  ];
