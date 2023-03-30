var player = videojs("preview-player");

player.poster(
  "./assets/dftv.gif"
);
videojs(document.querySelector("video")).playlistUi();

//show & hide menu 1
$(document).ready(function () {
  $(".button").click(function () {
    $(".vjs-playlist").toggle(1000);
  });
});
