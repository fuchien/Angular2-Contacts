import { Component, EventEmitter, OnInit, Output, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover {
            cursor: pointer;
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {

    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>(); // x xChange [x]="" (xChanges)="" [(x)]=""

    contatos: Observable<Contato[]>
    private termoDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.contatos = this.termoDaBusca
            .debounceTime(400) //aguarde por 300ms para emitir novos eventos
            .distinctUntilChanged() //ignore se o proximo termo de busca for = ao anterior
            .switchMap(term => { //switchmap consegue cancelar as buscas antigas
                //console.log("Fez a busca", term);
                return term ? this.contatoService.search(term) : Observable.of<Contato[]>([])
                .catch(err => {
                    console.log(err);
                    return Observable.of<Contato[]>([]);
                });
            })

        this.contatos.subscribe((contatos: Contato[]) => {
            console.log("retornou do servidor: ", contatos);
        })
    }

    //SimpleChanges = traz os objetos que contem as propriedas que sao marcados no inputs que sao alteradas
    ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['busca'];
        //console.log(busca.currentValue);
        this.search(busca.currentValue);
    }

    search(termo: string): void {
        //console.log(termo);
        this.termoDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}