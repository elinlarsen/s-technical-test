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

    getDeliveryDate(shippingDate, deliveryPromise){

        let shippingDateFormat = new Date(shippingDate);
        let newDate= new Date(shippingDate)
        let newDay=shippingDateFormat.getDate() +1  + deliveryPromise;  
        let res=this.changeDateFormat(newDate.setDate(newDay)) // setDate takes care of edge cases
        return res
    }

    sortByPackageId(deliveries){
        return deliveries.sort( (a,b) => a.package_id -b.package_id )
    }



    getDeliveries(){
        let deliveries=[]
        this.carriers.forEach( (carrier, index1)=>{
            this.packages.forEach( (pack, index2) => {
                let delivery={}
                if(carrier.code === pack.carrier ){
                    delivery.package_id=pack.id
                    delivery.expected_delivery=this.getDeliveryDate(pack.shipping_date,carrier.delivery_promise)
                    deliveries.push(delivery) 
                }
            })
        })
        this.deliveries={"deliveries" : this.sortByPackageId(deliveries)}
        return this.deliveries
    }

}

module.exports=Deliveries