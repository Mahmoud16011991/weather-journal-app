//url open weather map , api key
const urlCode='https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey=',&appid=3280d7d5c82c3f56c762f1e152589214&units=metric'
    
const infoData=()=>{
   //zipcode , feelling
    const zip=document.getElementById('zip').value
    const feelings=document.getElementById('feelings').value
    //get date
    let d = new Date();
    let newDate = d.toDateString()

    return {zip,feelings,newDate}
}

const temperature=async(zip)=>{
    const response= await fetch(urlCode +zip+apiKey)
    const data=await response.json()
    const temp=data.main.temp
    return temp
}

const Tserver=async(temp,feelings,newDate)=>{
    await fetch('/serverData',{
        method:'post',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({temp,feelings,newDate}) 
    })
}

const Fserver=async()=>{
    const res=await fetch('/getData')
    const dataTwo=await res.json()
    return dataTwo
}

const UpDate=({temp,feelings,newDate})=>{
    document.getElementById('temp').innerHTML=temp
    document.getElementById('date').innerHTML=newDate
    document.getElementById('content').innerHTML=feelings
}

const weatherData=async()=>{
    try{
        //get zipcode , feeling and date
        const {zip,feelings,newDate} = infoData() 
       //get temperature 
        const temp= await temperature(zip)
       //send temperature,feeling ,date to server
        await Tserver(temp,feelings,newDate)
      //get data from server
        const data= await Fserver()
      //update UI
        UpDate(data)
    }catch(error){
        console.log(error)
    }
}
// click event button
document.getElementById('generate').addEventListener('click',weatherData)
