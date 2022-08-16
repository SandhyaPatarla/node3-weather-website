const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msgOne=document.querySelector('#Message-1')
const msgTwo=document.querySelector('#Message-2')


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location=search.value
    msgOne.textContent='Loading...'
    msgTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.message){
            msgOne.textContent=data.message
        }
        else{
            msgOne.textContent=data.Forecast
            msgTwo.textContent=data.Location
        }
    })
})
})