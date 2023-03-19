(function () {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0]; //Find the first script tag in the html
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); //Put this script tag before the first one

  var player; //The Youtube API player
  var playlist1 = $("#ytpl-player1").data("nk"), 
      playlist2 = $("#ytpl-player2").data("dh"), 
      playlist3 = $("#ytpl-player3").data("im"); 
  
  
var $ul = $("#ytpl-thumbs");
  var nowPlaying = "ytpl-playing";
  var nowPlayingClass = "." + nowPlaying;

  function getPlaylistData() {
    var apiKey ="AIzaSyDI4rWo_wVAxRZEIgF6_8sRZDj8OCOZZ38";
    var url ="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet";
    var data1 = {
      playlistId: playlist1, 
      key: apiKey,
      maxResults: 50
    };
        var data2 = {
      playlistId: playlist2, 
      key: apiKey,
      maxResults: 50
    };
        var data3 = {
      playlistId: playlist3, 
      key: apiKey,
      maxResults: 50
    };

    $.get(url, data1, function (e) {
      buildHTML(e.items);
    });
    $.get(url, data2, function (e) {
      buildHTML(e.items);
    });
    $.get(url, data3, function (e) {
      buildHTML(e.items);
    });
  }

  function buildHTML(data) {
    var list_data = "";

    data.forEach(function (e, i) {
      var item = e.snippet;

      if (item.thumbnails) {
        list_data +=
          '<li><button data-ytpl-index="' +
          i +
          '" data-ytpl-title="' +
          item.title +
          '" data-ytpl-desc="' +
          item.description +
          '"><p>' +
          item.title +
          '</p><img alt="' +
          item.title +
          '" src="' +
          item.thumbnails.medium.url +
          '"/></button></li>';
      }
    });

    $ul.html(list_data);
    //
    // $('.ytpl-flexslider').flexslider({
    // 	animation: "slide",
    // 	startAt: 0,
    // 	slideshow: false,
    // 	touch: true,
    // 	prevText: "",
    // 	itemWidth: "25%",
    // 	nextText: "",
    // 	pausePlay: !0,
    // 	pauseText: "Pause",
    // 	playText: "Play",
    // 	pauseOnHover: !0,
    // 	useCSS: true
    // })
  }

  // generate playlist items once main player has loaded
  function onPlayerReady(event) {
    getPlaylistData();
  }
  window.onYouTubeIframeAPIReady = function () {
    var player1 = new YT.Player("ytpl-player1",{
      height: "360",
      width: "640",
      playerVars: {
        listType: "playlist", 
        list: playlist1
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
    
    var player2 = new YT.Player("ytpl-player2",{
      height: "360",
      width: "640",
      playerVars: {
        listType: "playlist", 
        list: playlist2
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
    
    var player3 = new YT.Player("ytpl-player3",{
      height: "360",
      width: "640",
      playerVars: {
        listType: "playlist", 
        list: playlist3
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });

    function updateTitles($this) {
      $("#ytpl-title").text($this.data("ytpl-title"));
      $("#ytpl-desc").text($this.data("ytpl-desc"));
    }

    function onPlayerStateChange(e) {
      var $buttons = $ul.find("button");
      var currentIndex = player.getPlaylistIndex();

      // remove existing active class, add to currently playing
      if (e.data === YT.PlayerState.PLAYING) {
        $buttons.removeClass(nowPlaying);
        $buttons.eq(currentIndex).addClass(nowPlaying);
      }

      // if last video has finished playing
      if (
        e.data === YT.PlayerState.ENDED &&
        currentIndex === $buttons.length - 1
      ) {
        $buttons.removeClass(nowPlaying);
      }

      updateTitles($buttons.eq(currentIndex));
    }

    // handle playlist button click
    $(document).on(
      "click",
      '[data-ytpl-index]:not(".ytpl-playing")',
      function (e) {
        e.preventDefault();

        var $this = $(this);

        var index = $this.data("ytpl-index");

        updateTitles($this);

        if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
          player.cuePlaylist({
            listType: "playlist",
            list: playlistID,
            index: index,
            suggestedQuality: "hd720" //quality is required for cue to work, for now. https://code.google.com/p/gdata-issues/issues/detail?id=5411
          });
        } else {
          player.playVideoAt(index); //Play the new video, does not work for IOS 7
        }
      }
    );
  };
})();
