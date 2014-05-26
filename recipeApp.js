var recipeApp = {};
recipeApp.key = "a92497f310f4293e5df2bcbe2c15ac0c";
recipeApp.ID = "93601eb7";
recipeApp.baseURL = "http://www.yummly.com/recipe/";



recipeApp.init = function () {
	var diet1, diet2, diet3;

	$("#diet1").on("change", function(){
		// console.log("new diet selected");
    // when differnt diet is selected, change the query
    	diet1 = $(this).val();
	});

    $("#diet2").on("change", function(){
    	diet2 = $(this).val();
	});

    $("#diet3").on("change", function(){
    	diet3 = $(this).val();
	});

	$("#includeForm").on("keypress", function(e){
        if (e.which === 13) {
            e.preventDefault();
            recipeApp.getRecipes();

        }

    });

    $(".button-submit").on("click", function(){
    	var choice = "";
    	if($("#diet2").val() === "0" && $("#diet3").val() === "0") {
    		choice = diet1;
    	} else if($("#diet3").val() === "0") {
    		choice = diet1 + "+" + diet2;
    	} else {
    		choice = diet1 + "+" + diet2 + "+" + diet3;
    	}
    	var elem1 = $("#includeForm").val();

        var updatedChoice = choice;

// include ingredient 
    	if ( $("#includeForm").val() !== "") {
    		var include = elem1;
            updatedChoice = choice + "+" + include;
    	}

    	
    	console.log(updatedChoice);

    	recipeApp.getRecipes(updatedChoice);

	});

};


recipeApp.getRecipes = function(query){
 	$.ajax({
 		url: "http://api.yummly.com/v1/api/recipes?_app_id=93601eb7&_app_key=a92497f310f4293e5df2bcbe2c15ac0c",
 		type: "GET",
 		dataType: "jsonp",
 			data: {
 			q: query,
            maxResult: 60,
            start:0,			
            "excludedCourse[]":"course^course-Cocktails"
            // "excludedCourse[]":"course^course-Cocktails",
            // "excludedCourse[]":"course^course-Condiments_and_Sauces"
            // Condiments and Sauces, Cocktails 
            // },
            //It doesn't seem to exclude courses :(!!!
 		},
 			
 		success: function(result) {
 			$("#recipes").empty();
 			console.log(result)
 			recipeApp.displayRecipes(result.matches);
 		}
 	});
 };

 recipeApp.displayRecipes = function(data) {
 	$.each(data, function(i, recipe){
    //creating variable that is the link to the actual recipe
    var link = recipeApp.baseURL + recipe.id;
 	//creates an h3 in the html that displays the title found in the json file 
    //under recipeName
    var title = $("<h3>").text(recipe.recipeName);
 	//creates a div (called individualRecipe) in the html with the class of "recipe" which contains the title (h3)
    var individualRecipe = $("<div>").addClass("recipe").append(title);
    //adds an image within the div.recipe that is wrapped by the link created above
    individualRecipe.append('<a href="' + link + '"><img src="'+recipe.imageUrlsBySize[90] +  '"></a>');
 	//adds individualRecipe to the .recipe div
    $("#recipes").append(individualRecipe);
 	});
 	
 };

//put recipes on page
$(function(){
	recipeApp.init();
});



