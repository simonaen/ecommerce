import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {faMars, faVenus} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {gender, isSidebarCollapsed, LayoutState} from '@core/store/layout/layout.state';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {Gender} from "@core/models/gender.enum";
import {LayoutActions} from "@core/store/layout/layout.actions";

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

  gender: Gender;
  genderSub: Subscription;

  @HostBinding('class.collapsed')
  sidebarCollapsed: boolean;
  sidebarStatusSub: Subscription;

  constructor(private store: Store<LayoutState>) {
    this.sidebarStatusSub = this.store.select(isSidebarCollapsed).pipe(
      tap(isCollapsed => this.sidebarCollapsed = isCollapsed)
    ).subscribe();

    this.genderSub = this.store.select(gender).pipe(
      tap(gender => this.gender = gender)
    ).subscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sidebarStatusSub.unsubscribe();
    this.genderSub.unsubscribe();
  }

  isGenderActive(gender: 'male' | 'female') {
    if (gender === 'male') {
      return this.gender === Gender.Male
    } else {
      return this.gender === Gender.Female;
    }
  }

  setGender(gender: 'male' | 'female') {
    gender === 'male' ?
      this.store.dispatch(LayoutActions.setGender({gender: Gender.Male})) :
      this.store.dispatch(LayoutActions.setGender({gender: Gender.Female}));
  }
}
