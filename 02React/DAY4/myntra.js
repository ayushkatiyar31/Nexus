import React from "react";
import ReactDOM from "react-dom/client"


// Header
// Body
// Footer

function Card(props){
    return (
        <div style={{border:"2px solid black", padding:"2px"}}>
            <img src="https://printify.com/wp-content/uploads/2022/07/Custom-T-Shirts-Womens-T-Shirts.jpg" height="200px" width="200px" />
            <div style={{textAlign:"center"}}>
                <h2>{props.cloth}</h2>
                <h1>{props.offer}</h1>
                <h2>Shop Now</h2>
            </div>
        </div>
    )
}

const arr = [{cloth:"Tshirt", Offer:"20-40%Off"},{cloth:"Pant", Offer:"30-50%Off"},{cloth:"Skirt", Offer:"10-20%Off"},{cloth:"Kurta", Offer:"30-60%Off"},{cloth:"Patloon", Offer:"11-40%Off"},{cloth:"Shoes", Offer:"40-60%Off"},{cloth:"Shirt", Offer:"10-20%Off"}]



function App(){
  return(
     
    // Header
    // Body
    <div style={{display:"flex", gap:"10px" , flexWrap:"wrap"}}>
        <div className="heading">
        
        <img className="images" src="https://images.indianexpress.com/2021/01/myntra.png" height="80px" width="80px"/>
        <div className="option">
          <button className="but">Men</button>
          <button className="but">Women</button>
          <button className="but">Kids</button>
          <button className="but">Home and Living</button>
          <button className="but">Beauty</button>
          <button className="but">Studio</button>
        </div>
  
        <input className="searchbar" placeholder="Search for products brands and more"></input>
  
        <div className="Profile">
          <button className="pro">Profiles</button>
          <button className="pro">Wishlist</button>
          <button className="pro">Bag</button>
        </div>
      </div>
    )
        {
          arr.map((value,index)=> <Card key={index} cloth={value.cloth} offer={value.Offer}/>)   
        }
       
    </div>


    // footer
  )
}

// [<Card/>,<Card/>,<Card/>,<Card/>,<Card/>,<Card/>]


const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(<App/>);
