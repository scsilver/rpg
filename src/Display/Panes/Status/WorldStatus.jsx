import React from 'react';

const WorldStatus = (props) => {
    const { time } = props
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row-reverse"
            }}
        >
            <div
                style={{ display: "flex", padding: "10px", flexDirection: "column" }}
            >
                <h1 style={{ margin: 0 }}>Time</h1>
                <h3 style={{ margin: 0, lineHeight: 1.2, textAlign: "right" }}>
                    {time.toString().split(".")[0]}
                </h3>
            </div>
        </div>
    );
};

export default WorldStatus;