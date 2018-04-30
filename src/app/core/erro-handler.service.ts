import { NotAuthenticatedError } from "../seguranca/money-http";

import { Router } from "@angular/router";
import { ToastyService } from "ng2-toasty";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
@Injectable()
export class ErroHandlerService {
  constructor(private toasty: ToastyService, private router: Router) {}

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === "string") {
      msg = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = "Sua sessão expirou!";
      this.router.navigate(["/login"]);
    } else if (
      errorResponse instanceof Response &&
      errorResponse.status >= 400 &&
      errorResponse.status <= 499
    ) {
      let errors;
      msg = "Ocorreu um erro ao processar a sua solicitação";

      if (errorResponse.status === 403) {
        msg = "Você não tem permissão para executar esta ação.";
      }
      if (errorResponse.status === 401) {
        msg = "Sua sessão expirou!";
        this.router.navigate(["/login"]);
      }

      try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) {}
    } else {
      msg = "Erro ao processar serviço remoto. Tente novamente.";
      console.error("Ocorreu um erro", errorResponse);
    }

    this.toasty.error({
      title: `Erro`,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: "error"
    });
  }
}
