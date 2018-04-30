import { ToastyService } from "ng2-toasty";
import { ConfirmationService } from "primeng/primeng";
import { LazyLoadEvent } from "primeng/components/common/api";

import { OAuthService } from "./../../seguranca/oauth.service";
import { ErroHandlerService } from "../../core/erro-handler.service";
import { PessoaFilter, PessoaService } from "./../pessoa.service";

import { Title } from "@angular/platform-browser";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-pessoa-search-form",
  templateUrl: "./pessoa-search-form.component.html",
  styleUrls: ["./pessoa-search-form.component.css"]
})
export class PessoaSearchFormComponent implements OnInit {
  filtro = new PessoaFilter();
  totalRegistros = 0;
  pessoas = [];
  @ViewChild("tabela") grid;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
    private erroHandleService: ErroHandlerService,
    private title: Title,
    public auth: OAuthService
  ) {}

  ngOnInit() {
    this.title.setTitle("Pesquisa de pessoas");
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    const rows = event.rows;
    this.pesquisar(pagina, rows);
  }

  pesquisar(pagina = 0, rows = 4) {
    this.filtro.pagina = pagina;
    this.filtro.itensPorPagina = rows;
    this.pessoaService.pesquisar(this.filtro).then(resultado => {
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.total;
    }).catch(erro => this.erroHandleService.handle(erro));
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService
      .mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? "ativada" : "desativada";

        pessoa.ativo = novoStatus;
        this.toastyService.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.erroHandleService.handle(erro));
  }

  listarTodas() {
    this.pessoaService.listarTodas().then(pessoas => (this.pessoas = pessoas));
  }

  confirmarExclusao(pessoas: any) {
    this.confirmationService.confirm({
      message: "Deseja excluir esta Pessoa?",
      accept: () => {
        this.excluir(pessoas);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService
      .excluir(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toastyService.success({
          title: "Excluido!",
          msg: "Pessoa Excluido com Sucesso!...",
          showClose: true,
          timeout: 5000,
          theme: "success"
        });
      })
      .catch(erro => {
        this.erroHandleService.handle(erro);
      });
  }
}
