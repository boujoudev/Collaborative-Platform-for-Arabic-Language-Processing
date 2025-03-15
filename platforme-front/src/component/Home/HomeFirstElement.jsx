import React from "react";

const HomeFirstElement = () => {
    return (
        <div className="AccueilEnTete">
        <h2 style={{ "font-family": "Arial , sans-serif" , "marginBottom":"5px"}}>Home</h2>
        <div
            style={{
            margin:"0px",
            backgroundColor: "rgb(20, 50, 124)",
            color: "white",
            padding: "5px",
            borderRadius: "20px",
            }}
        >
            <h3 style={{ "font-family": "Arial , sans-serif" ,"margin":"5px" }}>Platform Name</h3>
            <p style={{ "font-family": "Arial" , "padding":"0px" ,"marginTop":"0px" , "marginBottom":"5px","marginLeft":"5px"}}>
                Share your discoveries and follow the latest advances in Arabic NLP.
            </p>
        </div>
        <div
            style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            <img
            style={{
                width: "35px",
                borderRadius: "50%",
                marginLeft: "10px",
                marginRight: "10px",
            }}
            src="image.jpg"
            alt=""
            />
            <input className="AccueilInput" type="text" placeholder="Share your discoveries, publications, or resources..." />
        </div>
        <div style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            }}>
            <button className="accueilButton"><i class="fa-solid fa-comments"></i> Forum</button>
            <button className="accueilButton"><i class="fa-solid fa-calendar-days"></i> Event</button>
            <button className="accueilButton">Resources</button>
        </div>
        </div>
    );
};

export default HomeFirstElement;
