import { Routes, RouterModule } from '@angular/router';

//Routing Pages 
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
//import { AuthGuard } from '';
const appRouter: Routes = [
    {
        path: 'index',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'new_signup',
        component: RegisterComponent,
        pathMatch: 'full'
    },
    { path: '**', redirectTo: 'index' }
]

export const Routing = RouterModule.forRoot(appRouter);