import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {LayoutComponent} from './layout.component';
import {AppRoutingModule} from '../../app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MenuIconComponent} from './sidebar/menu-icon/menu-icon.component';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GlobalSearchComponent} from './navbar/global-search/global-search.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, LayoutComponent, MenuIconComponent, GlobalSearchComponent],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class LayoutModule {
}
