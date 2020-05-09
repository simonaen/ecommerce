import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {faMars, faVenus} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {isSidebarCollapsed, LayoutState} from '../../../core/store/state/layout.state';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';

interface ProductCategoryMenuItem {
  iconLink: string;
  title: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  icons = {male: faMars, female: faVenus};

  categories: ProductCategoryMenuItem[] = [
    {title: 'New in', iconLink: 'assets/icons/bolt.svg'},
    {title: 'Clothes', iconLink: 'assets/icons/shirt.svg'},
    {title: 'Shoes', iconLink: 'assets/icons/shoe.svg'},
    {title: 'Accessories', iconLink: 'assets/icons/accessories.svg'},
  ];

  @HostBinding('class.collapsed')
  sidebarCollapsed: boolean;
  sidebarStatusSub: Subscription;

  constructor(private store: Store<LayoutState>) {
    this.sidebarStatusSub = store.select(isSidebarCollapsed).pipe(
      tap(isCollapsed => this.sidebarCollapsed = isCollapsed)
    ).subscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sidebarStatusSub.unsubscribe();
  }
}
