import { LancamentoService } from "./../lancamento.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Component, Input, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-modal",
  template: `
  <p-overlayPanel #op [showCloseIcon]="true" [dismissable]="true">
    <div *ngIf="url" class="modal-content">
        <embed [attr.src]="url" type="application/pdf" width="800px" height="700px" style="padding: 0;">
    </div>
  </p-overlayPanel>
  `,
  styles: [`
  div.modal-content {
    display: block;
    padding: 20px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  }

  `]
})
export class ModalComponent implements OnInit {
  url: any;
  @ViewChild("op") overlayPanel;

  constructor(
    private domSanitizer: DomSanitizer,
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit() {}

  showModal (event) {
    this.overlayPanel.show(event);
    this.gerarRelatorio();
  }

  gerarRelatorio() {
    this.lancamentoService.geraRelatorio().then(res => {
      let file = new Blob([res._body], { type: "application/pdf" });
      this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(file)
      );
    });
  }
}
