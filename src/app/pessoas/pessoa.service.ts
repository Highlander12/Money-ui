import { environment } from "./../../environments/environment";
import { Pessoa } from "./../core/model";

import { Headers, Response, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";

import { AuthHttp } from "angular2-jwt";
import { toPromise } from "rxjs/operator/toPromise";

export class PessoaFilter {
  nome: string;
  ativo: Boolean;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable()
export class PessoaService {
  pessoasUrl: string;

  constructor(private auth: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFilter): Promise<any> {
    const params = new URLSearchParams();
    /*const headers = new Headers();

    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );*/

    params.set("page", filtro.pagina.toString());
    params.set("size", filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set("nome", filtro.nome);
    }
    if (filtro.ativo) {
      params.set("ativo", filtro.ativo.toString());
    }

    return this.auth
      .get(`${this.pessoasUrl}/listar`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;
        const total = responseJson.totalElements;
        const resultado = {
          pessoas,
          total
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );*/

    return this.auth
      .get(`${this.pessoasUrl}/listar`)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );*/

    return this.auth
      .delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: Boolean): Promise<any> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );
    headers.append("Content-Type", "application/json");*/

    return this.auth
      .put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  criar(pessoa: Pessoa): Promise<Pessoa> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );
    headers.append("Content-Type", "application/json");*/

    return this.auth
      .post(`${this.pessoasUrl}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );
    headers.append("Content-Type", "application/json"); */

    return this.auth
      .put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  buscarPorPk(codigo: number): Promise<Pessoa> {
    /* const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );*/

    return this.auth
      .get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json());
  }
}
