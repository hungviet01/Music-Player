$(function () {
    var playerTrack = $("#player-track"),
        bgArtwork = $("#bg-artwork"),
        bgArtworkUrl,
        albumName = $("#album-name"),
        trackName = $("#track-name"),
        albumArt = $("#album-art"),
        sArea = $("#s-area"),
        seekBar = $("#seek-bar"),
        trackTime = $("#track-time"),
        insTime = $("#ins-time"),
        sHover = $("#s-hover"),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find("i"),
        tProgress = $("#current-time"),
        tTime = $("#track-length"),
        seekT,
        seekLoc,
        seekBarPos,
        cM,
        ctMinutes,
        ctSeconds,
        curMinutes,
        curSeconds,
        durMinutes,
        durSeconds,
        playProgress,
        bTime,
        nTime = 0,
        buffInterval = null,
        tFlag = false,
        albums = [
            "Mood",
            "7 Years",
            "8 Letters",
            "Right Now Na Na Na",
            "All I Got",
            "As Long As You Love Me",
            "Billie Eilish",
            "Cheating on You",
            "Comethru",
            "Cry On My Shoulder",
            "Double take",
            "Duncan Laurence",
            "Dusk Till Dawn",
            "Ed Sheeran",
            "Heat Waves",
            "I'm Yours",
            "Bad Liar",
            "Shy",
            "SAVAGE LOVE",
            "Paris In The Rain",
            "Someone You Loved",
            "Memories",
            "On My Mind",
            "No Friends",
            "One call away",
            "At My Worst",
            "Timber",
            "Until You",
            "Eyes Blue Like The Atlantic",
            "Hide and Seek",
            "So Far Away",
            "Soleda",
            "50 Feet",
            "Symphony",
            "Take Me To Your Heart",
            "All We Know",
            "The Nights",
            "The way I still love you",
            "Waiting For Love",
            "My Love",
            "Without Me"
        ],
        trackNames = [
            "24kGoldn - Mood",
            "7 Years - Lukas Graham",
            "8 Letters - Why Don't We",
            "Aamir - Right Now Na Na Na",
            "All I Got - Said The Sky",
            "As Long As You Love Me - Backstreet Boys",
            "Billie Eilish - Khalid",
            "Charlie Puth - Cheating on You",
            "Comethru - Jeremy Zucker",
            "Cry On My Shoulder - Super Star",
            "Double take - dhruv",
            "Duncan Laurence - Arcade",
            "Dusk Till Dawn - ZAYN",
            "Ed Sheeran - Perfect",
            "Glass Animals - Heat Waves",
            "I'm Yours - Jason Mraz",
            "Imagine Dragons - Bad Liar",
            "Jai Waetford - Shy",
            "Jason Derulo - SAVAGE LOVE",
            "Lauv - Paris In The Rain",
            "Lewis Capaldi - Someone You Loved",
            "Maroon 5 - Memories",
            "Maximillian - On My Mind",
            "Nightcore - No Friends",
            "One call away - Charlie Puth",
            "Pink Sweat - At My Worst",
            "Pitbull - Timber",
            "Shayne Ward - Until You",
            "Sista Prod - Eyes Blue Like The Atlantic",
            "SLUMBERJACK - Hide and Seek",
            "So Far Away - Adam Christopher",
            "Soledad - Westlife",
            "SoMo - 50 Feet",
            "Symphony - Clean Bandit, Zara Larsson",
            "Take Me To Your Heart - Michael",
            "The Chainsmokers - All We Know",
            "The Nights - Avicii",
            "The way I still love you - Reynard Silva",
            "Waiting For Love - Romy Wave",
            "Westlife - My Love",
            "Without Me - Halsey"
        ],
        albumArtworks = [
            "_1",
            "_2",
            "_3",
            "_4",
            "_5",
            "_6",
            "_7",
            "_8",
            "_9",
            "_10",
            "_11",
            "_12",
            "_13",
            "_14",
            "_15",
            "_16",
            "_17",
            "_18",
            "_19",
            "_20",
            "_21",
            "_22",
            "_23",
            "_24",
            "_25",
            "_26",
            "_27",
            "_28",
            "_29",
            "_30",
            "_31",
            "_32",
            "_33",
            "_34",
            "_35",
            "_36",
            "_37",
            "_38",
            "_39",
            "_40",
            "_41"
        ],
        trackUrl = [
            "https://raw.githubusercontent.com/hungviet01/music-player/main/music/1.mp3",
            "/music/2.mp3",
            "/music/3.mp3",
            "/music/4.mp3",
            "/music/5.mp3",
            "/music/6.mp3",
            "/music/7.mp3",
            "/music/8.mp3",
            "/music/9.mp3",
            "/music/10.mp3",
            "/music/11.mp3",
            "/music/12.mp3",
            "/music/13.mp3",
            "/music/14.mp3",
            "/music/15.mp3",
            "/music/16.mp3",
            "/music/17.mp3",
            "/music/18.mp3",
            "/music/19.mp3",
            "/music/20.mp3",
            "/music/21.mp3",
            "/music/22.mp3",
            "/music/23.mp3",
            "/music/24.mp3",
            "/music/25.mp3",
            "/music/26.mp3",
            "/music/27.mp3",
            "/music/28.mp3",
            "/music/29.mp3",
            "/music/30.mp3",
            "/music/31.mp3",
            "/music/32.mp3",
            "/music/33.mp3",
            "/music/34.mp3",
            "/music/35.mp3",
            "/music/36.mp3",
            "/music/37.mp3",
            "/music/38.mp3",
            "/music/39.mp3",
            "/music/40.mp3",
            "/music/41.mp3"
        ],
        playPreviousTrackButton = $("#play-previous"),
        playNextTrackButton = $("#play-next"),
        currIndex = -1;

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass("active");
                albumArt.addClass("active");
                checkBuffering();
                i.attr("class", "fas fa-pause");
                audio.play();
            } else {
                playerTrack.removeClass("active");
                albumArt.removeClass("active");
                clearInterval(buffInterval);
                albumArt.removeClass("buffering");
                i.attr("class", "fas fa-play");
                audio.pause();
            }
        }, 300);
    }

    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if (ctMinutes < 0 || ctSeconds < 0) return;

        if (ctMinutes < 0 || ctSeconds < 0) return;

        if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
        if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
        else insTime.text(ctMinutes + ":" + ctSeconds);

        insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
    }

    function hideHover() {
        sHover.width(0);
        insTime
            .text("00:00")
            .css({ left: "0px", "margin-left": "0px" })
            .fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass("active");
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10) curMinutes = "0" + curMinutes;
        if (curSeconds < 10) curSeconds = "0" + curSeconds;

        if (durMinutes < 10) durMinutes = "0" + durMinutes;
        if (durSeconds < 10) durSeconds = "0" + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
        else tProgress.text(curMinutes + ":" + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
        else tTime.text(durMinutes + ":" + durSeconds);

        if (
            isNaN(curMinutes) ||
            isNaN(curSeconds) ||
            isNaN(durMinutes) ||
            isNaN(durSeconds)
        )
            trackTime.removeClass("active");
        else trackTime.addClass("active");

        seekBar.width(playProgress + "%");

        if (playProgress == 100) {
            i.attr("class", "fa fa-play");
            seekBar.width(0);
            tProgress.text("00:00");
            albumArt.removeClass("buffering").removeClass("active");
            clearInterval(buffInterval);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function () {
            if (nTime == 0 || bTime - nTime > 1000)
                albumArt.addClass("buffering");
            else albumArt.removeClass("buffering");

            bTime = new Date();
            bTime = bTime.getTime();
        }, 100);
    }

    function selectTrack(flag) {
        if (flag == 0 || flag == 1) ++currIndex;
        else --currIndex;

        if (currIndex > -1 && currIndex < albumArtworks.length) {
            if (flag == 0) i.attr("class", "fa fa-play");
            else {
                albumArt.removeClass("buffering");
                i.attr("class", "fa fa-pause");
            }

            seekBar.width(0);
            trackTime.removeClass("active");
            tProgress.text("00:00");
            tTime.text("00:00");

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                audio.play();
                playerTrack.addClass("active");
                albumArt.addClass("active");

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find("img.active").removeClass("active");
            $("#" + currArtwork).addClass("active");

            bgArtworkUrl = $("#" + currArtwork).attr("src");

            bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
        } else {
            if (flag == 0 || flag == 1) --currIndex;
            else ++currIndex;
        }
    }

    function initPlayer() {
        audio = new Audio();

        selectTrack(0);

        audio.addEventListener("ended", function() {
            selectTrack(1);
        });

        audio.loop = false;

        playPauseButton.on("click", playPause);

        sArea.mousemove(function (event) {
            showHover(event);
        });

        sArea.mouseout(hideHover);

        sArea.on("click", playFromClickedPos);

        $(audio).on("timeupdate", updateCurrTime);

        playPreviousTrackButton.on("click", function () {
            selectTrack(-1);
        });
        playNextTrackButton.on("click", function () {
            selectTrack(1);
        });
    }

    initPlayer();
});
