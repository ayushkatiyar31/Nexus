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



const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(<App/>);
