import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { toPromise } from "rxjs/operator/toPromise";
import { ToastyService } from "ng2-toasty";
import { SelectItem } from "primeng/primeng";

import { PessoaService } from "../../pessoas/pessoa.service";
import { LancamentoService } from "./../lancamento.service";
import { ErroHandlerService } from "./../../core/erro-handler.service";
import { CategoriaService } from "../../categorias/categoria.service";
import { Lancamento } from "./../../core/model";

@Component({
  selector: "app-lancamento-cadastro",
  templateUrl: "./lancamento-cadastro.component.html",
  styleUrls: ["./lancamento-cadastro.component.css"]
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA" }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  operacao = "Novo";

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private erroHandlerService: ErroHandlerService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("Novo lançamento");
    const codigoLancamento = this.route.snapshot.params["codigo"];
    if (codigoLancamento) {
      this.buscarPorPk(codigoLancamento);
      this.atualizarTituloEdicao();
      this.operacao = "Edição de";
    }
    this.listarTodasCategorias();
    this.listarTodasPessoas();
  }

  listarTodasCategorias() {
    this.categoriaService
      .listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      })
      .catch(erro => this.erroHandlerService.handle(erro));
  }

  listarTodasPessoas() {
    this.pessoaService
      .listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => {
          return { label: p.nome, value: p.codigo };
        });
      })
      .catch(erro => this.erroHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.lancamento.codigo) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(fom: FormControl) {
    this.lancamentoService
      .atualizar(this.lancamento)
      .then(response => {
        this.toastyService.success("Lancamento alterado com sucesso!");
        this.lancamento = response;
      })
      .catch(erro => this.erroHandlerService.handle(erro));
  }

  adicionarLancamento(form: FormControl) {
    console.log(this.lancamento);
    this.lancamentoService
      .criar(this.lancamento)
      .then(response => {
        this.toastyService.success("Lancamento adicionado com sucesso!");
        this.router.navigate(["/lancamentos", response.codigo]);
      })
      .catch(erro => this.erroHandlerService.handle(erro));
  }

  buscarPorPk(codigo: number) {
    this.lancamentoService
      .buscarPorPk(codigo)
      .then(response => {
        this.lancamento = response;
      })
      .catch(erro => this.erroHandlerService.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(
      function() {
        this.lancamento = new Lancamento();
      }.bind(this),
      1
    );
    this.router.navigate(["/lancamentos/novo"]);
  }

  atualizarTituloEdicao() {
    this.title.setTitle("Edição de lançamento");
  }
}
