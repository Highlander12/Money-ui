import { DashboardsModule } from "./dashboards/dashboards.module";
import { SegurancaModule } from "./seguranca/seguranca.module";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { PessoaCadastroComponent } from "./pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { PessoaSearchFormComponent } from "./pessoas/pessoa-search-form/pessoa-search-form.component";
import { LancamentoCadastroComponent } from "./lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import { CoreModule } from "./core/core.module";
import { AppComponent } from "./app.component";
import { PessoasModule } from "./pessoas/pessoas.module";
import { LancamentosModule } from "./lancamentos/lancamentos.module";
import { LancamentoSearchFormComponent } from "./lancamentos/lancamento-search-form/lancamento-search-form.component";
import { AppRountingModule } from "./app-routing.module";

import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ConfirmationService } from "primeng/primeng";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    PessoasModule,
    CoreModule,
    DashboardsModule,
    LancamentosModule,
    SegurancaModule,
    AppRountingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
