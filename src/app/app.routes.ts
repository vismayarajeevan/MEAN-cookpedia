import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ConatctComponent } from './conatct/conatct.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ReciepesComponent } from './reciepes/reciepes.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { RegisterComponent } from './register/register.component';
import { PnfComponent } from './pnf/pnf.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DownloadListComponent } from './admin/download-list/download-list.component';
import { RecipeListComponent } from './admin/recipe-list/recipe-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    // lazy loaded admin module
    {
        path:"admin", canActivate:[authGuard],  loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)

    },
   
   






    {
        // http://localhost:4200/home
        path:"",component:HomeComponent, title:'Home'
    },
    {
        // http://localhost:4200/about
        path:"about",component:AboutComponent, title:'About'
    },
    {
        // http://localhost:4200/contact
        path:"contact",component:ConatctComponent, title:'Contact'
    },
    {
        // http://localhost:4200/footer
        path:"footer",component:FooterComponent, title:'Footer'
    },
    {
         // http://localhost:4200/header
        path:"header",component:HeaderComponent, title:'Header'
    },
    {
        // http://localhost:4200/login
        path:"login",component:LoginComponent, title:'Login'
    },
    {
        // http://localhost:4200/profile
        path:"profile",canActivate:[authGuard], component:ProfileComponent, title:'Profile'
    },
    {
        // http://localhost:4200/all-recipes
        path:"all-recipe",component:ReciepesComponent, title:'All-recipes'
    },
    {
        // http://localhost:4200/save-recipes
        path:"save-recipe",component:SavedRecipesComponent, title:'save-recipes'
    },
    {
        // http://localhost:4200/recipes/id/view
        path:"recipes/:id/view",component:ViewRecipesComponent, title:'view-recipes'
    },
    {
        // http://localhost:4200/register
        path:"register",component:RegisterComponent, title:'Register'
 
    },
    {
        // http://localhost:4200/register
        path:"**",component:PnfComponent, title:'Page Not Found'
 
    }
];
