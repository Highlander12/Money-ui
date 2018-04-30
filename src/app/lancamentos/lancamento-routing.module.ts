import { ModalComponent } from './modal/modal.component';
import { AuthGuard } from "./../seguranca/auth.guard";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { LancamentoSearchFormComponent } from "./lancamento-search-form/lancamento-search-form.component";

import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "lancamentos",
    component: LancamentoSearchFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_PESQUISAR_LANCAMENTO"]}
  },
  {
    path: "lancamentos/novo",
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_CADASTRAR_LANCAMENTO"]}
  },
  {
    path: "lancamentos/:codigo",
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_ALTERAR_LANCAMENTO"]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule {}
