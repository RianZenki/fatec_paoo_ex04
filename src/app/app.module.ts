import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatExpansionModule } from '@angular/material/expansion'

import { AppComponent } from './app.component';
import { LivroInserirComponent } from './livros/livro-inserir/livro-inserir.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LivroListaComponent } from './livros/livro-lista/livro-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    LivroInserirComponent,
    CabecalhoComponent,
    LivroListaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
