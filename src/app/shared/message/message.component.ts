import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
  <div class="ui-message ui-messages-error" *ngIf="temErro()">
        <i class="fa fa-close"></i>
         {{text}}
     </div>
  `,
  styles: [`
     .ui-messages-error {
        margin: 0;
        margin-top: 4px;
     }
  `]
})
export class MessageComponent {

  @Input () error: string;
  @Input () control: FormControl;
  @Input () text: string;

  temErro (): boolean {
     return this.control.hasError(this.error) && this.control.dirty;
  }

// ng g c message --spec false --inline-template --inline-style
}
