import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from 'src/app/shared/enums/routes.enum';
import { HasRoleDirective } from 'src/app/shared/directives/has-role.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [HasRoleDirective]
})
export class DashboardComponent {
  Routes = Routes;

  constructor(private router: Router) { }

  onPageSelection(path){
    this.router.navigateByUrl(Routes.Dashboard + path);
  }
}
