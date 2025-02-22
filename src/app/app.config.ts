import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { requestHeadersInterceptor } from '../core/interceptors/request-headers.interceptor';
import { resErrorInterceptor } from '../core/interceptors/res-error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from '../core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withViewTransitions(),withHashLocation()),
    importProvidersFrom(NgxSpinnerModule),
    provideToastr(),provideHttpClient(withFetch(),
    withInterceptors([requestHeadersInterceptor,resErrorInterceptor,loadingInterceptor])),
    provideClientHydration(),importProvidersFrom(BrowserAnimationsModule),
    provideAnimationsAsync()
  ]
};
