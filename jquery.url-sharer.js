/* Social Sharing */
    
    (function ShareCurrentUrl(_config) {
        var _this = this; // pseudo "this"

        /* Configuration */
        var config = {
            popup_width: 400,
            popup_height: 250
        }
        Object.assign(config, _config);

        /* Social Sharers Urls */
        this.sharers = {
            facebook:   "https://www.facebook.com/sharer/sharer.php?u=#URL#&display=popup",
            twitter:    "https://twitter.com/intent/tweet?original_referer=#URL#&text=#TEXT#&url=#URL#",
            googleplus: "https://plus.google.com/share?url=#URL#"
        }

        /* Open Popup */
        this.openPopup = function (url) {
            var top = Math.floor((screen.height - config.popup_height) / 2);
            var left = Math.floor((screen.width - config.popup_width) / 2);
            window.open(
                url,
                "",
                "width=" + config.popup_width +
                ",height=" + config.popup_height +
                ",top=" + top +
                ",left=" + left
            );
        }

        /* Elaborate Data and Call the Popup */
        this.elab = function (social, url_to_share, text)
        {
            var _text;
            if (text !== undefined) {
                _text = text;
            }

            var url = "";
            switch (social)
            {
                case "facebook":
                    url = sharers.facebook;
                    break;

                case "twitter":
                    url = sharers.twitter;
                    break;

                case "googleplus":
                    url = sharers.googleplus;
                    break;

                default:
                    url = sharers.facebook;
                    break;
            }

            url = url
                .replace(/#URL#/g, url_to_share)
                .replace(/#TEXT#/g, _text);

            this.openPopup(url);
        }

        /* Share Event / Grab data */
        $(".scu_link").click(function (e) {
            e.preventDefault();

            var social = $(this).attr("data-social");
            var current_url = window.location.href;
            var text = $(this).attr("data-text");

            _this.elab( social, current_url, text );
        });

    })();
    /* Usage
    <a href="#" 
        class="scu_link"
        data-text=""
        data-social="twitter"
        title="Share on Twitter"
    ></a>
    */