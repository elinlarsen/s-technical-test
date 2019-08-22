class Deliveries {

    constructor(carriersInfo){
        this.carriers=carriersInfo.carriers; 
        this.packages=carriersInfo.packages;
        this.deliveries={}
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

    isSpecialDayPresent(dayNumber, shippingDate, deliveryPromise){
        let shippingDateFormat = new Date(shippingDate);
        let basicDeliveryDate= new Date(this.getDeliveryDate(shippingDate, deliveryPromise,0))
        let dayPresent=false;
        for (let d = shippingDateFormat; d <= basicDeliveryDate; d.setDate(d.getDate() + 1)) {
            if (d.getDay()===dayNumber)dayPresent=true
        }
        return dayPresent
    }

    getDeliveryDate(shippingDate, deliveryPromise, nbHolydays){
        let shippingDateFormat = new Date(shippingDate);
        let newDate= new Date(shippingDate)
        let newDay=shippingDateFormat.getDate() +1  + deliveryPromise + nbHolydays;  
        return this.changeDateFormat(newDate.setDate(newDay)) // setDate takes care of edge cases
    }

    sortByPackageId(deliveries){
        return deliveries.sort( (a,b) => a.package_id -b.package_id )
    }

    getDeliveries(){
        let deliveries=[]
        this.carriers.forEach( (carrier)=>{
            this.packages.forEach( (pack) => {
                let delivery={}
                let finalDelivery=new Date()
                let nbHolydays=0;
                if(carrier.code === pack.carrier ){
                    delivery.package_id=pack.id
                    let sundayPresent=this.isSpecialDayPresent(0, pack.shipping_date, carrier.delivery_promise)            
                    let saturdayPresent=this.isSpecialDayPresent(6, pack.shipping_date, carrier.delivery_promise)
                
                    if(sundayPresent) {
                        nbHolydays+=1;
                        let saturdayAndSundayPresent = this.isSpecialDayPresent(6, pack.shipping_date, carrier.delivery_promise+1)                 
                        if(carrier.saturday_deliveries===false && saturdayAndSundayPresent) {nbHolydays+=1}
                    }
                    else if(sundayPresent===false && carrier.saturday_deliveries===false && saturdayPresent){nbHolydays+=1}

                    finalDelivery=this.getDeliveryDate(pack.shipping_date,carrier.delivery_promise, nbHolydays)    

                    delivery.expected_delivery=finalDelivery
                    deliveries.push(delivery) 
                    
                }
            })
        })
        this.deliveries={"deliveries" : this.sortByPackageId(deliveries)}
        return this.deliveries
    }

}

module.exports=Deliveries
