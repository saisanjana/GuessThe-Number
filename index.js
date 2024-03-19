const numStars = 25; // Number of stars

// Function to generate stars
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    while (starsContainer.firstChild) {
        starsContainer.removeChild(starsContainer.firstChild);
    }
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('stars');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);
    }
}

// Call the function to generate stars when the page loads
generateStars();


let maxNumber = 100;
let maxLengthOFMaxNumber = maxNumber.toString(2).length;
let pages = {};
let pageIndex = 0;
let resultHelper = [];
constructPages();
function getBinaryString(num){
    return num.toString(2).padStart(maxLengthOFMaxNumber,'0')
}

function constructPages(){
    for(let i = 1;i<=100;i++){
        let binArray = getBinaryString(i).split('');
        console.log(i,binArray)
        binArray.forEach((element,index) => {
            if(element === '1'){
                if(pages[index+1]) {
                    pages[index+1].push(i)
                }else{
                     pages[index+1] = [i]
                }
            }
        });
    }
    console.log(pages)
}

function calculateAnswer(){
    let resultNumber = document.getElementById("resultNumber")
    console.log(resultHelper)
    let result = parseInt(resultHelper.join(''),2)
    if(result){
        if(result>100){
        resultNumber.innerText = 'You did not think of number in between 1-100 right??'
        }else{
            resultNumber.innerText = result;
        }
    }else{
        resultNumber.innerText = 'You made me a fool, you didn\'t think of any number'
    }

}

function updatePageDataInHTML(){
    let numbers = pages[pageIndex];
    let pageNumbersNode  = document.getElementById("pageNumbers");
    pageNumbersNode.innerText = numbers.join(', ');

}

function updateResultHelper(flag){
    if(resultHelper.length < pageIndex){
        if(flag){
            resultHelper.push(1);
        }else{
            resultHelper.push(0);
        }
        goToNextPage();
    }
}

function activateYesOrNoButtons(activate){
    console.log("helo")
    let page = document.getElementById("page");
    if(activate){
        console.log("hello")
        page.style.display = 'flex';
        
    }else{
        page.style.display = 'none';
        

    }

}

function showResultsPage(show){
    let result = document.getElementById("result")
    if(show){
        result.style.display = 'flex';
    }else{
        result.style.display = 'none';
    }
}

function showInitialPage(show){
    let home = document.getElementById("home");
    if(show){
        home.style.display = 'flex';
    }else{
        home.style.display = 'none';
    }
}

function restartGame(){
    pageIndex = 0;
    resultHelper = [];
    showResultsPage(false);
    showInitialPage(true);
}

function goToNextPage(){
    generateStars();
    pageIndex +=1;
    if(pageIndex === (maxLengthOFMaxNumber +1)){
        calculateAnswer();
        activateYesOrNoButtons(false);
        showResultsPage(true);
    }else{
        if(pageIndex === 1){
            showInitialPage(false);
            activateYesOrNoButtons(true);
        }
        updatePageDataInHTML();
    }
}


