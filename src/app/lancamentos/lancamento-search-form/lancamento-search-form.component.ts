import { ModalComponent } from "../modal/modal.component";
import { OAuthService } from "./../../seguranca/oauth.service";
import { ConfirmationService } from "primeng/primeng";
import { LazyLoadEvent } from "primeng/components/common/api";

import { ErroHandlerService } from "./../../core/erro-handler.service";
import { LancamentoFilter, LancamentoService } from "./../lancamento.service";

import { ToastyService, ToastOptions } from "ng2-toasty";
import { Title } from "@angular/platform-browser";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-lancamento-search-form",
  templateUrl: "./lancamento-search-form.component.html",
  styleUrls: ["./lancamento-search-form.component.css"]
})
export class LancamentoSearchFormComponent implements OnInit {
  filtro = new LancamentoFilter();
  totalRegistros = 0;
  lancamentos = [];
  @ViewChild("tabela") grid;
  @ViewChild("modal") modal: ModalComponent;

  constructor(
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private erroHandleService: ErroHandlerService,
    private title: Title,
    public auth: OAuthService
  ) {}

  ngOnInit() {
    this.title.setTitle("Pesquisa de lançamentos");
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    const rows = event.rows;
    this.pesquisar(pagina, rows);
  }

  openModal(event) {
    this.modal.showModal(event);
  }

  pesquisar(pagina = 0, rows = 5) {
    this.filtro.pagina = pagina;
    this.filtro.itensPorPagina = rows;
    this.lancamentoService
      .pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.erroHandleService.handle(erro));
  }

  excluir(lancamento: any) {
    this.lancamentoService
      .excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toastyService.success({
          title: "Excluido!",
          msg: "Lançamento Excluido com Sucesso!...",
          showClose: true,
          timeout: 5000,
          theme: "success"
        });
      })
      .catch(erro => this.erroHandleService.handle(erro));
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: "Deseja excluir este Lançamento?",
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }
}
