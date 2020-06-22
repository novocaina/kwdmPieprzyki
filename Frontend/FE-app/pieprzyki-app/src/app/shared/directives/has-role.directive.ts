import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { userRole, AuthState } from 'src/app/store/auth';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  private sub = new Subscription();
  @Input() appHasRole: string;
  isVisible = false;

  role$ = this.store.pipe(select(userRole));

  constructor(private store: Store<AuthState>, private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any> ) { }

  ngOnInit() {
    this.sub.add(this.role$.subscribe((role) => {
      if (role) {
        if (role == this.appHasRole) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
