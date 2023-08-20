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

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { 
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submit(){
    const formsValues = this.formulario.value;
    const contato : Contato = new Contato(formsValues.nome, formsValues.email);

    this.service.save(contato).subscribe( resposta => {
      this.contatos.push(resposta);
      console.log(this.contatos)
    })
  }

}
