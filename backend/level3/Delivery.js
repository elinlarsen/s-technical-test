class Delivery {

    constructor(carrier, pack, countryDistance){
        this.carrier=carrier 
        this.pack=pack
        this.countryDistance=countryDistance
        this.delivery={}
    }

    //function found on stakeoverflow
    changeDateFormat(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    isSpecialDayPresent(dayNumber, extraDay=0){

        let shippingDateFormat = new Date(this.pack.shipping_date);
        let basicDeliveryDate= new Date(this.getDeliveryDate(0 +extraDay))
        let dayPresent=false;
        for (let d = shippingDateFormat; d <= basicDeliveryDate; d.setDate(d.getDate() + 1)) {
            if (d.getDay()===dayNumber)dayPresent=true
        }
        return dayPresent
    }

     getDeliveryDate(nbHolydays){
        let shippingDateFormat = new Date(this.pack.shipping_date);
        let newDate= new Date(this.pack.shipping_date)
        let newDay=shippingDateFormat.getDate() +1  + this.carrier.delivery_promise + nbHolydays;  
        return this.changeDateFormat(newDate.setDate(newDay)) // setDate takes care of edge cases
    }


    computerDistanceInDays(){
        let distance=this.countryDistance[this.pack.origin_country][this.pack.destination_country] 
        return Math.floor((distance)/this.carrier.oversea_delay_threshold)
    }

    getDelivery(){
        let overseaDelay=0;
        let nbHolydays=0;
        let sundayPresent=this.isSpecialDayPresent(0)            
        let saturdayPresent=this.isSpecialDayPresent(6)
    
        if(sundayPresent) {
            nbHolydays+=1;
            let saturdayAndSundayPresent = this.isSpecialDayPresent(6, 1)                 
            if(this.carrier.saturday_deliveries===false && saturdayAndSundayPresent) 
                {nbHolydays+=1}
        }
        else if(sundayPresent===false && this.carrier.saturday_deliveries===false && saturdayPresent)
            {nbHolydays+=1}

        overseaDelay=this.computerDistanceInDays()
        nbHolydays+=overseaDelay  
        
        this.delivery.package_id=this.pack.id
        this.delivery.expected_delivery=this.getDeliveryDate(nbHolydays) 
        this.delivery.oversea_delay=overseaDelay  
        
        return this.delivery
    }
}

module.exports=Delivery
