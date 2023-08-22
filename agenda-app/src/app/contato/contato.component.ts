import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos : Contato[] = [];
  colunas = ['foto', 'id', 'nome', 'email', 'favorito']

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { 
    this.montarFormulario();
    this.listaContatos();
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  listaContatos(){
    this.service.list().subscribe( response => {
      this.contatos = response;
    })
  }

  favoritar(contato : Contato){
    this.service.favorite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
  }

  submit(){
    const formsValues = this.formulario.value;
    const contato : Contato = new Contato(formsValues.nome, formsValues.email);

    this.service.save(contato).subscribe( resposta => {
      let lista: Contato[] = [... this.contatos, resposta];
      this.contatos = lista;
    })
  }

  uploadFoto(event, contato){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);  
      this.service.upload(contato, formData).subscribe( resposne => this.listaContatos());
    }
  }

}
