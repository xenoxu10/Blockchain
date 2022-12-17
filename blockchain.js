const {Genesis_data}=require("./config")
const cryptohash=require('./crypto-hash')

const blockchain = require(".");
const hexToBinary = require("hex-to-binary");

const Minerate=10;
class Block{
    constructor({timestamp,prevhash,hash,data,nonce,difficulty})
    {
        this.timestamp=timestamp;
        this.prevhash=prevhash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }
    static genesis(){
        return new this(Genesis_data)
    }
    static mineblock(Block,data){
      let timestamp,hash;
      let _prevhash=Block.hash;
      let nonce=0;
      let difficulty;
      do{
        nonce++;
        timestamp=Date.now();
        difficulty=this.adjustDifficulty(Block,timestamp);
        hash=cryptohash(nonce,data,timestamp,difficulty);
      }while(hexToBinary(hash).substring(0,difficulty)!=="0".repeat(difficulty))
        
        return new this({
            timestamp: timestamp,
            prevhash: _prevhash,
            hash : hash,
            data: data,
            nonce: nonce,
            difficulty: difficulty
      
        })

    }
    static adjustDifficulty(Block,timestamp){
        const difficulty=Block.difficulty;
        const difference=timestamp-Block.timestamp;
        if(difference>Minerate)
        {
            return difficulty-1;
        }
        else if(difference<=Minerate)
        {
            return difficulty+1;
        }
        
    

    }
   
    
}
module.exports=Block;
