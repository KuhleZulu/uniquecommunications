import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

import { environment } from 'src/assets/environments/environment.prod';
import { CategoriesComponent } from './categories/categories.component';

import { FormsModule } from '@angular/forms';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      DashboardComponent,
      CategoriesComponent,
      AllPostComponent,
      NewPostComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        AngularEditorModule,
        HttpClientModule,
        CommonModule,
        AngularFireStorageModule,
],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }