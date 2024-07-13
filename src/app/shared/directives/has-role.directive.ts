import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@app-services';

@Directive({
  selector: '[hasRole]',
  host: {},
})
export class AppHasRoleDirective {
  //   @Input('hasRole') hasRole: string | undefined;
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set hasRole(role: string) {
    this.authService.userHasRole$(role).subscribe((res) => {
      console.log('Has role', role, res);
      if (res && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!res && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }
}
