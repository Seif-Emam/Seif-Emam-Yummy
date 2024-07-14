

let submitBtn;

$(document).ready(function () {
    
    $('.looding').fadeOut(500, function () {
        
        $('body').css('overflow', 'visible')
    })
})



function openSideNav() {

    let containerWidth = $('#SideNav').outerWidth();
    console.log(containerWidth);

    $('#SideNav').animate({ left: 0 }, 500);

    $('#SideNav a').each(function(index) {
        if (index < 5) {
            $(this).animate({
                top: 0
            }, (index + 5) * 90);
        }
    });
    

    $("#openNav").removeClass("fa-align-justify");
    $("#openNav").addClass("fa-x");
}




function closeNav() {
    let containerWidth = $('#Sidebar').outerWidth();
    console.log(containerWidth);

    $('#SideNav').animate({ left: `${-containerWidth}` }, 500);
    $("#openNav").addClass("fa-align-justify");
    $("#openNav").removeClass("fa-x");
    $("#SideNav a").animate({ top: 400 }, 200);

}




$('#openNav').click(function () {
    if ($("#SideNav").css("left") == "0px") {
        closeNav();


    } else {

        openSideNav();


    }
});




let ShowData = document.querySelector('.Show');

async function fetchMeals(category) {


    $('.looding').fadeIn(300);

    $('.loader').fadeIn(300);
    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    Meils(data.meals);

    $('.looding').fadeOut(300);

    $('.loader').fadeOut(300);


}



async function getMaels() {
    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data = await response.json();
    Meils(data.meals);
}



getMaels();



function Meils(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getMealsDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                <div class="Meal-overlay position-absolute d-flex justify-content-center flex-column align-items-center text-black p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
    }
    ShowData.innerHTML = cartona;
}




async function getCategories() {
    ShowData.innerHTML = "";

    $('.looding').fadeIn(500);

    $('.loader').fadeIn(500);

    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    displayCategories(data.categories);
    $('.looding').fadeOut(500);

    $('.loader').fadeOut(500);

    closeNav();

}

function displayCategories(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="fetchMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor">
                <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                <div class="Meal-overlay position-absolute d-flex flex-column align-items-center text-black p-2">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>`;
    }
    ShowData.innerHTML = cartona;
}

async function getArea() {
    ShowData.innerHTML = "";

    $('.looding').fadeIn(300);

    $('.loader').fadeIn(300);

    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await response.json();
    displayArea(data.meals);
    closeNav();
    $('.looding').fadeOut(300);

    $('.loader').fadeOut(300);


}

function displayArea(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3 ">
            <div onclick="fetchMealsByArea('${arr[i].strArea}')" class="text-center cursor ">
                <i class="fa-solid fa-house-laptop fa-4x "></i>
                <h3>${arr[i].strArea}</h3>
            </div>
        </div>`;
    }
    ShowData.innerHTML = cartona;
}


async function fetchMealsByArea(area) {
    $('.looding').fadeIn(300);

    $('.loader').fadeIn(300);
    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    Meils(data.meals);

    $('.looding').fadeOut(300);

    $('.loader').fadeOut(300);
}

async function getIngredients() {
    ShowData.innerHTML = "";
    $('.looding').fadeIn(300);

    $('.loader').fadeIn(300);



    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await response.json();
    displayIngredients(data.meals.slice(0, 20));
    $('.looding').fadeOut(300);

    $('.loader').fadeOut(300);

    closeNav();

}


function displayIngredients(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="fetchMealsByIngredients('${arr[i].strIngredient}')" class="text-center cursor ">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription ? arr[i].strDescription.split(" ").slice(0, 20).join(" ") + '...' : ''}</p>
            </div>
        </div>`;
    }
    ShowData.innerHTML = cartona;
}



async function fetchMealsByIngredients(Ingredients) {
    $('.looding').fadeIn(300);

    $('.loader').fadeIn(300);

    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
    let data = await response.json();
    Meils(data.meals);
    $('.looding').fadeOut(300);

    $('.loader').fadeOut(300);


}



async function getMealsDetails(mealID) {
    ShowData.innerHTML = "";

    closeNav();

    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await response.json();
    displayDetails(data.meals[0]);
}

function displayDetails(meal) {
    let cartona = `
        <div class="col-md-4">
            <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
            <h3>Recipes:</h3>
            <div class="d-flex flex-wrap g-4 text-black">
                ${getIngredientsAndMeasures(meal)}
            </div>
            <h3>Tags:</h3>
            ${meal.strTags ? meal.strTags.split(',').map(tag => `<span class="btn btn-light m-1">${tag}</span>`).join('') : ''}
            <br><br>
            <a href="${meal.strSource}" class="btn btn-warning"><i class="fa-solid fa-square-up-right"></i> Source</a>
            <a href="${meal.strYoutube}" class="btn btn-danger text-white"><i class="fa-brands fa-youtube"></i> Youtube</a>
        </div>
    `;

    ShowData.innerHTML = cartona;
}


function getIngredientsAndMeasures(meal) {


    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`<span class="bg-body-tertiary m-2 p-2 rounded-3">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`);
        }
    }
    return ingredients.join('');

}





function validateInputs(elem) {
    const submitBtn = document.getElementById("submitBtn");

    const regex = {
        Name: /^[A-Za-z]{3,}$/,
        Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        Password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        Age: /^(1[6-9]|[2-9][0-9]|1[01][0-9]|120)$/,
        Phone: /^(?:\+?(\d{1,3})[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{7,10}$/
    };

    const isValid = regex[elem.id].test(elem.value);
    const alertDiv = elem.nextElementSibling;

    if (isValid) {
        elem.classList.add('is-valid');
        elem.classList.remove('is-invalid');
        alertDiv.classList.add('d-none');
        alertDiv.classList.remove('d-block');
    } else {
        elem.classList.add('is-invalid');
        elem.classList.remove('is-valid');
        alertDiv.classList.add('d-block');
        alertDiv.classList.remove('d-none');
    }

    return isValid;
}

function VPass() {
    const passInput = document.getElementById('Password');
    const rePassInput = document.getElementById('RePassword');

    const passwordsMatch = passInput.value === rePassInput.value;
    const rePassAlertDiv = rePassInput.nextElementSibling;

    if (passwordsMatch) {
        rePassInput.classList.add('is-valid');
        rePassInput.classList.remove('is-invalid');
        rePassAlertDiv.classList.add('d-none');
        rePassAlertDiv.classList.remove('d-block');
    } else {
        rePassInput.classList.add('is-invalid');
        rePassInput.classList.remove('is-valid');
        rePassAlertDiv.classList.remove('d-none');
        rePassAlertDiv.classList.add('d-block');
    }

    return passwordsMatch;
}

function validateAllInputs() {
    const nameInput = document.getElementById('Name');
    const emailInput = document.getElementById('Email');
    const passInput = document.getElementById('Password');
    const ageInput = document.getElementById('Age');
    const phoneInput = document.getElementById('Phone');
    const rePassInput = document.getElementById('RePassword');

    const isNameValid = validateInputs(nameInput);
    const isEmailValid = validateInputs(emailInput);
    const isPassValid = validateInputs(passInput);
    const isAgeValid = validateInputs(ageInput);
    const isPhoneValid = validateInputs(phoneInput);
    const arePasswordsMatching = VPass();

    const submitBtn = document.getElementById("submitBtn");
    if (isNameValid && isEmailValid && arePasswordsMatching  && isAgeValid && isPhoneValid && isPassValid ) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }

    return isNameValid && isEmailValid && isPassValid && isAgeValid && isPhoneValid && arePasswordsMatching  ;
}


function ContcatUs() {
    closeNav();

    ShowData.innerHTML = ` 
<div class="Contact-us d-flex justify-content-center align-items-center min-vh-100">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input oninput=" validateInputs(this)"   type="text" class="form-control" id="Name" placeholder="Enter Your Name">
                <div class="alert alert-danger w-100 mt-2 d-none">Special characters and numbers not allowed</div>
            </div>
            <div class="col-md-6">
                <input oninput=" validateInputs(this)"  type="email" class="form-control" id="Email" placeholder="Enter Your Email">
                <div class="alert alert-danger w-100 mt-2 d-none">Email not valid *example@yyy.zzz</div>
            </div>
            <div class="col-md-6">
                <input oninput=" validateInputs(this)"  type="text" class="form-control" id="Phone" placeholder="Enter Your Phone">
                <div class="alert alert-danger w-100 mt-2 d-none">Enter valid Phone Number</div>
            </div>
            <div class="col-md-6">
                <input oninput=" validateInputs(this)"  type="number" class="form-control" id="Age" placeholder="Enter Your Age">
                <div class="alert alert-danger w-100 mt-2 d-none">Enter valid age</div>
            </div>
            <div class="col-md-6">
                <input oninput="validateInputs(this),validateAllInputs(this)
                " type="password" class="form-control" id="Password" placeholder="Enter Your Password">
                <div class="alert alert-danger w-100 mt-2 d-none">Enter valid password *Minimum eight characters, at least one letter and one number*</div>
            </div>
            <div class="col-md-6">
                <input oninput="validateAllInputs(this)" " type="password" class="form-control" id="RePassword" placeholder="Re-enter Password">
                <div class="alert alert-danger w-100 mt-2 d-none ">Passwords do not match</div>
            </div>
        </div>
        <button  id="submitBtn" disabled="true" class="btn btn-outline-danger px-5 mt-4">Submit</button>
    </div>
</div>
`
}


 let searchContainer= document.querySelector('.searchContainer')
function DisplaySearchInputs() {
    closeNav()

    searchContainer.innerHTML = `
               <div class="row py-4">
                <div class="col-md-6">
                    <input onkeyup="searchByName(this.value)" id="SName" class="form-control searchBox bg-transparent text-white" type="text" placeholder="Search By Name">
                </div>
                <div class="col-md-6">
                    <input onkeyup="searchByFirstLetter(this.value)" id="Sletter" maxlength="1" class="form-control searchBox bg-transparent text-white" type="text" placeholder="Search By First Letter">
                </div>
            </div>
        `;

        ShowData.innerHTML = ""

}



  const SeName=document.getElementById('SName');
  const SeLetter=document.getElementById('Sletter');


  async function searchByName(name) {


    $('.looding').fadeIn(300);

    $('.loader').fadeIn(300);
    closeNav();
    ShowData.innerHTML=""

    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    
        let data = await response.json();
        
        if (data.meals) {
   
            Meils(data.meals);
            console.log("Meals found");
        } else {
            Meils([]);
            console.log("No meals found");
        }
    

    $('.looding').fadeOut(300);
    $('.loader').fadeOut(300);
}


async function searchByFirstLetter(letter){
    closeNav()

    ShowData.innerHTML = "";

    $('.looding').fadeIn(300);

    $('.loader').fadeIn(300);

    if (letter === "") {
        letter = "a";
    }
    let response = await fetch(`Https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let  data = await response.json();
    if (data.meals) {
   
        Meils(data.meals);
        console.log("Meals found");
    } else {
        Meils([]);
        console.log("No meals found");
    }

     
    $('.looding').fadeOut(300);

    $('.loader').fadeOut(300);



}
