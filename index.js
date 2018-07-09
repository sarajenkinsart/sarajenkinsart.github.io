


$(document).ready(function() {
    let navBodyVisible = false;
    $('.icon').click(function() {
        navBodyVisible?$('#header-body').addClass('hidden-nav'):$('#header-body').removeClass('hidden-nav');
        navBodyVisible = !navBodyVisible;
    });

    if ($('#artwork').length) {
        if (parseInt($(document).width()) > 1080) {
            $("select option:contains('Art Overview')").text("Art Overview (Thumbnail)");
        }      
        let choices = ["collages", "drawings", "paintings", "sculptures"];
        let mediums = {};
            
        for (let x=0; x<=choices.length; x++) {
            mediums[x<4?choices[x]:"all"] = {
                "artwork":[],
                "indexes":[],
                "visible":true,
            };
        }
        
        let dMarkup = ["<span class='col'>", "<span class='col'>", "<span class='col'>", "<span class='col'>"];
        let mobileMarkup = "<div id='mobile-container'>";
        let leafSlide = ['<div id="slideshow-container"><div class="slideshow"><div id="leaf-container" class="animation">',
                        '</div><span class="toggle-slide s-left" onmouseup="slideShow(\'l\')">',
                        '<i class="arrow arrow-left"></i></span>',
                        '<span class="toggle-slide s-right" onmouseup="slideShow(\'r\')">',
                        '<i class="arrow arrow-right"></i></span>',
                        '<span id="slideshow-count">1/26</span>',
                        '<span class="slideshow-year">2016</span></div></div>'
                        ];

        let fileJSON = new XMLHttpRequest();
        fileJSON.overrideMimeType("application/json");
        fileJSON.open("GET", "../artwork.json", true);
        fileJSON.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                mediums["all"]["artwork"] = JSON.parse(this.responseText);
                const allArt = mediums["all"]["artwork"];

                for (let count=allArt["count"]-1;count>=0;count--) {
                    let thisArt = allArt[count];
                    if (!thisArt.inGallery) {
                        continue;
                    };

                    mediums[thisArt.medium]["indexes"].push(count);
                    mediums[thisArt.medium]["count"] = mediums[thisArt.medium]["artwork"].push(thisArt);

                    if (count>=17&&count<=42) {
                        leafSlide[0] += '<span class="leaf"><img src="thumb/' + thisArt.src + '" /></span>';
                        if (count==17) document.getElementById('col'+count%4).innerHTML += leafSlide.join("");
                        continue;

                    } else if (thisArt.name=="Nostalgia") {
                        document.getElementById('col1').innerHTML += '<div class="art"><img src="thumb/' + thisArt.src + 
                                            '" /><div class="title"><span class="name">' + thisArt.name + 
                                            "</span><span class='year'>" + thisArt.year +
                                            "</span></div></div>";

                    } else {
                        document.getElementById('col'+count%4).innerHTML += '<div class="art"><img src="thumb/' + thisArt.src + 
                                            '" /><div class="title"><span class="name">' + thisArt.name + 
                                            "</span><span class='year'>" + thisArt.year +
                                            "</span></div></div>";
                    }

                    mobileMarkup += "<div class='art-mobile' id='mobile" + count +  "'><img src='" + 
                                    thisArt.medium + "/" + thisArt.src + "' /></div>";

                }
                document.getElementById('artwork').innerHTML += mobileMarkup + "</div>";

            }
        };

        fileJSON.send(null);

        $("#art-filter").val("all-art");
        let artToggle = function(medium, display) {
                for (let a=0; a<mediums[medium]["count"]; a++) {
                    $('#mobile'+mediums[medium]["indexes"][a]).css('display', display)
                };
                return display=="block";
        }
    
        let artFilter = function() {
            let choice = $("#art-filter").val();
            if (choice=='all') {
                for (let x=0;x<choices.length;x++) {
                    if (!mediums[choice].visible) {
                        mediums[choices[x]].visible = artToggle(choices[x],"block");
                    }
                }
                $('#artwork').removeClass("thumb-hidden");
                return mediums["all"].visible = true;
            }
            for (let x=0; x<choices.length; x++) {
                if (choice!=choices[x]) {
                    mediums[choices[x]].visible = artToggle(choices[x],"none");
                }
            }
            if (mediums["all"].visible) {
                $('#artwork').addClass("thumb-hidden");
                mediums["all"].visible=false;
            }
            mediums[choice].visible = artToggle(choice, "block")
        }
    
        // *****EVENT-HANDLERS*****
        $("#art-filter").val("all");
        $("#art-filter").change(function() {
            artFilter();
            $(this).blur();
        })

        $(window).resize(function() {
            if (parseInt($(document).width())>1080 && mediums["all"].visible) {
                for (let x=0;x<choices.length;x++) {
                    if (!mediums[choices[x]].visible) {
                        mediums[choices[x]].visible = artToggle(choices[x],"none");
                    }
                }
            }
        })

    }





});

