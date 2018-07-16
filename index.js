


$(document).ready(function() {
    let navBodyVisible = false;
    $('.icon').click(function() {
        navBodyVisible?$('#header-body').addClass('hidden-nav'):$('#header-body').removeClass('hidden-nav');
        navBodyVisible = !navBodyVisible;
    });

    if ($('#artwork').length) {
        var allArt;        
        let lgScreen = parseInt($(document).width()) > 860;
        let choices = ["collages", "drawings", "paintings", "sculptures"];
        let count;
        let imgMarkup;
        let imgDestination

        let fileJSON = new XMLHttpRequest();
        fileJSON.overrideMimeType("application/json");
        fileJSON.open("GET", "../artwork.json", true);
        fileJSON.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                allArt = JSON.parse(this.responseText);

                for (let x=allArt["count"]-1;x>=0;x--) {
                    let thisArt = allArt[x];

                switch(thisArt.name) {

                    case "Fairy Tales&apos; Shadows":
                    case "Mixed Media Piece": 
                    case "First Steps": count=0; break;

                    case "Balloons":
                    case "Leaf 6":
                    case "Transience":
                    case "First Light":
                    case "Fractured Enlightment": count=1; break;

                    case "Leaf 23":
                    case "Aroma":
                    case "Lantern": count=2; break;

                    case "Nostalgia":
                    case "Irises": count=3; break;

                    default: count=x;
                }

                if (lgScreen) {
                    imgMarkup = "<a href='#" + thisArt.src + "'><img id='art" + 
                                x + "' src='desktop/" + thisArt.src + "' /></a>";
                    imgDestination = 'col'+count%4;
                }
                else {
                    imgMarkup = "<img src='mobile/" + thisArt.src + "' />";
                    imgDestination = 'mobile';
                }

                let thumbClass = thisArt.featured=="true"?thisArt.medium[0]+" f":thisArt.medium[0];
                document.getElementById(imgDestination)
                    .innerHTML += '<div class="art ' + thumbClass + '">' + 
                                imgMarkup + '<div class="title"><span class="name">' + 
                                thisArt.name + "</span><span class='year'>" + 
                                thisArt.year + "</span></div></div>";
                }

                if (lgScreen) {
                    for (let i=allArt["count"]-1;i>=0;i--) if (allArt[i].featured) {
        
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

