






$("#button-secondary").on("click", function(event){
    
    $(".middle-content-section").hide()

    //prevents page from reloading on search
    event.preventDefault();

    // empties search results
    clear();
    
    var searchTerm = $(".input-group-field").val()//get id for search button 
    // key 1 main
    var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=65ef0c30&app_key=33cd1b3b70a3582a44c9c59516afc54c&from=0&to=9";
   
    // key 2 test purpose
    // var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=0937ce60&app_key=09d06e3e22bf57d8e3e18f48c927b8ea&from=0&to=9";

    // key 3 test purpose
    // var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=6c77a1da&app_key=7b68d8e789a3929cf8b32b16c5a5904b&from=0&to=9";

    // key 4 test purpose
    // var queryURL = "https://api.edamam.com/search?q="+ searchTerm +" &app_id=6055eb9f&app_key=3fb7be0868627299cb39b155b36e94a6&from=0&to=9";    
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        $(".input-group-field").val('')

        // data from AJAX request stored in results
        var results = response.hits;

        // loops through each result from AJAX
        for(var i = 0; i < results.length; i++){

            //create div
            var recipeAnchor = $("<div>");
            
            // create tag to store recipe name (label)
            var h = $("<h3>").text(results[i].recipe.label)
            
            //create img variable and store img  tag
            var recipeImage = $("<img>");
            // sets the src attribute of the image and href and alt for label
            recipeAnchor.attr("class", "results")
            recipeImage.attr("src", results[i].recipe.image)
            recipeImage.attr("alt", results[i].recipe.label)
            recipeImage.attr("data-ingredient", results[i].recipe.ingredientLines)
            recipeImage.attr("data-nutrients", "Yields " + results[i].recipe.yield + " servings!")
            recipeImage.attr("href", results[i].recipe.url)

            //Append the h3 and image tags to recipeDiv
            recipeAnchor.append(h);
            recipeAnchor.append(recipeImage);
          

            // Dynamic Loop will get dumped here.
            $(".display-results").append(recipeAnchor);
        }
      
        
    })
})

$(document).on("click", ".results", function(){
    var imageHolder = $(this)

    //Loop to get attributes from images to display selected Attributes on click
    var selectedRecipeDiv = $("<div>");
    for (let i = 0; i < imageHolder[0].children[1].attributes.length; i++) {

    
        if( imageHolder[0].children[1].attributes[i].value===imageHolder[0].children[1].attributes[0].value){
           
            var selectedRecipeImg = $("<img>")
            selectedRecipeImg.attr("src", imageHolder[0].children[1].attributes[0].value)
            selectedRecipeImg.css("width", "175px")
            selectedRecipeDiv.append(selectedRecipeImg)

        }else if( imageHolder[0].children[1].attributes[i].value === imageHolder[0].children[1].attributes[4].value){
        
            var selectedRecipeATag = $("<a>");
            selectedRecipeATag.attr("href", imageHolder[0].children[1].attributes[4].value)
            selectedRecipeATag.text(imageHolder[0].children[1].attributes[4].value)
            selectedRecipeDiv.append(selectedRecipeATag)
        }else {

            var selectedRecipePTag = $("<p>");
            selectedRecipePTag.text(imageHolder[0].children[1].attributes[i].value)
            selectedRecipeDiv.append(selectedRecipePTag)
        }
        
    }

    $(".display-results").empty();
    $(".display-results").append(selectedRecipeDiv);
    $(".display-results").show()

})


    //Function to clear out previous display after new search.
function clear() {
    $(".display-results").empty();
    $(".nutrient-content").empty()
  }

  //Start of code for Nutrition API


//This should be calling whatever button (picture they chose to see the recipe of (2nd page)) they clicked 
//need to do on click this --> hide middle section --> need to figure out how to console log the recipe object
$("#ingredient-submit").on("click", function () {
    
    event.preventDefault();

    clear()

    //this foodItem will be calling the value of the p tag of ingredients in the future
    var foodItem = $("#ingredient-input").val();
    //this code is replacing the spaces in the ingrediants list 
    foodItem.replace(' ', '%20')
    //Nutritition API call
    var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=54229f7b&app_key=4047020179cb06d777610301b960cc69&ingr=" + foodItem;

// AJAX call to get info from API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        function inputSearch() {
        }
        inputSearch();
//creating a variable of the list of nutrients given ingredients
        var listNutrients = response.totalNutrients;
        //creating a variable for the calorie count of the ingredients input
        var calorieContent = response.calories;
        // displaying amount of calories of the ingredients input
        var calorieDisplay = $("<p>").text("Calories: " + calorieContent);
        $(".nutrient-content").prepend(calorieDisplay);

//creating for loop to call the label, quantity, and unit for each nutritional value in the API
        for (let nutrient in listNutrients) {

            var nutrientLabel = listNutrients[nutrient].label;
            var nutrientQuan = listNutrients[nutrient].quantity;
            var nutrientUnit = listNutrients[nutrient].unit;
            

            var p = $("<li>").text(`${nutrientLabel} ${nutrientQuan} ${nutrientUnit}`);

            $(".nutrient-content").append(p);

        }
    })
})







