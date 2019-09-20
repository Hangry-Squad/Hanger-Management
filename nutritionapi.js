//will need to adjust the label of the submit button once the html is established

$("#submit").on("click", function () {
    console.log("clicked")
    var foodItem =$("#input").val();
    foodItem.replace(' ', '%20')
    var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=54229f7b&app_key=4047020179cb06d777610301b960cc69&ingr=" + foodItem;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

    function inputSearch() {
        console.log(foodItem);
    }
    inputSearch();
})











