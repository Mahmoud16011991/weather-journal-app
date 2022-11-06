//Express to run server and routes
const express=require('express')
const app=express()

const cors=require('cors')
app.use(cors())
//Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Initialize the main project folder
app.use(express.static('website'));
app.use(express.json())

//a server that listens on port 5000
app.listen(5000,()=>{console.log('server is running')})

app.post('/serverData',(request,response)=>{
    projectData=request.body
    response.json({msg:'done'})
})

app.get('/getData',(request,response)=>{
    response.json(projectData)
})
