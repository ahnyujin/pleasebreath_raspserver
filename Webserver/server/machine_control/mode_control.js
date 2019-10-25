
const solution_status = require('../model/solution_status');

const status_Inner = require('../model/status_Inner');
const status_Outer = require('../model/status_Outer');

const humidifier_status = require('../model/humidifier');
const humidifier_controler = require('../machine_control/humidifier_control');

const aircleaner_controler = require('../machine_control/aircleaner_control');
const aircleaner_status = require('../model/aircleaner');

const airconditioner_controler = require('../machine_control/airconditioner_control');
const airconditioner_status = require('../model/airconditioner');

function mode_control() {
  if(solution_status.mode==1){ // 일반 모드

  }
  if(solution_status.mode==2){ //영유아모드

  }
  else if(solution_status.mode==3){ //노인모드
    //실내 습기 40% 이하
    if(status_Inner.humid_Inner < 40){
      if(humidifier_status.power == 0){
        humidifier_controler.Humidifier_Power();
      }
      humidifier_controler.Humidifier_Speed(3);
    }

    else if(status_Inner.humid_Inner > 50){
      if(humidifier_status.power == 1){
          humidifier_controler.Humidifier_Power();
      }
    }

    else{
      humidifier_controler.Humidifier_Speed(1);
    }
    
    humidifier_controler.Humidifier_Send_command();

    //미세먼지
    if(status_Inner.pm10_Inner < 30 && status_Inner.pm25_Inner < 15){
      //최상의 상태
      if(aircleaner_status.power == 1){
        aircleaner_controler.Aircleaner_Power();
        aircleaner_status.power = 0;
      }
      console.log("Current Pm Best.. Power Off");


    }
    //최악의 상태
    else if(status_Inner.pm10_Inner >= 81 || status_Inner.pm25_Inner >= 36){
      if(aircleaner_status.power == 0){
        aircleaner_status.power = 1;
        aircleaner_controler.Aircleaner_Power();
      }
      console.log("Current Pm worst.. Power On");
      aircleaner_controler.Aircleaner_Speed(4);
      
    }
    //적정 상태
    else if(status_Inner.pm10_Inner <= 80 || status_Inner.pm25_Inner <= 35){
      if(aircleaner_status.power == 0){
        aircleaner_status.power = 1;
        aircleaner_controler.Aircleaner_Power();
      }
      console.log("Current Pm Normal.. Power On");
      aircleaner_controler.Aircleaner_Speed(2);
    }

    aircleaner_controler.Aircleaner_Send_command();

    //온도
    if(status_Inner.temp_Inner >= 26 && status_Inner.temp_Inner <= 28){
      //적정 상태
      if(Airconditioner.power == 0){
        aircleaner_controler.Aircleaner_Power();
      }
      console.log("Current Temp Normal.. ");
      aircleaner_controler.Aircleaner_Speed(coldtemp27);
    }
    else if(status_Inner.temp_Inner < 25){
      //낮은 기온
      aircleaner_controler.Aircleaner_Speed(coldtemp27);
    }
    else if(status_Inner.temp_Inner > 29){
      //높은 기온
      aircleaner_controler.Aircleaner_Speed(coldtemp27);
    }

    aircleaner_controler.Aircleaner_Send_command();

  }
}

module.exports = mode_control;
