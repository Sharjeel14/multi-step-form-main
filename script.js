var form1List = [];
var form2NameList = [];
var form2PriceList = [];
var form2NameList = [];
var form3NameList = [];
var form3PriceList = [];

var currentDivIndex = 1;

var divs = Array.from(document.getElementsByClassName("number"));
var cardPrice = Array.from(document.getElementsByClassName("price"));
var addOnPrice = Array.from(document.getElementsByClassName("addon-price"));
divs[0].classList.add("active");

let switchElement = document.getElementById("switch");
let months = document.getElementById('month')
let freeMonths = document.getElementsByClassName('free-heading')
let year = document.getElementById('year')

let isCardSelected = false; // Variable to keep track of the selected state
var selectableCards = document.querySelectorAll('.card1');
selectableCards.forEach((card) => {
    card.addEventListener('click', (event) => {

        event.stopPropagation(); // Prevent event bubbling
        const isSelected = card.classList.contains('selected1');

        // Deselect the previously selected card if it exists
        const selectedCard = document.querySelector('.selected1');
        if (selectedCard) {
            selectedCard.classList.remove('selected1');
        }

        // Toggle the selected state of the clicked card
        if (!isSelected) {
            card.classList.add('selected1');
            isCardSelected = true;
        } else {
            isCardSelected = false;
        }
        const planeName = card.querySelector('.card-title h4').innerHTML;
        const planePrice = card.querySelector('.card-title p').innerHTML;
        const planeSubsription = card.querySelector('.card-title h5').innerHTML;
        var form2NameListTemp = [];
        var form2PriceListTemp = [];

        form2NameListTemp.push(planeName)
        form2NameList = form2NameListTemp.splice(0, 1); // Create a new array 
        form2PriceListTemp.push(planePrice)
        form2PriceList = form2PriceListTemp.splice(0, 1); // Create a new array 

    });
});
let checkboxCard = true;

function isAnyCardSelected() {
    var divs2 = document.querySelectorAll('.card2');
    for (var i = 0; i < divs2.length; i++) {
        if (divs2[i].classList.contains('selected2')) {
            return true;
        }
    }
    return false;
}

var divs2 = document.querySelectorAll('.card2');

divs2.forEach((card) => {
    var checkbox = card.querySelector('.checkbox');
    card.addEventListener('click', function () {

        checkboxCard = !checkboxCard;
        checkbox.checked = !checkbox.checked; // Toggle the checked state
        card.classList.toggle('selected2');
        let serviceName = card.querySelector(".addon-name").innerHTML;
        let servicePrice = card.querySelector(".addon-price").innerHTML;

        let found1 = form3NameList.includes(serviceName);
        let found2 = form3PriceList.includes(servicePrice);
        if (found1) {
            let index1 = form3NameList.indexOf(serviceName);
            if (index1 !== -1) {
                form3NameList.splice(index1, 1);
            }
        } else {
            form3NameList.push(serviceName);
        }
        if (found2) {
            let index2 = form3PriceList.indexOf(servicePrice);
            if (index2 !== -1) {
                form3PriceList.splice(index2, 1);
            }
        } else {
            form3PriceList.push(servicePrice);
        }
    });
});



let form1 = document.querySelector('#form-1')
let form2 = document.querySelector('#form-2')
let form3 = document.querySelector('#form-3')
let form4 = document.querySelector('#form-4')
let form5 = document.querySelector('#form-5')

function goNext() {

    var inputs = Array.from(document.getElementsByClassName("form-input1"));
    var texts = Array.from(document.getElementsByClassName("error"));
    var hasEmptyInputs = inputs.some(input => input.value.trim() === '');

    inputs.forEach((input, index) => {
        texts[index].style.visibility = input.value.trim() === '' ? "visible" : "hidden";
    });
    if (hasEmptyInputs) {

    } else {
        form1.style.display = 'none'
        form2.style.display = 'block'
        nextStep();
        let name = document.querySelector("#name").value
        let email = document.querySelector("#email").value
        let phone = document.querySelector("#phone").value
        form1List = []
        form1List.push(name)
        form1List.push(email)
        form1List.push(phone)
        form1List.push('Monthly')

    }
    // SelectedCard2()
}
function previousStep2() {
}
function previousStep(formd1, formd2, formd3, formd4) {

    if (currentDivIndex > 0) {
        currentDivIndex--;
        divs[currentDivIndex].classList.remove("active");
        currentDivIndex--;
        divs[currentDivIndex].classList.add("active");
        form1.style.display = formd1
        form2.style.display = formd2
        form3.style.display = formd3
        form4.style.display = formd4
        currentDivIndex++;

    }
    // allplans.forEach((plan) => {
    var allplans = document.querySelectorAll('.plan-service');
    allplans.forEach(function (div) {
        div.remove();
    });
    // });
}
// function to chhange steps
function nextStep() {
    if (currentDivIndex > 0) {
        divs[currentDivIndex - 1].classList.remove("active");
    }
    divs[currentDivIndex].classList.add("active");

    if (currentDivIndex < divs.length - 1) {
        currentDivIndex++;
    }
}
function goNext2() {
    if (isCardSelected) {
        nextStep()
        form2.style.display = 'none'
        form3.style.display = 'block'
    }
}
SelectedCard2()
year.classList.add('heading')

function toggleSwitch() {
    form3NameList = [];
    form3PriceList = [];
    divs2.forEach((card) => {
        card.classList.remove('selected2');
    });
    var checkBoxes = document.querySelectorAll('.checkbox');
    checkBoxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    SelectedCard2()
    isCardSelected = false
    selectableCards.forEach((card) => {
        card.classList.remove('selected1');
    });
}
function SelectedCard2() {
    if (switchElement.checked) {
        form1List.push('Yearly')
        let foundMonthList = form1List.includes('Monthly');
        if (foundMonthList) {
            let foundMonth = form1List.indexOf('Monthly');
            if (foundMonth !== -1) {
                form1List.splice(foundMonth, 1);
            }
        }
        months.classList.add('heading')
        year.classList.remove('heading')
        for (i = 0; i < freeMonths.length; i++) {
            freeMonths[i].classList.add('free-months')
        }
        let index = 90;
        cardPrice.forEach((price) => {
            price.innerHTML = '$' + index + '/year'
            index = index + 30
        });
        let addonPrice = 10;

        addOnPrice.forEach((addon, index) => {
            if (index === 0) {
                addon.innerHTML = '+$' + addonPrice + '/yr';
            }
            else if (index === 1) {
                addon.innerHTML = '+$20/yr';
            } else {

                addon.innerHTML = '+$30/yr';
            }
        });

    } else {
        form1List.push('Monthly');
        let foundYearList = form1List.includes('Yearly');
        if (foundYearList) {
            let foundYear = form1List.indexOf('Yearly');
            if (foundYear !== -1) {
                form1List.splice(foundYear, 1);
            }
        } // Output: Updated array without the element
        months.classList.remove('heading')
        year.classList.add('heading')
        for (i = 0; i < freeMonths.length; i++) {
            freeMonths[i].classList.remove('free-months')
        }
        let index = 9;
        cardPrice.forEach((price) => {
            price.innerHTML = '$' + index + '/month'
            index = index + 3
        });
        let addonPrice = 1;

        addOnPrice.forEach((addon, index) => {
            if (index === 0) {
                addon.innerHTML = '+$' + addonPrice + '/mo';
            } else if (index === 1) {
                addon.innerHTML = '+$2/mo';
            } else {
                addon.innerHTML = '+$3/mo';
            }
        });
    }

}
function goNext3() {
    let nextDiv = document.querySelector('#final-next');

    console.log(form3NameList.length)
    if (form3NameList.length == 2) {
        console.log('ifelse')
        nextDiv.style.height = 'calc(100vh - 576px)'
    } else if (form3NameList.length == 3) {
        console.log('ifelse')
        nextDiv.style.height = 'calc(100vh - 620px)'
    }
    else if (form3NameList.length == 1) {
        console.log('else')
        nextDiv.style.height = 'calc(100vh - 530px)'
    } else {
        nextDiv.style.height = 'calc(100vh - 513px)'
    }
    // console.log(form1List)
    // console.log(form2NameList);
    // console.log(form2PriceList);
    // console.log(form3NameList)
    // console.log(form3PriceList)

    var total = 0;

    for (var i = 0; i < form3PriceList.length; i++) {
        var price = form3PriceList[i];
        var numericValue = parseFloat(price.match(/\d+/)[0]);
        total += numericValue;
    }
    // Add base price
    var basePrice = form2PriceList[0];
    var baseNumericValue = parseFloat(basePrice.match(/\d+/)[0]);
    total += baseNumericValue;

    var isSelected = isAnyCardSelected()
    // if (isSelected) {
    nextStep()
    currentDivIndex++;
    form1.style.display = 'none'
    form2.style.display = 'none'
    form3.style.display = 'none'
    form4.style.display = 'block'

    var ul = document.getElementById('finished-plan');

    for (var i = 0; i < form3NameList.length; i++) {
        var div = document.createElement('div');
        div.className = 'plan-service';

        var h4 = document.createElement('h4');
        h4.textContent = form3NameList[i];

        var h5 = document.createElement('h5');
        h5.textContent = form3PriceList[i];

        div.appendChild(h4);
        div.appendChild(h5);
        ul.appendChild(div);
    }
    // }

    let planType;
    if (form1List[3] === 'Monthly') {
        planType = 'mo'
    } else {
        planType = 'yr'
    }
    document.querySelector('#final-plan-title').innerHTML = form2NameList[0] + '(' + form1List[3] + ')'
    document.querySelector('#final-plan-price').innerHTML = form2PriceList[0]
    document.querySelector('#final-total-price').innerHTML = '$' + total + '/' + planType

}
function confirmFunction() {
    form4.style.display = 'none'
    form5.style.display = 'block'

}


// document.querySelector("#chk1").addEventListener('click', function () {
//     console.log('check1')
//     console.log(divs[0])
//     divs2[0].classList.toggle('selected');
// });



// divs2.forEach((checkbox) => {
//     // checkbox.addEventListener('click', function () {
//     //     console.log(divs2)
//     //     console.log(checkbox)
//     //     if (this.checked) {
//     //         divs.classList.remove('selected')
//     //     } else {
//     //         divs2.classList.add('selected')

//     //     }
//     // });
//     var checkboxs = checkbox.querySelector('.card2');
//     checkboxs.addEventListener('click', function () {
//         this.classList.toggle('selected');
//     });

// });
// var checkbox = document.getElementById('chk1');
// checkbox.disabled = true;
// var checkbox = document.getElementById('chk2');
// checkbox.disabled = true;
// var checkbox = document.getElementById('chk1');
// checkbox.disabled = true;
// var checkBoxes = document.querySelectorAll('.checkbox');
// checkBoxes.forEach((checkbox, index) => {

//     checkbox.addEventListener('click', function () {
//         divs2[index].classList.toggle('selected');
//     });
// });

