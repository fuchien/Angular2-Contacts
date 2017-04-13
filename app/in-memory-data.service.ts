import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contato } from './contatos/contato.model';

export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        let contatos: Contato[] = [
            {id: 1, nome: "Chien", email: "chien@email.com", telefone: "(00) 0000-0000"},
            {id: 2, nome: "Mirna", email: "mirna@email.com", telefone: "(00) 0000-0000"},
            {id: 3, nome: "Bob", email: "bob@email.com", telefone: "(00) 0000-0000"},
            {id: 4, nome: "John", email: "john@email.com", telefone: "(00) 0000-0000"},
            {id: 5, nome: "Seu madruga", email: "madruga@email.com", telefone: "(00) 0000-0000"},
        ];

        return {contatos};
    }
}