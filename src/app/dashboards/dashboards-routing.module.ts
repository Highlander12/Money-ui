import { DashboardLancamentosComponent } from "./dashboard-lancamentos/dashboard-lancamentos.component";

import { AuthGuard } from "./../seguranca/auth.guard";

import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "dashboards",
    component: DashboardLancamentosComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_PESQUISAR_LANCAMENTO"] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule {}
