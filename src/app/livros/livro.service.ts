import { Injectable } from '@angular/core'
import { Livro } from './livro.model'
import { map } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root'})
export class LivroService {
  private livros: Livro[] = []
  private listaLivrosAtualizada = new Subject<Livro[]>()

  constructor(private httpCLient: HttpClient) {

  }

  getLivros(): void {
      this.httpCLient.get <{mensagem: String, livros: any}> ('http://localhost:3000/api/livros')
      .pipe(map((dados) => {
        return dados.livros.map((livro: any) => {
          return {
            objectId: livro._id,
            id: livro.id,
            titulo: livro.titulo,
            autor: livro.autor,
            nroPaginas: livro.nroPaginas

          }
        })
      }))
      .subscribe(
        (livros) => {
          this.livros = livros
          this.listaLivrosAtualizada.next([...this.livros])
        }
      )
    }

  adicionarLivro(id: String, titulo: String, autor: string, nroPaginas: String) {
    const livro: Livro = {
      objectId: null,
      id: id,
      titulo: titulo,
      autor: autor,
      nroPaginas: nroPaginas
    }
    this.httpCLient.post <{mensagem: string, objectId: string}> ('http://localhost:3000/api/livros', livro)
        .subscribe(
          (dados) => {
            livro.objectId = dados.objectId
            this.livros.push(livro)
            this.listaLivrosAtualizada.next([...this.livros])
          }
        )
  }

  removerLivro(objectId: string): void {
    this.httpCLient.delete(`http://localhost:3000/api/livros/${objectId}`).subscribe(() => {
      this.livros = this.livros.filter((livro) => {
        return livro.objectId !== objectId
      })
      this.listaLivrosAtualizada.next([...this.livros])
    })
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable()
  }

}
