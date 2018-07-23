


$(document).ready(function() {
    let navBodyVisible = false;
    document.getElementById('icon').addEventListener('click', function() {
        document.getElementById('header-body').className = (navBodyVisible?"hidden-nav":"");
        navBodyVisible = !navBodyVisible;
    })

    if ($('#artwork').length) {
        var allArt;        
        let lgScreen = parseInt($(document).width()) > 860;
        let choices = ["collages", "drawings", "paintings", "sculptures"];
        let medCount = {"collages":0,"drawings":0,"paintings":0,"sculptures":0};
        let count;
        let imgMarkup;
        let imgDestination;

        let fileJSON = new XMLHttpRequest();
        fileJSON.overrideMimeType("application/json");
        fileJSON.open("GET", "../artwork.json", true);
        fileJSON.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                allArt = JSON.parse(this.responseText);
                allArt["count"]--;
                for (let x=allArt["count"];x>=0;x--) {
                    let thisArt = allArt[x];

                    if (lgScreen) {

                        if (thisArt.featured=="true") {

                            switch(thisArt.name) {
                                case "Aroma": count=0; break;
                                case "Leaf 17": case "Transience": count=1; break;
                                case "Fractured Enlightenment": case "Mixed Media Piece": count=3; break;
                                default: count=allArt["count"]-x;
                            }

                            document.getElementById('col'+count%4)
                                .innerHTML += '<div class="art f">' + 
                                            "<a href='#" + thisArt.src + "'><img id='artf" + 
                                            x + "' src='desktop/" + thisArt.src + "' /></a>" + 
                                            '<div class="title"><span class="name">' + 
                                            thisArt.name + "</span><span class='year'>" + 
                                            thisArt.year + "</span></div></div>";
                        }

                        count = medCount[thisArt.medium]++%4;

                        document.getElementById('col'+count%4)
                            .innerHTML += '<div class="art ' + thisArt.medium[0] + '">' + 
                                        "<a href='#" + thisArt.src + "'><img id='art" + 
                                        x + "' src='desktop/" + thisArt.src + "' /></a>" + 
                                        '<div class="title"><span class="name">' + 
                                        thisArt.name + "</span><span class='year'>" + 
                                        thisArt.year + "</span></div></div>";

                    }

                    else {
                        let thumbClass = thisArt.featured=="true"?thisArt.medium[0]+" f":thisArt.medium[0];
                        document.getElementById("mobile")
                            .innerHTML += '<div class="art ' + thumbClass + '">' + 
                                        "<img src='mobile/" + thisArt.src + "' />" + 
                                        '<div class="title"><span class="name">' + 
                                        thisArt.name + "</span><span class='year'>" + 
                                        thisArt.year + "</span></div></div>";
                    }

                }

                if (lgScreen) {
                    for (let i=0; i<=allArt["count"];i++) {
                        $('#artf'+i).mouseup(function() {
                            document.getElementById('current-image').src = ("full/" + allArt[i].src);
                            $('#full-image-container').removeClass('hidden');
                        })

                        $('#art'+i).mouseup(function() {
                            document.getElementById('current-image').src = ("full/" + allArt[i].src);
                            $('#full-image-container').removeClass('hidden');
                        })
                    }
                }

            }

        };

        fileJSON.send(null);

        $("#art-filter").val("featured");
        $("#art-filter").change(function() {
            document.getElementById("artwork")
                    .className = $("#art-filter").val();
            $(this).blur();
        })

    }





});

