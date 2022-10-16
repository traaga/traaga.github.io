(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            let meridiem = "a.m.";

            if(h >= 12) {
                h -= 12;
                meridiem = "p.m.";
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + meridiem;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let kingitus = document.getElementById("v1");
        let kontaktivaba = document.getElementById("v2");

        let radio0 = document.getElementById("radio0");
        let radio1 = document.getElementById("radio1");
        let radio2 = document.getElementById("radio2");

        let linnadeHinnad = {
            "tln": 0,
            "trt": 2.5,
            "nrv": 2.5,
            "prn": 3
        };

        let kingitusHind = 5;
        let kontaktivabaHind = 1;

        if(!(radio0.checked || radio1.checked || radio2.checked)) {
            alert("Palun valige transpordiviis");
            return;
        }
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            let hind = linnadeHinnad[linn.value];

            if(kingitus.checked) {
                hind += kingitusHind;
            }

            if(kontaktivaba.checked) {
                hind += kontaktivabaHind;
            }
            
            e.innerHTML = hind + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map, infobox;

function GetMap() {
    
    "use strict";

    let deltaPos = new Microsoft.Maps.Location(
        58.38536227711325, 26.724842520947483
    );

    let taltechPos = new Microsoft.Maps.Location(
        59.394958297158446, 24.671665783335506
    );

    let centerPoint = new Microsoft.Maps.Location(
            (deltaPos.latitude + taltechPos.latitude) / 2,
            (deltaPos.longitude + taltechPos.longitude) / 2,
        );

    console.log(centerPoint);

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(deltaPos, {
        title: 'Delta',
    });

    pushpin.metadata = {
        title: 'Delta hoone',
        description: 'kirjeldus'
    };

    let pushpin2 = new Microsoft.Maps.Pushpin(taltechPos, {
        title: 'Taltech',
    });

    pushpin2.metadata = {
        title: 'Taltech',
        description: 'kirjeldus'
    };

    infobox = new Microsoft.Maps.Infobox(deltaPos, {
        visible: false
    });
    infobox.setMap(map);
    
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

