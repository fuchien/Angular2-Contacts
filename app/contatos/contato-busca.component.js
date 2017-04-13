"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const observable_1 = require("rxjs/observable");
const subject_1 = require("rxjs/subject");
const contato_service_1 = require("./contato.service");
let ContatoBuscaComponent = class ContatoBuscaComponent {
    constructor(contatoService, router) {
        this.contatoService = contatoService;
        this.router = router;
        this.buscaChange = new core_1.EventEmitter(); // x xChange [x]="" (xChanges)="" [(x)]=""
        this.termoDaBusca = new subject_1.Subject();
    }
    ngOnInit() {
        this.contatos = this.termoDaBusca
            .debounceTime(400) //aguarde por 300ms para emitir novos eventos
            .distinctUntilChanged() //ignore se o proximo termo de busca for = ao anterior
            .switchMap(term => {
            //console.log("Fez a busca", term);
            return term ? this.contatoService.search(term) : observable_1.Observable.of([])
                .catch(err => {
                console.log(err);
                return observable_1.Observable.of([]);
            });
        });
        this.contatos.subscribe((contatos) => {
            console.log("retornou do servidor: ", contatos);
        });
    }
    //SimpleChanges = traz os objetos que contem as propriedas que sao marcados no inputs que sao alteradas
    ngOnChanges(changes) {
        let busca = changes['busca'];
        //console.log(busca.currentValue);
        this.search(busca.currentValue);
    }
    search(termo) {
        //console.log(termo);
        this.termoDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }
    verDetalhe(contato) {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ContatoBuscaComponent.prototype, "busca", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ContatoBuscaComponent.prototype, "buscaChange", void 0);
ContatoBuscaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-busca',
        templateUrl: 'contato-busca.component.html',
        styles: [`
        .cursor-pointer:hover {
            cursor: pointer;
        }
    `]
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.Router])
], ContatoBuscaComponent);
exports.ContatoBuscaComponent = ContatoBuscaComponent;
//# sourceMappingURL=contato-busca.component.js.map