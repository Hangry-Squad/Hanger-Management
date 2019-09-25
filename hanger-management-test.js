

$("#button-secondary").on("click", function(event){
    console.log("clicked")
    
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
            var recipeAnchor = $("<div>");
            console.log(i);
            
            // create tag to store recipe name (label)
            var h = $("<h3>").text(results[i].recipe.label)
            
            //create img variable and store img  tag
            var recipeImage = $("<img>");
            // sets the src attribute of the image and href and alt for label
            recipeAnchor.attr("class", "results")
            // recipeAnchor.attr("href", "nutPageTest.html")//change to final nutrition page name
            recipeImage.attr("src", results[i].recipe.image)
            recipeImage.attr("alt", results[i].recipe.label)
            recipeImage.attr("data-ingredient", results[i].recipe.ingredientLines)
            recipeImage.attr("data-nutrients", "Yield " + results[i].recipe.yield)
            recipeImage.attr("href", results[i].recipe.url)
            

            //Append the h3 and image tags to recipeDiv
            recipeAnchor.append(h);
            recipeAnchor.append(recipeImage);
          

            // get jquery selector to append recipeDiv
            $(".display-results").append(recipeAnchor);
        }
      
        
    })
})

$(document).on("click", ".results", function(){
    var imageHolder = $(this)
    console.log(imageHolder)
    // console.log(imageHolder[0].children[1].attributes[2].value)

    //make a div to hold everything were looping through
    var selectedRecipeDiv = $("<div>");
    for (let i = 0; i < imageHolder[0].children[1].attributes.length; i++) {

        console.log(imageHolder[0].children[1].attributes[i].value)
        if( imageHolder[0].children[1].attributes[i].value===imageHolder[0].children[1].attributes[0].value){
            console.log("in if statment")
            var selectedRecipeImg = $("<img>")
            selectedRecipeImg.attr("src", imageHolder[0].children[1].attributes[0].value)
            selectedRecipeImg.css("width", "165px")
            selectedRecipeDiv.append(selectedRecipeImg)

        }else if( imageHolder[0].children[1].attributes[i].value === imageHolder[0].children[1].attributes[4].value){
        console.log("inside a Tag")
            var selectedRecipeATag = $("<a>");
            selectedRecipeATag.attr("href", imageHolder[0].children[1].attributes[4].value)
            selectedRecipeATag.text(imageHolder[0].children[1].attributes[4].value)
            selectedRecipeDiv.append(selectedRecipeATag);
        }else {
            var selectedRecipePTag = $("<p>");
            selectedRecipePTag.text(imageHolder[0].children[1].attributes[i].value)
            selectedRecipeDiv.append(selectedRecipePTag)
        }
        
    }

    $(".display-results").empty();
    $(".display-results").append(selectedRecipeDiv);
    $(".display-results").show()


    // $(".display-results").hide()
})


    //clears search bar.
function clear() {
    $(".display-results").empty();// get final selector name
    $(".nutrient-content").empty()
  }

  //start of js code for nutrition page (third page)


//This should be calling whatever button (picture they chose to see the recipe of (2nd page)) they clicked 
//need to do on click this --> hide middle section --> need to figure out how to console log the recipe object
$("#ingredient-submit").on("click", function () {
    console.log("clicked")

    // $(".input-group-recipe").hide();
    // $(".input-group-ingredient").hide();


    event.preventDefault();
    clear()

    clear()
    //this foodItem will be calling the value of the p tag of ingrediants in the future
    var foodItem = $("#ingredient-input").val();
    //this code is replacing the spaces in the ingrediants list, so that 
    foodItem.replace(' ', '%20')
    //api call
    var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=54229f7b&app_key=4047020179cb06d777610301b960cc69&ingr=" + foodItem;
    var pageIngrediants = $("#ingrediants").val();
    console.log(pageIngrediants);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        function inputSearch() {
            console.log(foodItem);
        }
        inputSearch();

        console.log(response);
        var listNutrients = response.totalNutrients;
        console.log(listNutrients);

        var calorieContent = response.calories;
        console.log("calories: " + calorieContent);
        var calorieDisplay = $("<p>").text("calories: " + calorieContent);
        $(".nutrient-content").prepend(calorieDisplay);


        for (let nutrient in listNutrients) {

            var nutrientLabel = listNutrients[nutrient].label;
            var nutrientQuan = listNutrients[nutrient].quantity;
            var nutrientUnit = listNutrients[nutrient].unit;
            console.log(nutrientLabel);
            console.log(nutrientQuan);
            console.log(nutrientUnit);

            var p = $("<li>").text(`${nutrientLabel} ${nutrientQuan} ${nutrientUnit}`);

            $(".nutrient-content").append(p);

        }
    })
})












