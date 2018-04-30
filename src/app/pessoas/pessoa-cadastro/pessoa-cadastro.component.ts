import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Pessoa } from "./../../core/model";
import { ErroHandlerService } from "./../../core/erro-handler.service";
import { PessoaService } from "./../pessoa.service";

import { ToastyService } from "ng2-toasty";

import { FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pessoa-cadastro",
  templateUrl: "./pessoa-cadastro.component.html",
  styleUrls: ["./pessoa-cadastro.component.css"]
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();
  operacao = "Nova";

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private erroHandlerService: ErroHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("Nova pessoa");
    const codigoPessoa = this.route.snapshot.params["codigo"];
    if (codigoPessoa) {
      this.buscarPorPk(codigoPessoa);
      this.atualizarTituloEdicao();
      this.operacao = "Edição de";
    }
  }

  salvar(form: FormControl) {
    if (this.pessoa.codigo) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  atualizarPessoa(fom: FormControl) {
    this.pessoaService
      .atualizar(this.pessoa)
      .then(response => {
        this.toastyService.success("Pessoa alterada com sucesso!");
        this.pessoa = response;
      })
      .catch(erro => this.erroHandlerService.handle(erro));
  }

  adicionarPessoa(form: FormControl) {
    console.log(this.pessoa);
    this.pessoaService
      .criar(this.pessoa)
      .then(() => {
        this.toastyService.success("Pessoa criada com sucesso!");
        this.router.navigate(["/pessoas"]);
      })
      .catch(erro => this.erroHandlerService.handle(erro));
  }

  buscarPorPk(codigo: number) {
    this.pessoaService
      .buscarPorPk(codigo)
      .then(response => {
        this.pessoa = response;
      })
      .catch(erro => this.erroHandlerService.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle("Edição de Pessoa");
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(
      function() {
        this.pessoa = new Pessoa();
      }.bind(this),
      1
    );
    this.router.navigate(["/pessoas/nova"]);
  }
}
