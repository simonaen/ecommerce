import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CatalogItem} from "../models/item/catalog-item.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ItemsCatalogService {
	public readonly serverUrl = environment.serverUrl;

	constructor(private http: HttpClient) {
	}

	getAllItems$(filters?: string[]): Observable<CatalogItem[]> {
		return this.http.get<CatalogItem[]>(`${this.serverUrl}/item`, {params: {filters}});
	}

}
