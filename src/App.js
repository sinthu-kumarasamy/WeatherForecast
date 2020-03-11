import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//const APIKEY = 'f5053b76aad77de147b4304b22dd9fd8'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dailyData : [],
      c_date : null,
      isClicked :false,
      selected_unit:null
    }
  }
 
 render(){
    var {isLoaded,dailyData,isDisplay,c_date,isClicked,selected_unit} = this.state;
    var data = []; 
    var days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    var months =['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
    var weather = []
    var desc,icon;
    var getData = (event) => {
    var city_name = document.getElementById('city').value;
    var unit = document.getElementsByName('temp')
    for(var c=0;c<unit.length;c++){
      if(unit[c].checked){
          var units = unit[c].value;
          this.setState({selected_unit:unit[c].value});
      }
    }
     fetch('http://api.openweathermap.org/data/2.5/forecast?q='+city_name+',us&units='+units+'&appid=f5053b76aad77de147b4304b22dd9fd8')
     .then(res => res.json())
     .then(json => {
        this.setState({
            dailyData:json,
            isClicked:true
        })
     });
    event.preventDefault()
    }
    if(!isClicked){
      return <div className="city"><center><form onSubmit={getData}><b>Enter City:</b><input type="text" id="city" name="city"/>&nbsp;&nbsp;
      <b>Select Unit:<input type="radio" name="temp" value="imperial" />Fahrenhiet&nbsp;&nbsp;<input type="radio" name="temp" value="metric" />Celcius&nbsp;&nbsp;</b><input type="submit"/></form></center></div>
    }else{
      data = dailyData.list
      if(dailyData.cod == 404){
        return<div style={{padding:"300px"}}><center><h2>Data not available for given city</h2></center></div>
      }else{
        return(
          data.map(function(data,index){
              var date = new Date(data['dt_txt'])
              var day = date.getDate()
              var month = date.getMonth()
              var hours = date.getHours()
              var mrng = date.getHours()>0?date.getHours()+"AM":date.getHours()+12+"AM"
              var noon = date.getHours()>12?date.getHours()-12+"PM":date.getHours()+"PM"
              weather = data['weather']
              weather.map(function(weather,index){
                  desc = weather['description']
                  icon = weather['icon']
              })
              if(index%8===0){
                return(<Link to={{pathname:"/weather",state:[{c_date:days[date.getDay()],dailyData:dailyData.list,selected_unit:selected_unit}]}}><div className="date"> 
                  <p>{days[date.getDay()]}&nbsp;<b>{months[month]}&nbsp;{day<10?"0"+day:day}&nbsp;&nbsp;{hours>=12?noon:mrng}</b><img src={'http://openweathermap.org/img/wn/'+icon+'.png'}></img></p>
                  <p><b>High Temperature:</b><i>{selected_unit=='metric'?Math.round(data.main['temp_min'])+"°C":Math.round(data.main['temp_min'])+"°F"}</i></p>
                  <p><b>Low Temperature:</b><i>{selected_unit=='metric'?Math.round(data.main['temp_max'])+"°C":Math.round(data.main['temp_max'])+"°F"}</i></p>
                  </div></Link>
                )
              }
           })
        )
      }
    }
  }
}
class Weather extends Component{

  constructor(props){
    super(props);
  }

    render(){
      var c_date = this.props.location.state[0].c_date;
      var data = this.props.location.state[0].dailyData; 
      var selected_unit = this.props.location.state[0].selected_unit;
      var days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
      var months =['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
      var weather = []
      var desc,icon;
      var refreshPage = ()=>{
        window.location.href = "/";
      }
      return(
        data.map(function(data,index){
            var date = new Date(data['dt_txt'])
            var day = date.getDate()
            var month = date.getMonth()
            var hours = date.getHours()
            var mrng = date.getHours()>0?date.getHours()+"AM":date.getHours()+12+"AM"
            var noon = date.getHours()>12?date.getHours()-12+"PM":date.getHours()+"PM"
            weather = data['weather']
            weather.map(function(weather,index){
                desc = weather['description']
                icon = weather['icon']
            })
            if(index%8!==0 && [days[date.getDay()]].toString()===c_date ){
              return(
               <div className="showData" onClick = {refreshPage}> 
                <p>{c_date}&nbsp;<b>{months[month]}&nbsp;{day<10?"0"+day:day}&nbsp;&nbsp;{hours>=12?noon:mrng}</b><img src={'http://openweathermap.org/img/wn/'+icon+'.png'}></img></p>
                <p><b>High Temperature:</b><i>{selected_unit=='metric'?Math.round(data.main['temp_min'])+"°C":Math.round(data.main['temp_min'])+"°F"}</i></p>
                  <p><b>Low Temperature:</b><i>{selected_unit=='metric'?Math.round(data.main['temp_max'])+"°C":Math.round(data.main['temp_max'])+"°F"}</i></p>
                </div>
              )
            } 
         })
       )
    }
}
export {App,Weather};


