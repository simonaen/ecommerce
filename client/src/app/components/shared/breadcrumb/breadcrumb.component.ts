import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BreadcrumbElement} from "@core/models/shared/breadcrumb-element.model";

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {
	@Input() elements: BreadcrumbElement[]

	constructor(private router: Router) {
	}

	ngOnInit() {
	}

	navigateToElement(index: number) {
		let url = '';
		for (let i = 0; i <= index; i++) {
			url += '/' + this.elements[i].route;
		}
		this.router.navigateByUrl(url).then();
	}

}
