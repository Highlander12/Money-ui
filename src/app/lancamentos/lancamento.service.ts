import { environment } from "./../../environments/environment";
import { Lancamento } from "./../core/model";

import { Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { AuthHttp } from "angular2-jwt";

export class LancamentoFilter {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {
  lancamentosUrl: string;

  constructor(private auth: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFilter): Promise<any> {
    const params = new URLSearchParams();
    /* const headers = new Headers();

    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );*/

    params.set("page", filtro.pagina.toString());
    params.set("size", filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set("descricao", filtro.descricao);
    }
    if (filtro.dataVencimentoDe) {
      // let dataFormatada = new DatePipe("pt-BR").transform(filtro.dataVencimentoDe, "yyyy-MM-dd");
      params.set(
        "dataVencimentoDe",
        moment(filtro.dataVencimentoDe).format("YYYY-MM-DD")
      );
    }
    if (filtro.dataVencimentoAte) {
      params.set(
        "dataVencimentoAte",
        moment(filtro.dataVencimentoAte).format("YYYY-MM-DD")
      );
    }

    return this.auth
      .get(`${this.lancamentosUrl}?resumo`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;
        const total = responseJson.totalElements;
        const resultado = {
          lancamentos,
          total
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    /* const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );*/

    return this.auth
      .delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  criar(lancamento: Lancamento): Promise<Lancamento> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );
    headers.append("Content-Type", "application/json");*/

    return this.auth
      .post(`${this.lancamentosUrl}`, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  buscarPorPk(codigo: number): Promise<Lancamento> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );*/

    return this.auth
      .get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    /*const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=="
    );
    headers.append("Content-Type", "application/json");*/

    return this.auth
      .put(
        `${this.lancamentosUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento)
      )
      .toPromise()
      .then(response => response.json());
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(
        lancamento.dataVencimento,
        "YYYY-MM-DD"
      ).toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(
          lancamento.dataPagamento,
          "YYYY-MM-DD"
        ).toDate();
      }
    }
  }

  geraRelatorio(): Promise<any> {
    return this.auth
    .get(`${this.lancamentosUrl}/pdf`, {
        responseType: ResponseContentType.ArrayBuffer
      })
      .toPromise()
      .then(response => {
        return response;
      })
  }
}
