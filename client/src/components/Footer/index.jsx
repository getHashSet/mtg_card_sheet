import React from 'react'

export default function Footer() {
    return (
        <div className="footer_root" style={footerStyle}>
            <p>&copy; 2020</p>
        </div>
    )
}

const footerStyle = {
    width: "100%",
    minHeight: "40px",
    backgroundColor: "#2d3436",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}