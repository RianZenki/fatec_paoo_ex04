import { Injectable } from '@angular/core'
import { Livro } from './livro.model'
import { map } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root'})
export class LivroService {
  private livros: Livro[] = []
  private listaLivrosAtualizada = new Subject<Livro[]>()

  constructor(private httpClient: HttpClient) {

  }

  getLivros(): void {
      this.httpClient.get <{mensagem: String, livros: any}> ('http://localhost:3000/api/livros')
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

  getLivro(idLivro: string){
    return this.httpClient.get<{_id:string, id: string, titulo:string, autor:string, nroPaginas:string}>(`http://localhost:3000/api/livros/${idLivro}`)
  }

  adicionarLivro(id: String, titulo: String, autor: string, nroPaginas: String) {
    const livro: Livro = {
      objectId: null,
      id: id,
      titulo: titulo,
      autor: autor,
      nroPaginas: nroPaginas
    }
    this.httpClient.post <{mensagem: string, objectId: string}> ('http://localhost:3000/api/livros', livro)
        .subscribe(
          (dados) => {
            livro.objectId = dados.objectId
            this.livros.push(livro)
            this.listaLivrosAtualizada.next([...this.livros])
          }
        )
  }

  removerLivro(objectId: string): void {
    this.httpClient.delete(`http://localhost:3000/api/livros/${objectId}`).subscribe(() => {
      this.livros = this.livros.filter((livro) => {
        return livro.objectId !== objectId
      })
      this.listaLivrosAtualizada.next([...this.livros])
    })
  }

  AtualizarLivro(objectId:string, id:string, titulo:string, autor: string, nroPaginas: string) {
    const livro: Livro = {objectId, id, titulo, autor, nroPaginas}
    this.httpClient.put(`http://localhost:3000/api/livros/${objectId}`, livro)
    .subscribe(res => {
      const copia = [...this.livros]
      const indice = copia.findIndex(liv => liv.objectId === livro.objectId)
      copia[indice] = livro
      this.livros = copia
      this.listaLivrosAtualizada.next([...this.livros])
    })
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable()
  }


}
