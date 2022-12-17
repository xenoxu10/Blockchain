const impblock=require('./index');
const newblock=new impblock;
newblock.addBlock("genesis")

const times=[];
for(let i=0;i<100;i++)
{
    let prevtimestamp,nextblock,newtimestamp,avgtime,timediff;
    prevtimestamp=newblock.chain[newblock.chain.length-1].timestamp;
    newblock.addBlock(`block ${i}`);
    nextblock=newblock.chain[newblock.chain.length-1];
    newtimestamp=nextblock.timestamp;
    timediff=newtimestamp-prevtimestamp;
    times.push(timediff);
    avgtime=times.reduce((total,num)=>total+num)/times.length;
    console.log(`timdiff: ${timediff}ms,  avgtime: ${avgtime}ms,   difficulty: ${nextblock.difficulty}`);
}

