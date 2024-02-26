import React from "react";

function Footer() {
    var currentTime = new Date()
    var currentDate = currentTime.getFullYear()
  return (
    <footer>
      <p>Copyright ⓒ {currentDate}</p>
    </footer>
  );
}

export default Footer;