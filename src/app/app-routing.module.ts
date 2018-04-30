import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PessoaCadastroComponent } from "./pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { NaoAutorizadoComponent } from "./core/nao-autorizado.component";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { PessoaSearchFormComponent } from "./pessoas/pessoa-search-form/pessoa-search-form.component";
import { LancamentoCadastroComponent } from "./lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import { LancamentoSearchFormComponent } from "./lancamentos/lancamento-search-form/lancamento-search-form.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "pagina-nao-encontrada", component: PaginaNaoEncontradaComponent },
  { path: "nao-autorizado", component: NaoAutorizadoComponent },
  { path: "**", redirectTo: "pagina-nao-encontrada" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRountingModule {}
