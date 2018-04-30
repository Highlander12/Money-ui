import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nao-autorizado",
  template: `
  <div class="container">
    <div class="ui-g">
        <div class="ui-g-10">
        <h1><i class="fa fa-lock"></i>   Acesso Negado</h1>
        </div>
    </div>
 </div>
  `
})
export class NaoAutorizadoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
