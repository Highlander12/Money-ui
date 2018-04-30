import { environment } from "./../../environments/environment";
import { AuthHttp } from "angular2-jwt";

import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoriaService {
  categoriasUrl: string;

  constructor(private auth: AuthHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );*/

    return this.auth
      .get(`${this.categoriasUrl}/listar`)
      .toPromise()
      .then(response => response.json());
  }
}
