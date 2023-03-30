var player = videojs("preview-player");
player.eme();
const keyOptions = {
  "com.widevine.alpha":atob('aHR0cHM6Ly9kcm13aWRldmluZS5ub250b25ib2xhLm15LmlkL2h0dHBzOi8vbXJwdy5wdG1uYzAxLnZlcnNwZWN0aXZlLm5ldC8/ZGV2aWNlSWQ9TkRJek1ESmhabVV0WVdSak1pMHpOR0prTFRreU4yRXRZbUUxWkRGbFpXSXdPREV6') 
    
};

player.playlist([
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/RCTI-DD/sa_dash_vmx/RCTI-DD.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",

    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUgw3poEvqffuV_ZBTjXMDtMncR9YkPB02Q&usqp=CAU"
      }
    ],
    name: "RCTI"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/MNCTV-HD/sa_dash_vmx/MNCTV-HD.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHTz44aEpN64TV_kaU1fbMMxhwASeA21LMoA&usqp=CAU"
      }
    ],
    name: "MNCTV"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/TVOne-2/sa_dash_vmx/TVOne-2.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0y6vHMfNMZXLFBBhDzhOVGHC_UYq8CRAOuA&usqp=CAU"
      }
    ],
    name: "TVONE"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/NetTV-HD/sa_dash_vmx/NetTV-HD.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCO3j8RvxrIBvzdo_4Q3d_0LlIbxXtJ-yyw&usqp=CAU"
      }
    ],
    name: "NETTV"
  },
  {
    sources: [
      {
        src:
          "https://anevia115.mncnow.id/live/eds/PemersatuBangsa/sa_dash_vmx/PemersatuBangsa.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrRYBxN3oRs9gQSMQH3ccmYx3PyJ6-oVMiw&usqp=CAU"
      }
    ],
    name: "TVRI"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/Trans7-2/sa_dash_vmx/Trans7-2.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9xM1ctoNcaGLEJin1huJYbRSIp8tpxuh95g&usqp=CAU"
      }
    ],
    name: "TRANS7"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/TransTV-2/sa_dash_vmx/TransTV-2.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfgw5zzF3tjQ1YBHGKp7W8MwzH2GlxGkqzxw&usqp=CAU"
      }
    ],
    name: "TRANSTV"
  },
  {
    sources: [
      {
        //"https://donelfantastic.github.io/creativemedia/local/sctv.m3u8",
        src:
          "https://proxy.vnxservers.com/http://210.210.155.35/session/427e2bdc-ba60-11ed-8b6a-b82a72d63267/qwr9ew/s/s03/02.m3u8",
        type: "application/x-mpegURL"
        //keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqj5O7_KE08wFjOAYmNICX_CF9pIjdRPzhWg&usqp=CAU"
      }
    ],
    name: "SCTV"
  },
  {
    sources: [
      {
        //"https://donelfantastic.github.io/creativemedia/local/indosiar.m3u8",
        src:
          "https://proxy.vnxservers.com/http://210.210.155.35/session/ce979d3c-ba66-11ed-8b6a-b82a72d63267/qwr9ew/s/s04/02.m3u8",
        type: "application/x-mpegURL"
        //keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxkHEHSxjqoo0LssNO9HGWOVyspnvWddOU5w&usqp=CAU"
      }
    ],
    name: "INDOSIAR"
  },
  {
    sources: [
      {
        src: "https://av-live-cdn.mncnow.id/live/eds/ANTV/sa_dash_vmx/ANTV.mpd",
        type: "application/dash+xml"
        //keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewD1-_sitYWJ5KFPwQP1Te4tm7cIs1bW5rA&usqp=CAU"
      }
    ],
    name: "ANTV"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/GTV-HD/sa_dash_vmx/GTV-HD.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWuQY8T_Kcd46cTlkW6xMHi2MDyrOS9FcSA&usqp=CAU"
      }
    ],
    name: "GTV"
  },
  {
    sources: [
      {
        src: "https://av-live-cdn.mncnow.id/live/eds/RTV/sa_dash_vmx/RTV.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7PymtTpE7DTw2l9UPWUbvqM-0ImiRAz9hHA&usqp=CAU"
      }
    ],
    name: "RTV"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/KompasTV/sa_dash_vmx/KompasTV.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTebPn3SsRmKYQC11OWwBZxgtpG0OmAj8wAQ&usqp=CAU"
      }
    ],
    name: "KOMPASTV"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/Metro-TV2/sa_dash_vmx/Metro-TV2.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyfjZWnhguTAGZp_7vkunl4KcHtvtaV1_53A&usqp=CAU"
      }
    ],
    name: "METROTV"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/iNewsTV-HDD/sa_dash_vmx/iNewsTV-HDD.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwqkvqFAzLnnkRyqIAD4azC_d0KaonGbsF3Q&usqp=CAU"
      }
    ],
    name: "INEWSTV"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/IndonesiaMovieChannels-HD/sa_dash_vmx/IndonesiaMovieChannels-HD.mpd",
        //"https://cf-vod-cdn.mncnow.id/vod/storage2/kilau-konser-ikatan-cinta-nella-dory-2021-rev-clean-anv6-rev/_/sa_dash_vmx/kilau-konser-ikatan-cinta-nella-dory-2021-rev-clean-anv6-rev.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSonGR7J55dNACtxbgGm2GRHu08lQoyD8mcw&usqp=CAU"
      }
    ],
    name: "IMC"
  },
  {
    sources: [
      {
        src:
          "https://av-live-cdn.mncnow.id/live/eds/DAAITV/sa_dash_vmx/DAAITV.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojhCX_AuQjxM6jtYTmu9uLC3vgYUOaMHxAQ&usqp=CAU"
      }
    ],
    name: "DAAITV"
  },
  {
    sources: [
      {
        src:
          "https://anevia114.mncnow.id/live/eds/HBOFamily2/sa_dash_vmx/HBOFamily2.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRfv1f-3qdRNxQ96DfD9vlOQGeBnylrKelQ&usqp=CAU"
      }
    ],
    name: "HBO FAMILY"
  },
  {
    sources: [
      {
        src:
          "https://anevia114.mncnow.id/live/eds/GalaxyPremium-HD/sa_dash_vmx/GalaxyPremium-HD.mpd",
        type: "application/dash+xml",
        keySystems: keyOptions
      }
    ],
    poster: "",
    thumbnail: [
      {
        srcset:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGyA8jDKbE7oRJ8-f5tizJmxAAYoSbRw5PQ&usqp=CAU"
      }
    ],
    name: "GALAXY PREMIUM"
  }
]);





player.poster(
  "https://raw.githubusercontent.com/donelfantastic/donelfantastic.github.io/main/assets/dftv.gif"
);
videojs(document.querySelector("video")).playlistUi();

//show & hide menu 1
$(document).ready(function () {
  $(".button").click(function () {
    $(".vjs-playlist").toggle(1000);
  });
});
