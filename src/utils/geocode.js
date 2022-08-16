const request= require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmFsYWtpc2hvcmVhbnVzdXJpIiwiYSI6ImNsNm4yMm13MjA4eGozY3Fva3FucnEyZWcifQ.sR-Qryf9gVZ9WrUBzy0KcA&limit=1'
  
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback('unable to connect to location services!',undefined)
      }
      else if(response.body.features.length===0){
        callback('Unable to find location, please try another',undefined)
      }
      else{
        callback(undefined,{
          Latitude: response.body.features[0].center[1],
          Longitude: response.body.features[0].center[0],
          Location:response.body.features[0].place_name
        })
         
      }
  
    })
  
  }

  module.exports=geocode