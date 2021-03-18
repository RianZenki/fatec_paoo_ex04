import { Component, EventEmitter, Output } from '@angular/core'
import { Livro } from '../livro.model'

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css'],
})

export class LivroInserirComponent {

  @Output() livroAdicionado = new EventEmitter<Livro>()

  id!: String
  titulo!: String
  autor!: String
  nroPaginas!: String

  onInserirLivro() {
    const livro: Livro = {
      id: this.id,
      titulo: this.titulo,
      autor: this.autor,
      nroPaginas: this.nroPaginas
    }
    this.livroAdicionado.emit(livro)
  }
}
