
$(function() {
  //Predefned list of channel users
  var streamers = ["dreamhackcs", "skyzhar", "freecodecamp", "faceittv", "comster404", "brunofin",
    "terakilobyte", "robotcaleb", "sheevergaming", "esl_sc2", "ogamingsc2", "jacksofamerica", "cretetion"
  ];

  var getTwitchApiData = function(streamer) {
    var $streamApiUrl = "https://api.twitch.tv/kraken/streams/" + streamers[i] + "?client_id=k1i2e1f36x8noimivhcdazeguby6nv2&callback=?",
      $channelApiUrl = "https://api.twitch.tv/kraken/channels/" + streamers[i] + "?client_id=k1i2e1f36x8noimivhcdazeguby6nv2&callback=?";
  
    //make API request to twitch.tv requesting data relevent to the corresponding channels and displaying it
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: $streamApiUrl,
      headers: {
        'Client-ID': 'k1i2e1f36x8noimivhcdazeguby6nv2'
      },
      success: function($streamData) {
          var onlineStatus = '';
          if ($streamData.status === 404 || $streamData.status === 422) {
            onlineStatus = $streamData.message;
            var defaultLogoUrl = "https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png";
            $('#all').append(
              "<div class='streamer'>" +
              "<img src=" + defaultLogoUrl + ">" +
              "<p class='streamer-name'>" + streamer + "</p>" +
              "<p class='account-closed'>" + onlineStatus + "</p>" +
              "</div>"
            );

          } else if ($streamData.stream !== null) {
            onlineStatus = 'online';
            $('#all,#online').append(
              "<div class='streamer '>" +
              "<img src=" + $streamData.stream.channel.logo + ">" +
              "<p ><a class='streamer-name' href=" + $streamData.stream.channel.url + " target='_blank'>" +
              $streamData.stream.channel.display_name + "</a></p>" +
              "<p class='online'>" + onlineStatus + "</p>" +
              "<p>Streaming: " + $streamData.stream.game + " - " + $streamData.stream.channel.status + "</p>" +
              "</div>"
            );

          } else {
            $.ajax({
              type: "GET",
              dataType: "jsonp",
              url: $channelApiUrl,
              headers: {
                'Client-ID': 'k1i2e1f36x8noimivhcdazeguby6nv2'
              },
              success: function($channelData) {
                if ($channelData.logo === null) {
                  $channelData.logo = "https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png";
                } else {
                  $channelData.logo;
                }

                onlineStatus = 'offline';
                $('#all,#offline').append(
                  "<div class='streamer'>" +
                  "<img src=" + $channelData.logo + ">" +
                  "<p><a class='streamer-name' href=" + $channelData.url + " target='_blank'>" + $channelData.display_name + "</a></p>" +
                  "<p class='offline'>" + onlineStatus + "</p>" +
                  "</div>"
                );
              }
            });
          }

        } //end of main ajax success
    }); //main ajax request

  };

  /*Loop through  the streamers array, as  each streamer is pass to the function
  to get the corresponding data */
  for (var i = 0, len = streamers.length; i < len; i++) {
    getTwitchApiData(streamers[i]);
  } //end of for loop

  //Hide streamers content
  $('#all, #online, #offline').hide();

  /* When either the all, offline and online streamers tab is clicked it
  will show the corresponding Data */
  $('.all-streamers').on('click', function() {
    $('#all').slideToggle('slow');

    //When either  all, offline and online streamers tab is clicked change "+" to "-"
    if ($('.all-streamers span').text() === '+') {
      $(this).children('span').html('-');
    } else {
      $(this).children('span').html('+');
    }
  });

  $('.online-streamers').on('click', function() {
    $('#online').slideToggle('slow');

    if ($('.online-streamers span').text() === '+') {
      $(this).children('span').html('-');
    } else {
      $(this).children('span').html('+');
    }
  });

  $('.offline-streamers').on('click', function() {
    $('#offline').slideToggle('slow');

    if ($('.offline-streamers span').text() === '+') {
      $(this).children('span').html('-');
    } else {
      $(this).children('span').html('+');
    }

  });
});
