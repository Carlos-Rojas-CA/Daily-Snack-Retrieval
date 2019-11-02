var appKey = '2b521dcbf46810d43deb4721045540f0';
var appId = 'b45790b7';
//var qSearch = $('#preference').val() 
var qSearch = 'ramen';
var qAllergyArray = ['&health=tree-nut-free&health=peanut-free',
    '&health=dairy-free', '&health=egg-free', '&health=shellfish-free',
    '&health=wheat-free', '&health=soy-free', '&health=fish-free'];

var fromQuery = '&from='
var toQuery = '&to='

var resultIngredients 
var resultInstructionsURL 
var resultImageURL 
var resultLabel 
var resultHealthLabel 
var diet='';

var nameInput = $('#name-input');
var nameUser = '';
var balancedMealEl = document.getElementById('balanced')
var highProteinEl = document.getElementById('high-protein')
var highFiberEl = document.getElementById('high-fiber')
var lowFatEl = document.getElementById('low-fat')
var lowCarbEl = document.getElementById('low-carb')
var lowSodiumEl = document.getElementById('low-sodium')
var noneEl = document.getElementById('none')
var qMealTypeArray = ['&diet=balanced', '&diet=high-protein', '&diet=high-fiber', '&diet=low-fat', '&diet=low-carb', '&diet=low-sodium', '']
var mealElArray = [balancedMealEl, highProteinEl, highFiberEl, lowFatEl, lowCarbEl, lowSodiumEl, noneEl]

var nameWelcome = $('#user-welcome')
var nutAllergyEl = $('#nut-allergy')
var dairyAllergyEl = $('#dairy-allergy')
var eggAllergyEl = $('#egg-allergy')
var shellfishAllergyEl = $('#shellfish-allergy')
var wheatAllergyEl = $('#wheat-allergy')
var soyAllergyEl = $('#soy-allergy')
var fishAllergyEl = $('#fish-allergy')
var resultsContainerEL = $(".results-container")

var weatherKeyword =''

//Empty array that will contain URL parameters depending on checked allergies
var allergyURLArray = []

nutAllergyEl.change(function () {
    if ($(this).is(':checked')) {
        allergyURLArray.push(qAllergyArray[0])
        console.log(allergyURLArray)
    }
    else {
        allergyURLArray = allergyURLArray.filter(item => item !== '&health=tree-nut-free&health=peanut-free')
        console.log()
    }
});
dairyAllergyEl.change(function () {
    if ($(this).is(':checked')) {
        allergyURLArray.push(qAllergyArray[1])
        console.log(allergyURLArray)
    }
    else {
        allergyURLArray = allergyURLArray.filter(item => item !== '&health=dairy-free')
        console.log(allergyURLArray)
        
    }
});
eggAllergyEl.change(function () {
    if ($(this).is(':checked')) {
        allergyURLArray.push(qAllergyArray[2])
        console.log(allergyURLArray)
    }
    else {
        allergyURLArray = allergyURLArray.filter(item => item !== '&health=egg-free')
        console.log(allergyURLArray)
        
    }
});
shellfishAllergyEl.change(function () {
    if ($(this).is(':checked')) {
        allergyURLArray.push(qAllergyArray[3])
        console.log(allergyURLArray)
    }
    else {
        allergyURLArray = allergyURLArray.filter(item => item !== '&health=shellfish-free')
        console.log(allergyURLArray)
        
    }
});
wheatAllergyEl.change(function () {
    if ($(this).is(':checked')) {
        allergyURLArray.push(qAllergyArray[4])
        console.log(allergyURLArray)
    }
    else {
        allergyURLArray = allergyURLArray.filter(item => item !== '&health=wheat-free')
        console.log(allergyURLArray)
        
    }
});
soyAllergyEl.change(function () {
    if ($(this).is(':checked')) {
        allergyURLArray.push(qAllergyArray[5])
        console.log(allergyURLArray)
    }
    else {
        allergyURLArray = allergyURLArray.filter(item => item !== '&health=soy-free')
        console.log(allergyURLArray)
        
    }
});
fishAllergyEl.change(function () {
    if ($(this).is(':checked')) {
        allergyURLArray.push(qAllergyArray[6])
        console.log(allergyURLArray)
    }
    else {
        allergyURLArray = allergyURLArray.filter(item => item !== '&health=fish-free')
        console.log(allergyURLArray)
        
    }
});

/////////////////////////////////////////////////////////Checks for previous stored allergies
var defaultChecked = $('.filled-in').attr('checked', false)

if(localStorage.getItem('allergy') !== null){
    var checker = JSON.parse(localStorage.getItem('allergy'))
    for(var i = 0; i< qAllergyArray.length; i++){
        // console.log(checker)
        for(var j = 0; j<checker.length; j++){
            
            if(qAllergyArray[i] === checker[j]){
                // console.log('hi')
                if(i===0){
                    $('#nut-allergy').attr('checked', true)
                    allergyURLArray.push(qAllergyArray[i])
                }
                if(i===1){
                    $('#dairy-allergy').attr('checked', true)
                    allergyURLArray.push(qAllergyArray[i])
                }
                if(i===2){
                    $('#egg-allergy').attr('checked', true)
                    allergyURLArray.push(qAllergyArray[i])
                }
                if(i===3){
                    $('#shellfish-allergy').attr('checked', true)
                    allergyURLArray.push(qAllergyArray[i])
                }
                if(i===4){
                    $('#wheat-allergy').attr('checked', true)
                    allergyURLArray.push(qAllergyArray[i])
                }
                if(i===5){
                    $('#soy-allergy').attr('checked', true)
                    allergyURLArray.push(qAllergyArray[i])
                }
                if(i===6){
                    $('#fish-allergy').attr('checked', true)
                    allergyURLArray.push(qAllergyArray[i])
                }
                
            }
        }
    }
}

if(localStorage.getItem('mealtype') !== null){
    var checker = JSON.parse(localStorage.getItem('mealtype'))
    for(var i = 0; i< mealElArray.length; i++){
        if (qMealTypeArray[i] === checker){
            mealElArray[i].setAttribute('checked', true)
            diet = qMealTypeArray[i]
        }
    }
}

if(localStorage.getItem('username') !== null){
    var welcome = window.localStorage.getItem('username')
    nameWelcome.text('Welcome back ' + welcome + "!")
}

////////////////////////////////////////SAVE BUTTTON
$('#save-info').on('click', function(){
    window.localStorage.setItem('allergy', JSON.stringify(allergyURLArray))
    console.log(window.localStorage.getItem('allergy'))
    for(var i = 0; i< mealElArray.length; i++){
        if (mealPrefCheck(mealElArray[i]) === true){
            diet = qMealTypeArray[i]
        }
    }
    window.localStorage.setItem('mealtype', JSON.stringify(diet))
    console.log(window.localStorage.getItem('mealtype'))
    nameUser = nameInput.val();
    window.localStorage.setItem('username', nameUser)
    nameWelcome.text('Welcome back ' + nameUser + "!")
    console.log(window.localStorage.getItem('username'))

})

///////////////////////////////////////SEARCH BUTTON
$('#search').on('click', function(event){
    event.preventDefault();
    resultsContainerEL.html('');
    qSearch= $('#foodtype').val()
    var queryURL = 'https://api.edamam.com/search?q=' + qSearch
    allergyURLArray.forEach(function(element){
        queryURL += element;
    })
    queryURL += diet + '&app_id=$' + appId + '&app_key=$' + appKey;
    
    
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (list) {
        var totalNumber = list.count
        if(totalNumber>9940){
            totalNumber = 9940
        }
        var randNumber = Math.floor(Math.random() * totalNumber);
        var toNumber = randNumber+50;
        var fromNumber = randNumber-50;
        randNumber = Math.floor(Math.random() * 100);
        if(toNumber>totalNumber){
            toNumber=totalNumber;
            fromNumber= totalNumber -100;
        }
        if(fromNumber<0){
            fromNumber=0;
            toNumber=100;
            if(toNumber>totalNumber){
                toNumber=totalNumber;
            }
        } 
        var rangeNumber = toNumber-fromNumber-1;
        


        queryURL += fromQuery + fromNumber + toQuery + toNumber;

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){

            for(var i=0; i<5; i++){
                randNumber = Math.floor(Math.random() * rangeNumber);

                console.log(randNumber)
                var result = response.hits[randNumber].recipe;
                console.log('response')
                console.log(response)
                resultIngredients = result.ingredientLines;
                resultInstructionsURL = result.url;
                resultImageURL = result.image;
                resultLabel = result.label;
                resultHealthLabel = result.healthLabels;
                var nutri = result.digest;
                var caloriesKiloCal = parseInt(result.totalNutrients.ENERC_KCAL.quantity);
                var caloriesdaily = caloriesKiloCal / 20; //This is in percent
                var fat = nutri[0];
                var carbs = nutri[1];
                var protein = nutri[2];
                var cholestrol = nutri[3];
                var sodium = nutri[4];
                createCard()
            }   
        })
    })
})


function mealPrefCheck(mealEl){
    var isChecked = mealEl.checked
    return isChecked
}


function createCard() {
    var outerDiv = $("<div class='row'></div>")
    var outerInnerDiv = $("<div>")
    outerInnerDiv.attr('class', 'col s12 m6')
    var styleDiv = $("<div>")
    styleDiv.attr('class', 'card #fafafa grey lighten-5 col')
    var imageDiv = $("<div>")
    imageDiv.attr('class', 'card-content')
    var cardImage = $("<img src=" + resultImageURL + ">")
    var cardTitle = $("<span class='card-title'>" + resultLabel + "<span>")
    var contentDiv = $("<ul>")
    contentDiv.attr('class', 'card-content')
    for(var i=0; i<resultIngredients.length; i++){
        var cardContent = $('<li>' + resultIngredients[i] + '</li>')
        contentDiv.append(cardContent)
    }
    var linkDiv = $("<div>")
    linkDiv.attr('class', 'card-action')
    var cardLink = $("<a href=" + resultInstructionsURL + ">Instructions</a>")
    contentDiv.append(cardContent)
    linkDiv.append(cardLink)
    imageDiv.append(cardImage)
    imageDiv.append(cardTitle)
    styleDiv.append(imageDiv)
    styleDiv.append(contentDiv)
    styleDiv.append(linkDiv)
    outerInnerDiv.append(styleDiv)
    outerDiv.append(outerInnerDiv)
    console.log(outerInnerDiv)
    resultsContainerEL.prepend(outerDiv)
}

//====================================Get Lucky BUTTON==========
$("#get-lucky").on("click", function () {
    event.preventDefault();
    var searchValue = $("#zipcode").val();
    if(searchValue === null){
        return
    }
    getWeatherData(searchValue);
})

function getWeatherData(searchedCity) {

    var APIKey = "1cc5557678da6e75998efa1634ff4271";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + searchedCity + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        type: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log(response)
            var tempNow = response.main.temp
            if(tempNow < 32){
                weatherKeyword = 'hot chocolate'
            }
            if(tempNow >= 32 && tempNow < 50){
                weatherKeyword = 'soup'
            }
            if(tempNow>=50 && tempNow < 75){
                weatherKeyword = 'hot sandwich'
            }
            if(tempNow>=75){
                weatherKeyword = 'bbq'
            }



            resultsContainerEL.html('');
            var queryURL = 'https://api.edamam.com/search?q=' + weatherKeyword;
            console.log(weatherKeyword)
            
            allergyURLArray.forEach(function(element){
                queryURL += element;
            })

            queryURL += diet + '&app_id=$' + appId + '&app_key=$' + appKey;
            
            
            $.ajax({
                url: queryURL,
                method: 'GET',
            }).then(function (list) {
                var totalNumber = list.count
                if(totalNumber>9940){
                    totalNumber = 9940
                }
                var randNumber = Math.floor(Math.random() * totalNumber);
                var toNumber = randNumber+50;
                var fromNumber = randNumber-50;
                randNumber = Math.floor(Math.random() * 100);
                if(toNumber>totalNumber){
                    toNumber=totalNumber;
                    fromNumber= totalNumber -100;
                }
                if(fromNumber<0){
                    fromNumber=0;
                    toNumber=100;
                    if(toNumber>totalNumber){
                        toNumber=totalNumber;
                    }
                } 
                
                var rangeNumber = toNumber-fromNumber-1;
                


                queryURL += fromQuery + fromNumber + toQuery + toNumber;

                $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).then(function(response){
                    randNumber = Math.floor(Math.random() * rangeNumber);
                    console.log(randNumber)
                    var result = response.hits[randNumber].recipe;
                    console.log('response')
                    console.log(response)
                    resultIngredients = result.ingredientLines;
                    resultInstructionsURL = result.url;
                    resultImageURL = result.image;
                    resultLabel = result.label;
                    resultHealthLabel = result.healthLabels;
                    createCard()   
                })
            })

        })
    }
