import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pagina-nao-encontrada",
  template: `
    <div class="container">
     <div class="ui-g">
       <div class="ui-g-12">
       <img class="displayed" src="./assets/error_404.png">
       </div>
       <a style="margin: 0 auto" routerLink="/login"><i class="fa fa-arrow-left"></i> Ir para o Login</a>
     </div>
    </div>
  `,
  styles: [`
  IMG.displayed {
    display: block;
    padding: 80px;
    margin-left: auto;
    margin-right: auto }`]
})
export class PaginaNaoEncontradaComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
