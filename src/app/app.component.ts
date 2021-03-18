import { Component } from '@angular/core';
import { Livro } from './livros/livro.model'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  livros: Livro[] = []

  onAdicionarLivro(livro:Livro) {
    this.livros = [...this.livros, livro]
  }
}
