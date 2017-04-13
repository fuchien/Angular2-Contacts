"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: "Chien", email: "chien@email.com", telefone: "(00) 0000-0000" },
            { id: 2, nome: "Mirna", email: "mirna@email.com", telefone: "(00) 0000-0000" },
            { id: 3, nome: "Bob", email: "bob@email.com", telefone: "(00) 0000-0000" },
            { id: 4, nome: "John", email: "john@email.com", telefone: "(00) 0000-0000" },
            { id: 5, nome: "Seu madruga", email: "madruga@email.com", telefone: "(00) 0000-0000" },
        ];
        return { contatos };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map