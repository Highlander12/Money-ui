import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard-lancamentos",
  templateUrl: "./dashboard-lancamentos.component.html",
  styleUrls: ["./dashboard-lancamentos.component.css"]
})
export class DashboardLancamentosComponent {
  data: any;
  datapie: any;

  constructor() {
    this.data = {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
      datasets: [
        {
          label: "RECEITAS",
          data: [650, 2000, 2200, 810, 560, 550, 400, 530, 1170, 920, 610, 2500],
          fill: false,
          borderColor: "#5ce8e8",
          backgroundColor: "#5ce8e8"
        },
        {
          label: "DESPESAS",
          data: [2800, 480, 400, 1900, 860, 270, 850, 810, 620, 850, 280, 1390],
          fill: false,
          borderColor: "#c42d4d",
          backgroundColor: "#c42d4d"
        }
      ]
    };
  }
}
