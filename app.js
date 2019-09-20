$("#search").on("click", function(){ get id name for home
    var searchTerm = $("#search").val()//get id for search button 
    var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=65ef0c30&app_key=33cd1b3b70a3582a44c9c59516afc54c&from=0&to=9&calories=591-722&health=alcohol-free";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        console.log(response)
    })
});