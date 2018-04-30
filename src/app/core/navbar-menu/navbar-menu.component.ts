import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { ErroHandlerService } from "./../erro-handler.service";
import { LogoutService } from "./../../seguranca/logout.service";
import { OAuthService } from "./../../seguranca/oauth.service";

@Component({
  selector: "app-navbar-menu",
  templateUrl: "./navbar-menu.component.html",
  styleUrls: ["./navbar-menu.component.css"]
})
export class NavbarMenuComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    public auth: OAuthService,
    private logoutService: LogoutService,
    private errorHandler: ErroHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.logoutService
      .logout()
      .then(() => {
        this.router.navigate(["/login"]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
