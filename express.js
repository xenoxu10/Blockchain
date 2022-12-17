const express=require('express');
const bodyparser=require('body-parser');
const request=require('request');
const myblockchain=require('./index');
const pubsub=require('./nodeChannels')
const obj=new myblockchain()
redblock=new pubsub(obj);
const default_PORT=3000;
setTimeout(()=>redblock.broadcastChain(),1000);
const root_node=`http://localhost:${default_PORT}`;

const syncChain=()=>
{
    request({url:`${root_node}/api`},(err,response,body)=>
    {
        if(!err && response.statusCode==200)
        {
            const rootchain=JSON.parse(body)
            obj.checkchain(rootchain);
        }

    })

}
const app=express();
app.use(bodyparser.json());
app.get("/api",(req,res)=>{
    res.json(obj.chain)
})

 let peer_port;
 console.log("hello")
 if(process.env.GENERATE_PEER_PORT=='true')
 {
    
    peer_port=default_PORT + Math.ceil(Math.random()*1000);
 }
 const PORT=peer_port || default_PORT;
app.listen(PORT,()=>{
    console.log(`listening to ${PORT}`);
    syncChain();
})
app.post('/api/mine',(req,res)=>
{
    const data=req.body;
    obj.addBlock(data);
    redblock.broadcastChain();
    res.redirect('/api')
})