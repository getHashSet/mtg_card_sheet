import React from 'react'

export default function Footer() {
    return (
        <div className="footer_root" style={footerStyle}>
            <p>Currently Disabled. Sideboard, Tokens, Search &amp; Preview -- &nbs;</p>
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