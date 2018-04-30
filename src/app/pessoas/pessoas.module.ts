import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { ButtonModule } from "primeng/components/button/button";
import { TooltipModule } from "primeng/components/tooltip/tooltip";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { InputMaskModule } from "primeng/components/inputmask/inputmask";

import { PessoaSearchFormComponent } from "./pessoa-search-form/pessoa-search-form.component";
import { CoreModule } from "./../core/core.module";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { SharedModule } from "../shared/shared.module";
import { PessoasRoutingModule } from "./pessoa-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputMaskModule,
    DataTableModule,
    TooltipModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    SharedModule,
    CoreModule,
    PessoasRoutingModule
  ],
  declarations: [PessoaCadastroComponent, PessoaSearchFormComponent],
  exports: [PessoaCadastroComponent, PessoaSearchFormComponent]
})
export class PessoasModule {}
