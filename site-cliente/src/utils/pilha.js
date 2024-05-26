class PilhaObj {
    // Atributos
    constructor(capacidade) {
        this.pilha = new Array(capacidade);
        this.topo = -1;
    }

    // Método isEmpty
    isEmpty() {
        return this.topo === -1;
    }

    // Método isFull
    isFull() {
        return this.topo === this.pilha.length - 1;
    }

    // Método push
    push(info) {
        if (this.isFull()) {
            throw new Error("Pilha cheia!");
        } else {
            this.pilha[++this.topo] = info;
        }
    }

    // Método pop
    pop() {
        if (this.isEmpty()) {
            throw new Error("Pilha vazia");
        }
        return this.pilha[this.topo--];
    }

    // Método peek
    peek() {
        if (this.isEmpty()) {
            throw new Error("Pilha vazia");
        }
        return this.pilha[this.topo];
    }

    // Método exibe
    exibe() {
        for (let i = this.topo; i >= 0; i--) {
            console.log(this.pilha[i]);
        }
    }

    // Getter para topo
    getTopo() {
        if (this.isEmpty()) {
            return -1;
        }
        return this.topo + 1;
    }
}

export {PilhaObj};
