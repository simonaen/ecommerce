import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {isSidebarCollapsed, LayoutState} from '../../store';
import {take, tap} from 'rxjs/operators';
import {collapseSidebar, expandSidebar} from '../../store/layout.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu-icon',
  template: `
    <button mat-button (click)="handleClick()" [ngClass]="(isCollapsed$ | async) ? '': 'active'">
      <div class="container">
        <span class="top"></span>
        <span class="bottom"></span>
      </div>
    </button>
  `,
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent implements OnInit {
  isCollapsed$: Observable<boolean>;
  constructor(private store: Store<LayoutState>) {
    this.isCollapsed$ = this.store.select(isSidebarCollapsed);
  }

  ngOnInit() {
  }

  handleClick() {
    this.store.select(isSidebarCollapsed).pipe(
      take(1),
      tap(isCollapsed => {
        isCollapsed ? this.store.dispatch(expandSidebar()) : this.store.dispatch(collapseSidebar());
      })
    ).subscribe();
  }
}
