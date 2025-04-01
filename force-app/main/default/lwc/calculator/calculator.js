import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {
 numberOne="";
 numberTwo="";
 result=0;

    // changeHandlerNumber1(event){
    //    this.number1=event.target.value;
    //    console.log("number1:", this.number1);
    // }
    // changeHandlerNumber2(event){
    //     this.number2=event.target.value;
    //     console.log("number2:", this.number2);
    // }
    //another way to write changeHandler
    changeHandler(event){
    //     let name= event.target.name;
    //     let value=event.target.value;
           let {name, value}=event.target;
           if(name==="number1"){
            this.numberOne=value;
           }
        else if(name==="number2"){
            this.numberTwo=value;
        }
           }


    calculateHandler(event){
         let labelment=event.target.label;
         if(labelment==="Add"){
            this.result=parseInt(this.numberOne) + parseInt(this.numberTwo);
         }
         else if(labelment==="Subtract"){
            this.result=parseInt(this.numberOne) - parseInt(this.numberTwo);
         }
         else if(labelment==="Divide"){
            this.result=parseInt(this.numberOne) / parseInt(this.numberTwo);
         }
         else if(labelment==="Multiply"){
            this.result=parseInt(this.numberOne) * parseInt(this.numberTwo);
         }
    }


    // addHandler(event){
    //     this.result=parseInt(this.number1) + parseInt(this.number2);
        
    // }
    // subtractHandler(event){
    //     this.result=parseInt(this.number1) - parseInt(this.number2);
    // }
    // multiplyHandler(event){
    //     this.result=parseInt(this.number1) * parseInt(this.number2);
    // }
    // divideHandler(event){
    //     this.result=parseInt(this.number1) / parseInt(this.number2);
    // }


}