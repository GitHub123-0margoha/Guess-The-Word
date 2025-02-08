// settting Game Name
let gameName = "Guess The Worde";
document.title = gameName; // كده العنوان بتاع الصفحه الرائيسيه
document.querySelector('h1').innerHTML = gameName;
document.querySelector('footer').innerHTML = `${gameName} Game Created By Omar Goha`;

// settting Game Options هنا بنشتغل علي الجزء الي في شمال اللعبه
let numbersOfTries = 5; // هنا عدد المحاولات بتاعه الشخص
let numberOfLetters = 6; // دي عدد احرف الكلمه
let currentTry = 1; // عشان في بدايه اللعبه اول خط هو الي يبقا واضح
let numberOfHintes = 2;

// manage Words هنا هنحط الكلمات الي المفروض هو يخمنها
let wordToGuess = "";
const wordes = ["Create" , "Update" , "Delete" , "Master" , "Branch" , "Mainly" , "Elzero" , "School"];
wordToGuess = wordes[Math.floor(Math.random() * wordes.length)].toLocaleLowerCase(); // هنا كده عشان يختار كلمه عشوائيه

let massageArea = document.querySelector(".message");

// manage Hints 
document.querySelector(".hint span").innerHTML = numberOfHintes;
const getHintButton = document.querySelector(".hint");

getHintButton.addEventListener("click" , getHint);



function generateInputs () {
    const inputsContainer = document.querySelector('.inputs');
    // creat Main try Div
    for (let i = 1; i <= numbersOfTries; i++) { // هنا ادنالو عدد المحاولات 6 يبقا اللوب هيشتغل 6 مرات
        const tryDiv = document.createElement('div');
        tryDiv.classList.add(`Try-${i}`); // هنا كده ادينا class
        tryDiv.innerHTML = `<span>Try ${i}</span>` // هنا كده عشان يبتدي يعد عدد المحاولات

        if (i !== 1) tryDiv.classList.add('disabled-inputs'); // بيضيف علي باقي المدخلات class اسمه كذا

        // Creat Inputs
        for (let j = 1; j <= numberOfLetters; j++) {
            const input = document.createElement("input"); // هنا هنضيف input
            input.type = "text"; // هنا نوع input text
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength" , "1"); // كل input اقدر اكتب فيه حرف واحد
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus(); // هنا عشان لما افتح الصفحه يعمل focus علي اول عنصر

    // disable All inputs Except first one
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true)); // خليهم مقدرش اعمل تاب واخش عليهم 

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input , index) => {
        // Convert Inputs To upper Case
        input.addEventListener("input" , function () {
            this.value = this.value.toUpperCase(); // كده هيخلي الحروف كلها كبيره
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus(); // هنا عشان يعمل foucs علي الدخل الي بعده طالما دخلت حرف
        });
        // Next Input By Arrow الاسهم يعني يمين وشمال
        input.addEventListener("keydown" , function (event) {
            const currentIndex = Array.from(inputs).indexOf(event.target); // هنا جبت index بتاع الانبت الي انا عنده دلوقتي

            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                
                if (prevInput >= 0) inputs[prevInput].focus();
            }
        });
    });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click" , handleGuesses);

function handleGuesses() {
    let successGuess = true;
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLocaleLowerCase();
        const actualLetter = wordToGuess[i - 1]; // ناقص 1 عشان currentTry بيبداء من 1 هنا عشان اجيب ازل حرف

        if (letter === actualLetter) {
            inputField.classList.add("yes-in-place");
        }
        else if (wordToGuess.includes(letter) && letter !== "") { // هنا لما الحرف صحيح بس مش فيه مكانه
            inputField.classList.add("not-in-place");
            successGuess = false;
        }
        else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    // Check If User Win or Lose
    if (successGuess) {
        if (numberOfHintes === 2) {
            massageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
        }
        else {
        massageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;

        }
        let allTryas = document.querySelectorAll(".inputs > div");
        allTryas.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        // disable Guess botton
        guessButton.disabled = true; // معناها لو هو جاوب صح خليه الزرار يبقا disable
        getHintButton.disabled =true;
    }
    else {
        // معناها حاتلي المحاوله 1 او 2 او 3 وهكذا وحطلي عليها class disabled يعني بعد م اكتب الكلمه هيبقا disable
        document.querySelector(`.Try-${currentTry}`).classList.add("disabled-inputs"); 

        const currentTryInputs = document.querySelectorAll(`.Try-${currentTry} input`); // معناها حاتلي الانبتس كلها
        currentTryInputs.forEach((input) => (input.disabled = true));

        currentTry++;

        // هنا هنيجي علي امحاوله التانيه 
        const nextTryInputs = document.querySelectorAll(`.Try-${currentTry} input`);
        nextTryInputs.forEach((input) => input.disabled = false);

        let element = document.querySelector(`.Try-${currentTry}`);
        if (element) {
            document.querySelector(`.Try-${currentTry}`).classList.remove("disabled-inputs"); // هنا عشان يمسح class الي عليهم
            element.children[1].focus(); // هنا عشان يعمل foucs علي طول علي اول عنصر موجود في input
        }
        else {
            guessButton.disabled = true;
            massageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
        }
    }
}

function getHint() {
    if (numberOfHintes > 0 ) {
        numberOfHintes--;
        document.querySelector(".hint span").innerHTML = numberOfHintes;
    }
    if (numberOfHintes === 0) {
        getHintButton.disabled = true; // خليه مينفعش يدوس عليه
    }
    const enableInput = document.querySelectorAll("input:not([disabled])"); // حات المدخلا الي مش عليها class disabled
    const emptyEnableInputs = Array.from(enableInput).filter((input) => input.value === "");
    
    if (emptyEnableInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnableInputs.length); // ده تبع عشان يطلع قيمه عشوائيه
        const randomInput = emptyEnableInputs[randomIndex];
        const indexFill = Array.from(enableInput).indexOf(randomInput);

        if (indexFill !== -1) {
            randomInput.value = wordToGuess[indexFill].toLocaleUpperCase();
        }
    }
}

function handelBackSpace(event) {
    if (event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);// العنصر الي انا فيه دلوقتي

        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
    
}
document.addEventListener("keydown" , handelBackSpace);

window.onload = function () { // هنا كده استدعينا الداله الي فوق
    generateInputs();
}
