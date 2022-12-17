const Block = require('./blockchain');
const block=require('./blockchain')
const {Genesis_data}=require("./config")
const cryptohash=require('./crypto-hash')


class blockchain
{
    constructor()
    {
        this.chain=[block.genesis()];
    }
    addBlock(data)
    {
        const newblock=block.mineblock(this.chain[this.chain.length-1],data )
        this.chain.push(newblock)
    }
    static isValid(chain)
    {
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){
            return  false
        }
        for(let i=1;i<chain.length;i++)
        {
            const {timestamp,prevhash,hash,nonce,difficulty,data}=chain[i];
            const realhash=chain[i-1].hash;
            if(prevhash!==realhash)
            {
                return false
            }
            const validatedHash=cryptohash(timestamp,prevhash,data,difficulty,nonce);
            if(hash!==validatedHash)
            {
                return false
            }
            return true;

        }

    }
    checkchain(chain){
        if(this.chain.length>=chain.length){
            console.log("low chain")
        }
        else if(this.chain.length<chain.length){
            this.chain=chain
        }
    }

}



module.exports=blockchain;




