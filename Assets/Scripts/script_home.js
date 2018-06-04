var keyword, keyword_proper;
var name, imageURL, date, time, city, country, longitude, latitude, venue, purchaseURL, priceMin, priceCurrency;
var resultList = [], selection;

//add firebase and initialize
// var config = {
//     apiKey: "AIzaSyD5BqbKtmkJgORf30vyWK00xdHPDikCylo",
//     authDomain: "chatapp-may16.firebaseapp.com",
//     databaseURL: "https://chatapp-may16.firebaseio.com",
//     projectId: "chatapp-may16",
//     storageBucket: "chatapp-may16.appspot.com",
//     messagingSenderId: "117485271119"
// };
    
// firebase.initializeApp(config);
// var database = firebase.database();


$("#search-bar").on("click", function(event) {
    event.preventDefault();
    keyword = $("#searchBox").val();
    keyword = keyword.toUpperCase();
    
    keyword_proper = keyword.replace(" ", "+");

    console.log(keyword + keyword_proper);

    ticketSearch(keyword_proper);
    // updateHistory();
    // postResult();

})

function ticketSearch(keyword_proper) {
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=UV7tg3MFc3j8tiYWVw0b5ffsRuC6hGLb&keyword=" + keyword_proper,
        method: "GET"
      }).then(function(response) {

        console.log(response);

        for(var i = 0; i<response._embedded.events.length; i++ ){
            name = response._embedded.events[i].name;
            imageURL = response._embedded.events[i].images[4].url;
            date = response._embedded.events[i].dates.start.localDate;
            time = response._embedded.events[i].dates.start.localTime;
            city = response._embedded.events[i]._embedded.venues[0].city.name;
            country = response._embedded.events[i]._embedded.venues[0].country.countryCode;
            longitude = response._embedded.events[i]._embedded.venues[0].location.longitude;
            latitude = response._embedded.events[i]._embedded.venues[0].location.latitude;
            venue = response._embedded.events[i]._embedded.venues[0].name;
            purchaseURL = response._embedded.events[i].url;
            priceMin = response._embedded.events[i].priceRanges[0].min;
            priceCurrency = response._embedded.events[i].priceRanges[0].currency;

            // checkData(response._embedded.events[i].name, name);
            // checkData(response._embedded.events[i].images[4].url,imageURL);
            // checkData(response._embedded.events[i].dates.start.localDate,date);
            // checkData(response._embedded.events[i].dates.start.localTime, time);
            // checkData(response._embedded.events[i]._embedded.venues[0].city.name, city);
            // checkData(response._embedded.events[i]._embedded.venues[0].country.countryCode, country);
            // checkData(response._embedded.events[i]._embedded.venues[0].location.longitude, longitude);
            // checkData(response._embedded.events[i]._embedded.venues[0].location.latitude, latitude);
            // checkData(response._embedded.events[i]._embedded.venues[0].name, venue);
            // checkData(response._embedded.events[i].url, purchaseURL);
            // checkData(response._embedded.events[i].priceRanges[0].min, priceMin);
            // checkData(response._embedded.events[i].priceRanges[0].currency, priceCurrency);

            // console.log(name+imageURL+date+time+city+country+longitude+latitude+venue+purchaseURL+priceMin+priceCurrency);

            resultList[i] = {
                Name: name,
                Image: imageURL,
                Date: date,
                Time: time,
                City: city,
                Country: country,
                Long: longitude,
                Lat: latitude,
                Venue: venue,
                Purchase: purchaseURL,
                PriceMin: priceMin,
                Currency: priceCurrency
            }
        };

        console.log(resultList);

        localStorage.setItem("resultList", JSON.stringify(resultList));
        localStorage.setItem("keyword", keyword);
        

        // database.ref().push({
        //     keyword: keyword,
        //     image: imageURL
        // });

        window.location.href = "./band.html";

    });


}

// function checkData(obj.prop, data){
//     if(dataPath === undefined) {
//         data = "";
//     } else {
//         data = dataPath;
//     }
//     return data;
// }

// function updateHistory() {



// }

// ppl's recent searches, make them searchable
