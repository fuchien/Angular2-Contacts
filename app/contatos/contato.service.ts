import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';
import { ServiceInterface } from './../interfaces/service.interface';

@Injectable()

export class ContatoService implements ServiceInterface<Contato> {

    private contatosUrl = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ) {}

    /**
     * getContatos(): 
     */

    findAll(): Promise<Contato[]> {
        console.log(this.contatosUrl);
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then((res: Response) => res.json().data as Contato[])
            .catch(this.handleError);
        //return Promise.resolve(CONTATOS);
    }

    find(id: number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Contato[]) => {
                return contatos.find((contato) => {
                    return contato.id === id;
                });
            });
    }

    create(contato: Contato): Promise<Contato> {
        return this.http
            .post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato> {
        const url = this.contatosUrl + '/' + contato.id;
        return this.http
            .put(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato> {
        const url = this.contatosUrl + '/' + contato.id;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        })
        .then(() => {
            console.log("Primeiro then");
            return "Curso angular 2";
        })
        .then((param: string) => {
            console.log("Segundo then");
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log("continuando depois de 4 segundos...");
                    resolve2();
                }, 4000);
            });
        })
        .then(() => {
            console.log('terceiro then');
            return this.findAll();
        });
    }

    search(term: string): Observable<Contato[]> {
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[]);
    }
}