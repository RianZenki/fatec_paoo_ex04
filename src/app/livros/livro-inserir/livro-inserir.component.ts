import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
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
  public estaCarregando: boolean = false
  form: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      titulo: new FormControl(null, {
        validators: [Validators.required]
      }),
      autor: new FormControl(null, {
        validators: [Validators.required]
      }),
      nroPaginas: new FormControl(null, {
        validators: [Validators.required]
      })

    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLivro")) {
        this.modo = "editar"
        this.idLivro = paramMap.get("idLivro")
        this.estaCarregando = true
        this.livroService.getLivro(this.idLivro).subscribe(dadosLivro => {
          this.estaCarregando = false
          this.livro = {
            objectId: dadosLivro._id,
            id: dadosLivro.id,
            titulo: dadosLivro.titulo,
            autor: dadosLivro.autor,
            nroPaginas: dadosLivro.nroPaginas
          }
          this.form.setValue({
            id: this.livro.id,
            titulo: this.livro.titulo,
            autor: this.livro.autor,
            nroPaginas: this.livro.nroPaginas
          })
        })
      }
      else {
        this.modo = "criar"
        this.idLivro = null
      }
    })
  }

  constructor (private livroService: LivroService, public route: ActivatedRoute){}

    onSalvarLivro() {

      if (this.form.invalid) return
      this.estaCarregando = true
      if (this.modo === "criar") {
        this.livroService.adicionarLivro(
          this.form.value.id,
          this.form.value.titulo,
          this.form.value.autor,
          this.form.value.nroPaginas
        )
      }
      else {
        this.livroService.AtualizarLivro(
          this.idLivro,
          this.form.value.id,
          this.form.value.titulo,
          this.form.value.autor,
          this.form.value.nroPaginas
        )
      }

      this.form.reset()
    }
}
