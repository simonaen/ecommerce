import {Component, OnDestroy, OnInit} from '@angular/core';
import {isSidebarCollapsed, LayoutState} from '../store';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {AuthState, isLoggedIn} from "../../core/store/auth";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  sidebarCollapsed: boolean;
  isLoggedIn$: Observable<boolean>;

  private sidebarCollapsedSub: Subscription;

  constructor(private layoutStore: Store<LayoutState>, private authStore: Store<AuthState>) {
    this.sidebarCollapsedSub = this.layoutStore.select(isSidebarCollapsed).pipe(
      tap(collapsed => this.sidebarCollapsed = collapsed)
    ).subscribe();

    this.isLoggedIn$ = this.authStore.select(isLoggedIn);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sidebarCollapsedSub.unsubscribe();
  }
}
