import { authGuard } from './../core/guards/auth.guard';
import { Routes } from '@angular/router';
import { AuthComponent } from '../layouts/auth/auth.component';
import { MainComponent } from '../layouts/main/main.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
// import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
// import { CartComponent } from '../components/cart/cart.component';
// import { CategoriseComponent } from '../components/categorise/categorise.component';
// import { BrandsComponent } from '../components/brands/brands.component';
import { ProductsComponent } from '../components/products/products.component';
// import { WishlistComponent } from '../components/wishlist/wishlist.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
// import { ForgetPasswordComponent } from '../components/forget-password/forget-password.component';
// import { ResetCodeComponent } from '../components/reset-code/reset-code.component';
// import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { ResetCodeGuard } from '../core/guards/reset-password.guard';
// import { ShippingAddressComponent } from '../components/shipping-address/shipping-address.component';
// import { AllordersComponent } from '../components/allorders/allorders.component';

export const routes: Routes = [
    {path:"" , redirectTo:"/login" , pathMatch:"full"},
    {path:"", component:AuthComponent , children:[
        {path:"" , redirectTo:"login" , pathMatch:"full"},
        {path:"register" , loadComponent:()=>import('../components/register/register.component').then(classes=>classes.RegisterComponent) , title:"Register"},
        {path:"login" , component:LoginComponent , title:"Login"},
        {path:"forgetPassword" , loadComponent:()=>import('../components/forget-password/forget-password.component').then(classes=>classes.ForgetPasswordComponent) , title:"forgetPassword"},
        {path:"resetCode" , loadComponent:()=>import('../components/reset-code/reset-code.component').then(classes=>classes.ResetCodeComponent) , title:"resetCode"},
        {path:"changePassword" , loadComponent:()=>import('../components/change-password/change-password.component').then(classes=>classes.ChangePasswordComponent) , title:"changePassword", canActivate:[ResetCodeGuard]}
    ]},
    {path:"", component:MainComponent, canActivate:[authGuard] , children:[
        {path:"" , redirectTo:"home" , pathMatch:"full"},
        {path:"home" , component:HomeComponent , title:"Home"},
        {path:"cart" , loadComponent:()=>import('../components/cart/cart.component').then(classes=>classes.CartComponent) , title:"Cart"},
        {path:"categorise" , loadComponent:()=>import('../components/categorise/categorise.component').then(classes=>classes.CategoriseComponent) , title:"Categorise"},
        {path:"brands" , loadComponent:()=>import('../components/brands/brands.component').then(classes=>classes.BrandsComponent) , title:"Brands"},
        {path:"products" , component:ProductsComponent , title:"Products"},
        {path:"wishlist" , loadComponent:()=>import('../components/wishlist/wishlist.component').then(classes=>classes.WishlistComponent) , title:"Wishlist"},
        {path:"productDetails/:p_id" , component:ProductDetailsComponent , title:"product-details"},
        {path:"shippingAddress/:cart_id" , loadComponent:()=>import('../components/shipping-address/shipping-address.component').then(classes=>classes.ShippingAddressComponent) , title:"shipping-address"},
        {path:"allorders" , loadComponent:()=>import('../components/allorders/allorders.component').then(classes=>classes.AllordersComponent) , title:"allorders"},

    ]},
    {path:"**", component:NotFoundComponent , title:"Not Found"}
];
