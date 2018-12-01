let closeButton = document.getElementById("closeButton");

closeButton.addEventListener("click", () => {
  // close the viewer and return to the app.

  // window.close();
  window.top.closeOverlay();
});