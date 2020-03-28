import {Component, OnDestroy, OnInit} from '@angular/core';
import {isSidebarCollapsed, LayoutState} from '../store';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  sidebarCollapsed: boolean;
  private sidebarCollapsedSub: Subscription;

  constructor(private store: Store<LayoutState>) {
    this.sidebarCollapsedSub = this.store.select(isSidebarCollapsed).pipe(
      tap(collapsed => this.sidebarCollapsed = collapsed)
    ).subscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sidebarCollapsedSub.unsubscribe();
  }
}
