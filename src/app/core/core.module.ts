import { Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ToastyModule } from "ng2-toasty";
import { ConfirmationService } from "primeng/components/common/api";
import { ButtonModule } from "primeng/components/button/button";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { JwtHelper } from "angular2-jwt";

import { NavbarMenuComponent } from "./navbar-menu/navbar-menu.component";
import { OAuthService } from "../seguranca/oauth.service";
import { ErroHandlerService } from "./erro-handler.service";
import { CategoriaService } from "../categorias/categoria.service";
import { LancamentoService } from "./../lancamentos/lancamento.service";
import { PessoaService } from "./../pessoas/pessoa.service";
import { PaginaNaoEncontradaComponent } from "./pagina-nao-encontrada.component";
import { NaoAutorizadoComponent } from "./nao-autorizado.component";

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [
    NavbarMenuComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarMenuComponent,
    ConfirmDialogModule,
    ToastyModule,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  providers: [
    ErroHandlerService,
    LancamentoService,
    CategoriaService,
    PessoaService,
    ConfirmationService,
    OAuthService,
    JwtHelper,
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ]
})
export class CoreModule {}
