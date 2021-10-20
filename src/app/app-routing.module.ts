import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'stay-in-touch',
    loadChildren: () => import('./stay-in-touch/stay-in-touch.module').then( m => m.StayInTouchPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'stay-informed',
    loadChildren: () => import('./stay-informed/stay-informed.module').then(m => m.StayInformedPageModule)
  },
  {
    path: 'stay-in-touch-admin',
    loadChildren: () => import('./stay-in-touch-admin/stay-in-touch-admin.module').then(m => m.StayInTouchAdminPageModule)
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then(m => m.ManagementPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
