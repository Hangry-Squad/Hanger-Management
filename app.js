$("#button-secondary").on("click", function(){
    console.log("clicked")
    var searchTerm = $(".input-group-field").val()//get id for search button 
    // key 1 main
    var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=65ef0c30&app_key=33cd1b3b70a3582a44c9c59516afc54c&from=0&to=9";
   
    // key 2 test purpose
    // var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=0937ce60&app_key=09d06e3e22bf57d8e3e18f48c927b8ea&from=0&to=9";

    // key 3 test purpose
    // var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=6c77a1da&app_key=7b68d8e789a3929cf8b32b16c5a5904b&from=0&to=9";

    // key 4 test purpose
    // var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=6055eb9f&app_key=3fb7be0868627299cb39b155b36e94a6&from=0&to=9";
    console.log(searchTerm)
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        $(".input-group-field").val('')//class-name of the search box
        console.log(response)

        // data from AJAX request stored in results
        var results = response.hits;
        console.log(results[0].recipe.label)
        // loops through each result 
        for(var i = 0; i < results.length; i++){

            //create div
            var recipeDiv = $("<div>");
            console.log(i);

            // create tag to store recipe name (label)
            var h = $("<h3>").text(results[i].recipe.label)//or just results[i].label?
            
            //create img and store img  tag, or an <a> with href link and img src?
            var recipeImage = $("<img>");

            // sets the src attribute of the image and href and alt for label
            recipeImage.attr("src", results[i].recipe.image)
            recipeImage.attr("href", results[i].recipe.url)

            //Append the h3 and image tags to recipeDiv
            recipeDiv.append(h);
            recipeDiv.append(recipeImage);

            // get jquery selector to append recipeDiv
            $(".display-results").append(recipeDiv);
        }
        // <a href='mysite'><img src='whatever'/></a>
        
    })
})