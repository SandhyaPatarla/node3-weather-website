const request=require('request')

const forecast=(lat,long,callback)=>{
    //url:url-->shorthand url
    const url='http://api.weatherstack.com/current?access_key=12cae7b47e581cd84f19d58c889d9074&query='+lat+','+long+'&units=f'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services!',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location, please try another',undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0]+' current temperature is: '+response.body.current.temperature+' feels like: '+response.body.current.feelslike)
        }
    })
}

module.exports=forecast