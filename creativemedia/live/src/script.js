var proxy = {
    0: '',
};
window.addEventListener("load", function () {
  var o = $("#display-number");
  var p = $("#display-resources");
  p.html(
    "<center><p>⏳Loading TV Channels Please wait...</p><br/><div id='loading'></div></center>"
  );
  
  $.ajax({
    type: "GET",
    url: "123.json",
    success: function (a) {
      var b = 0;
      var c =
        "<br><table id='myTable' class='display' style=width:100%;background:#f30876;'><thead style='color:#ffffff;'><tr><th class='th-sm'>Logo</th><th class='th-sm'>Channel</th><th class='th-sm'>Category</th><th class='th-sm' style='display: none;'>Country / Language</th><th class='th-sm'>Live</th></thead><tbody></br>";
      var i, j, k, l;
      for (i in a) {
        for (j in a[i].categories) {
          var d = a[i].categories;
          var e = a[i].categories[j].slug;
        }
        for (k in a[i].country) {
          var f = a[i].country;
          var g = a[i].country[k].code;
        }
        for (l in a[i].languages) {
          var h = a[i].languages;
          var m = a[i].languages[l].code;
        }
        if (
          d !== "XXX" &&
          d !== "Religious" &&
          f !== "Israel" &&
          f !== "China" &&
          f !== "India" &&
          f !== "Iran"
        ) {
          b++;
          //var proxyUrl = "https:\/\/proxy2.vnxservers.com\/";
          //var deviceId = "deviceId=YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj-YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj-YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj-YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj-YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj-YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj-YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj-YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj";
          var deviceId = "deviceId=YzM0NDA0MTIt";
          c +=
            "<tr><td><img width='48' src='" +
            a[i].logo +
            "'/></td><td>" +
            a[i].name +
            "</td><td>" +
            d +
            "</td><td style='display:none;'>" +
            f +
            " / " +
            h +
            "</td><td><button class='btn' style='display:none;' data-clipboard-text='" +
            a[i].url +
            "'>Copy</button><button style='background:#000000;border:1px solid #ffffff;border-radius:3px;'><a style='text-decoration:none;color:#ffffff;' target='_self' href='" + proxy[0] + "https://donelfantastic.github.io/creativemedia/live/donelfantasticTV?play&mediaType=all&live=true&url=" +
            a[i].url + "?" + deviceId + "'>WATCH</a></button><span><button style='background:#f30876;border:1px solid #ffffff;border-radius:3px;'><a style='text-decoration:none;color:#ffffff;' target='_self' href='//donelfantastic.github.io/creativemedia/live/donelfantasticTV2?play&mediaType=all&live=true&url=" +
            a[i].url + "?" + deviceId + "'>WATCH</a></button></span><span><button style='background:#1eabe3;border:1px solid #ffffff;border-radius:3px;'><a style='text-decoration:none;color:#ffffff;' target='_self' href='//donelfantastic.pages.dev/creativemedia/tv/donelfans2024?play&mediaType=all&live=true&url=" + a[i].url + "?" + deviceId + "'>WATCH</a></button></span></td></tr>";
        }
      }
      c += "</tbody></table>";
//*      
//      var n =
//        "<br><span style='color:#000;'>Total Found: <strong style='color:#ff0000;'>" +
        b +
//        "</strong> channels.</span><br/><span style='color:#000;'>You can search by channel name, category, country or language! </span>";
//      o.html(n);
//*
      p.html(c);
      $("table").addClass("table");
      $("#myTable").DataTable();
    }
  });
  var q = new ClipboardJS(".btn");
});
