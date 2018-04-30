import { AuthGuard } from "./../seguranca/auth.guard";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { PessoaSearchFormComponent } from "./pessoa-search-form/pessoa-search-form.component";

import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "pessoas",
    component: PessoaSearchFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_PESQUISAR_PESSOA"] }
  },
  {
    path: "pessoas/nova",
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_CADASTRAR_PESSOA"] }
  },
  {
    path: "pessoas/:codigo",
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_ALTERAR_PESSOA"] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule {}
