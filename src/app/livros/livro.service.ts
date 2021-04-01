import { Injectable } from '@angular/core'
import { Livro } from './livro.model'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root'})
export class LivroService {
  private livros: Livro[] = []
  private listaLivrosAtualizada = new Subject<Livro[]>()

  constructor(private httpCLient: HttpClient) {

  }

  getLivros(): void {
      this.httpCLient.get <{mensagem: String, livros: Livro[]}> ('http://localhost:3000/api/livros').subscribe(
        (dados) => {
          this.livros = dados.livros
          this.listaLivrosAtualizada.next([...this.livros])
        }
      )
    }

  adicionarLivro(id: String, titulo: String, autor: string, nroPaginas: String) {

    const livro: Livro = {
      id: id,
      titulo: titulo,
      autor: autor,
      nroPaginas: nroPaginas
    }
    this.httpCLient.post <{mensagem: string}> ('http://localhost:3000/api/livros', livro)
        .subscribe(
          (dados) => {
            console.log(dados.mensagem)
            this.livros.push(livro)
            this.listaLivrosAtualizada.next([...this.livros])
          }
        )
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable()
  }

}
