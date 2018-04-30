import { Router } from "@angular/router";
import { ErroHandlerService } from "./../../core/erro-handler.service";
import { OAuthService } from "./../oauth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent {
  constructor(
    private oauthService: OAuthService,
    private erroHandlerService: ErroHandlerService,
    private router: Router
  ) {}

  login(usuario: string, senha: string) {
    this.oauthService
      .login(usuario, senha)
      .then( () => {
        this.router.navigate(["/lancamentos"]);
      })
      .catch(erro => {
        this.erroHandlerService.handle(erro);
      });
  }
}
