import { PasswordModule } from "primeng/components/password/password";
import { ButtonModule } from "primeng/components/button/button";
import { InputTextModule } from "primeng/components/inputtext/inputtext";

import { Http, RequestOptions } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthHttp, AuthConfig } from "angular2-jwt";

import { AuthGuard } from "./auth.guard";
import { OAuthService } from "./oauth.service";
import { MoneyHttp } from "./money-http";
import { SegurancaRoutingModule } from "./seguranca-routing.module";
import { LoginFormComponent } from "./login-form/login-form.component";
import { LogoutService } from "./logout.service";

export function authHttpServiceFactory(
  auth: OAuthService,
  http: Http,
  options: RequestOptions
) {
  const config = new AuthConfig({
    globalHeaders: [{ "Content-Type": "application/json" }]
  });

  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [OAuthService, Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule {}
