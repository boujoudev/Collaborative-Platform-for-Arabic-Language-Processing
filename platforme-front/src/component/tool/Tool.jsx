import React, { useState } from "react";

function Tool() {
    const [likesTool, setLikesTool] = useState(100);
    const [likedTool, setLikedTool] = useState(false);
    const [dislikedTool, setDisLikedTool] = useState(true);

    const handleLike = () => {
        if (likedTool) {
        setLikesTool(likesTool - 1);
        setLikedTool(!likedTool);
        } else {
        setLikesTool(likesTool + 1);
        setLikedTool(!likedTool);
        }
    };
    const handleDislike = () => {
        if (dislikedTool) {
        setLikesTool(likesTool - 1);
        setDisLikedTool(!dislikedTool);
        } else {
        setLikesTool(likesTool + 1);
        setDisLikedTool(!dislikedTool);
        }
    };
    return (
        <div
        className="Tool"
        style={{
            marginBottom: "10px",
            borderRadius: "5px",
            boxShadow: " 1px 1px 2px 2px rgb(181, 181, 190)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }}
        >
        <div
            className="EntetToolPublie"
            style={{
            display: "flex",
            flexDirection: "row",
            margin: "5px",
            alignItems: "flex-start",
            }}
        >
            <img
            style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                paddingTop: "5px",
                paddingBottom: "0px",
            }}
            src="image.jpg"
            alt=""
            />
            <div>
            <p
                style={{
                margin: "0px",
                paddingTop: "7px",
                paddingLeft: "3px",
                fontSize: "12px",
                "font-family": "Arial , sans-serif",
                }}
            >
                Name de chercheur
            </p>
            <p
                style={{
                color: "gray",
                margin: "0px",
                paddingLeft: "5px",
                fontSize: "10px",
                "font-family": "Arial , sans-serif",
                }}
            >
                date de publication
            </p>
            </div>
            <button
            style={{
                border: "none",
                backgroundColor: "white",
                marginLeft: "auto",
                marginTop: "0px",
                paddingTop: "0px",
                paddingBottom: "0px",
                cursor: "pointer",
            }}
            >
            <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
        <div className="ToolContent">
            <div
            className="ToolTitre"
            style={{
                fontSize: "14px",
                fontFamily: "Arial , sans-serif",
                fontWeight: "bold",
                color: "black",
                padding: "5px",
                paddingLeft: "15px",
                margin: "0px",
            }}
            >
            tal
            </div>
            <p className="ToolText">
            TextContehhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhh
            hhhhhhhhhhhnt
            </p>
        </div>
        <hr
            style={{
            width: "500px",
            height: "1px",
            backgroundColor: "black",
            border: "none",
            }}
        />

        <div
            className="LikeCommentShareProjects"
            style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            margin: "10px",
            padding: "0px",
            }}
        >
            <button
            style={{
                marginLeft: "10px",
                width: "80px",
                height: "30px",
                backgroundColor: "rgb(230, 230, 230)",
                border: "1px solid gray",
                borderRadius: "10px",
            }}
            >
            <button
                onClick={handleLike}
                style={{
                cursor: "pointer",
                backgroundColor: "rgb(230, 230, 230)",
                border: "0px",
                padding: "0px",
                width: "20px",
                }}
            >
                <i class="fa-regular fa-circle-up"></i>
            </button>
            {likesTool}
            <button
                onClick={handleDislike}
                style={{
                cursor: "pointer",
                backgroundColor: "rgb(230, 230, 230)",
                border: "0px",
                padding: "0px",
                width: "20px",
                }}
            >
                <i class="fa-regular fa-circle-down"></i>
            </button>
            </button>
            <button
            style={{
                marginLeft: "10px",
                width: "80px",
                height: "30px",
                backgroundColor: "rgb(230, 230, 230)",
                border: "1px solid gray",
                borderRadius: "10px",
                cursor: "pointer",
            }}
            >
            <i class="fa-regular fa-comment"></i> NBc
            </button>
            <button
            style={{
                marginLeft: "10px",
                width: "80px",
                height: "30px",
                backgroundColor: "rgb(230, 230, 230)",
                border: "1px solid gray",
                borderRadius: "10px",
                cursor: "pointer",
            }}
            >
            <i class="fa-regular fa-share-from-square"></i> Share
            </button>
        </div>
        </div>
    );
}

export default Tool;
