import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChartModule } from "primeng/components/chart/chart";
import { TabViewModule } from "primeng/components/tabview/tabview";

import { CoreModule } from "../core/core.module";
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { DashboardLancamentosComponent } from "./dashboard-lancamentos/dashboard-lancamentos.component";

@NgModule({
  imports: [CommonModule, DashboardsRoutingModule, CoreModule, ChartModule, TabViewModule],
  declarations: [DashboardLancamentosComponent]
})
export class DashboardsModule {}
