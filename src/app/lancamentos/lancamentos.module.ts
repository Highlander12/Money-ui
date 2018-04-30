import { InputTextareaModule } from "primeng/components/inputtextarea/inputtextarea";
import { TooltipModule } from "primeng/components/tooltip/tooltip";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { ButtonModule } from "primeng/components/button/button";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { SelectButtonModule } from "primeng/components/selectbutton/selectbutton";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModalComponent } from "./modal/modal.component";
import { SharedModule } from "../shared/shared.module";
import { LancamentosRoutingModule } from "./lancamento-routing.module";
import { CoreModule } from "../core/core.module";
import { LancamentoSearchFormComponent } from "./lancamento-search-form/lancamento-search-form.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { OverlayPanelModule } from "primeng/components/overlaypanel/overlaypanel";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    SharedModule,
    CoreModule,
    LancamentosRoutingModule,
    OverlayPanelModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentoSearchFormComponent,
    ModalComponent
  ],
  exports: [],
  providers: []
})
export class LancamentosModule {}
