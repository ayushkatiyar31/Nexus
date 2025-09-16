function placeOrder(cart){
    console.log("Talking with Domino's");
     
    const pr = new Promise(function(resolve,reject){
        setTimeout(()=>{
           const food_available = true;
            if(food_available){
                console.log("Order Placed Successfully");
                const order = {orderId: 221 , food: cart , restaurant: "Dominos", location:"Dwarka"}
                resolve(order);
            }
            else{
                reject("Items Out of Stock");
            }
        },2000)
    })

    return pr;
}

function preparingOrder(order){
    console.log("Pizza preparation started....");

    const pr = new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log("Pizza preparation Done");
            const foodDetails = {token: 12 , restaurant: order.restaurant, location: order.location};
            resolve(foodDetails);
        },5000)
    })

    return pr;
}

function pickupOrder(foodDetails){
    console.log("Reaching restaurant for picking order")
    
    const pr = new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log("Order picked up by Delivery Boy");
            const droplocation = foodDetails.location;
            resolve(droplocation);
        },3000)
    })

    return pr;   
}

function deliverOrder(droplocation){
    console.log("Delivery boy on the way");

    return new Promise((resolve) => {
        setTimeout(()=>{
            console.log("Order Delivered successfully to " + droplocation);
            resolve();
        },5000)
    });
}

 
const cart = ["Margherita Pizza", "Coke"];

placeOrder(cart)
.then(order => preparingOrder(order))
.then(foodDetails => pickupOrder(foodDetails))
.then(droplocation => deliverOrder(droplocation))
.catch(error => console.log(error));
