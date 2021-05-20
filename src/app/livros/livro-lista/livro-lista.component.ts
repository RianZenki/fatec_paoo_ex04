import { Component, OnInit, OnDestroy } from '@angular/core';
import { Livro } from '../livro.model'
import { LivroService } from '../livro.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit, OnDestroy {

  livros: Livro[] = []
  private livrosSubscription: Subscription = new Subscription
  public estaCarregando = false

  constructor(public livroService: LivroService) { }

  ngOnInit(): void {
    this.estaCarregando = true
    this.livroService.getLivros()

    this.livrosSubscription = this.livroService
      .getListaDeLivrosAtualizadaObservable()
      .subscribe((livros: Livro[]) => {
        this.estaCarregando = false
        this.livros = livros
      })
  }

  ngOnDestroy(): void {
    this.livrosSubscription.unsubscribe()
  }

  onDelete(objectId: string): void {
    this.livroService.removerLivro(objectId)
  }

}
