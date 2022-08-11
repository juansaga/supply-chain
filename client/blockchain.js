const sha256script = document.createElement('script');
sha256script.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js';
document.head.appendChild(sha256script);

let mempool = []

;


class Blockchain{
    constructor(){
        this.chain = [{'index': 1,
        'nonce': 0,
        'timestamp': Date.now(),
        'data': null,
        'previousHash': '0'}];
    }

    createBlock(nonce, previousHash, data) {
        let block = {'index': this.chain.length + 1,
                    'nonce': nonce,
                    'timestamp': Date.now(),
                    'data': data,
                    'previousHash': previousHash};
        return block;
    }

    getPreviousBlock(){
        return this.chain[this.chain.length - 1];
    }

    mine(){
        let nonce = 0;
        let checkProof = false;
        let previousHash = this.hash(this.getPreviousBlock());
        let data = mempool;
        let block = this.createBlock(nonce, previousHash, data);
        while (checkProof == false){            
           let hashOperation = this.hash(block);
            if (hashOperation.slice(0,4) == '0000'){
                checkProof = true;
                this.chain.push(block);
                mempool = []
            } else{
                block.nonce++;
            }
        }
    }

    hash(block){
        return sha256(JSON.stringify(block));
    }

    isChainValid(chain){
        let blockIndex = 1;
        let previousBlock = chain[0];
        while (blockIndex < chain.length){
            let block = chain[blockIndex];
            if (block['previousHash'] != this.hash(previousBlock)){
                return false;
            }
            previousBlock = block;
            blockIndex++;
        }
        return true;
    }
}

let blockchain = new Blockchain;