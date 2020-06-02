import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CatalogItem} from "@core/models/item/catalog-item.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProductItem} from "@core/models/item/product-item.model";

@Injectable(
)
export class ItemsCatalogService {
	public readonly serverUrl = environment.serverUrl;

	constructor(private http: HttpClient) {
	}

	getAllItems$(filters?: string[]): Observable<CatalogItem[]> {
		return this.http.get<CatalogItem[]>(`${this.serverUrl}/item`, {params: {filters}});
	}

	getItem$(id: string): Observable<ProductItem> {
		return this.http.get<ProductItem>(`${this.serverUrl}/item/${id}`);
	}
}
