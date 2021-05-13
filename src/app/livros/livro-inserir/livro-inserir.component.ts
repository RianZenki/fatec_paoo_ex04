import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Livro } from '../livro.model'
import { LivroService } from '../livro.service'

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css'],
})

export class LivroInserirComponent implements OnInit {

  private modo: string = "criar"
  private idLivro: string
  public livro: Livro

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLivro")) {
        this.modo = "editar"
        this.idLivro = paramMap.get("idLivro")
        this.livroService.getLivro(this.idLivro).subscribe(dadosLivro => {
          this.livro = {
            objectId: dadosLivro._id,
            id: dadosLivro.id,
            titulo: dadosLivro.titulo,
            autor: dadosLivro.autor,
            nroPaginas: dadosLivro.nroPaginas
          }
        })
      }
      else {
        this.modo = "criar"
        this.idLivro = null
      }
    })
  }

  constructor (private livroService: LivroService, public route: ActivatedRoute){}

    onSalvarLivro(form: NgForm) {

      if (form.invalid) return
      if (this.modo === "criar") {
        this.livroService.adicionarLivro(
          form.value.id,
          form.value.titulo,
          form.value.autor,
          form.value.nroPaginas
        )
      }
      else {
        this.livroService.AtualizarLivro(
          this.idLivro,
          form.value.id,
          form.value.titulo,
          form.value.autor,
          form.value.nroPaginas
        )
      }

      form.resetForm()
    }
}
