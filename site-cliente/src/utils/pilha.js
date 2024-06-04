// pilha.js
export class PilhaObj {
    constructor(tamanho) {
        this.tamanho = tamanho;
        this.pilha = [];
    }

    push(element) {
        if (this.pilha.length < this.tamanho) {
            this.pilha.push(element);
        } else {
            throw new Error("Pilha cheia");
        }
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Pilha vazia");
        }
        return this.pilha.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.pilha[this.pilha.length - 1];
    }

    isEmpty() {
        return this.pilha.length === 0;
    }

    getTopo() {
        return this.pilha.length;
    }

    serialize() {
        return JSON.stringify(this.pilha);
    }

    deserialize(serializedPilha) {
        this.pilha = JSON.parse(serializedPilha);
    }
}
