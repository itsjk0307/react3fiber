import React from "react";

function Popup({ visible, onHide }) {
  const popupStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const dialogStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
  };

  return (
    visible && (
      <div style={popupStyle}>
        <div style={dialogStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h2 style={{ margin: 0 }}>Details about Apartment</h2>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onHide}
            >
              Close
            </button>
          </div>
          <div>
            <img
              src={require("../public/popup.png").default}
              alt="Floor Plan"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <h3>Parts with problems</h3>
            <p>
              Here you can get some information about your desired floor. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed ac elit non
              orci gravida posuere.
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default Popup;
