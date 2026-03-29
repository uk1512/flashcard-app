

let cards = [
    {
        category: "Web Development",
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language",
        status: "new"
    },
    {
        category: "Web Development",
        question: "What is CSS used for?",
        answer: "Styling and layout of web pages",
        status: "new"
    },
    {
        category: "Web Development",
        question: "What is JavaScript used for?",
        answer: "Adding interactivity to websites",
        status: "new"
    },
    {
        category: "JavaScript",
        question: "What is a variable?",
        answer: "A container used to store data",
        status: "new"
    },
    {
        category: "JavaScript",
        question: "What is a function?",
        answer: "A block of code that performs a task",
        status: "new"
    },
    {
        category: "JavaScript",
        question: "What is an array?",
        answer: "A collection of multiple values",
        status: "new"
    },
    {
        category: "JavaScript",
        question: "What does DOM stand for?",
        answer: "Document Object Model",
        status: "new"
    },{
        category: "CSS",
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets",
        status: "new"
    },
    {
        category: "CSS",
        question: "What is Flexbox?",
        answer: "A layout system for aligning items",
        status: "new"
    },
    {
        category: "CSS",
        question: "What is Grid?",
        answer: "A layout system using rows and columns",
        status: "new"
    },
    {
        category: "Databases",
        question: "What is SQL?",
        answer: "Structured Query Language",
        status: "new"
    },
    {
        category: "Databases",
        question: "What is a database?",
        answer: "A system to store and manage data",
        status: "new"
    },
    {
        category: "Programming",
        question: "What is a loop?",
        answer: "A structure that repeats code",
        status: "new"
    },
    {
        category: "Programming",
        question: "What is a conditional statement?",
        answer: "A statement that runs based on a condition",
        status: "new"
    }



]

let saved = localStorage.getItem("cards")

if(saved){
    cards = JSON.parse(saved)
}

function save() {
    localStorage.setItem("cards",JSON.stringify(cards))
}

let filteredCards = [...cards]
let currentIndex = 0
let showAnswers = false


const studyBtn = document.getElementById("study-mode")
const allBtn = document.getElementById("all-cards")
const slider = document.querySelector(".slider")

let mode = "study"

studyBtn.addEventListener("click", ()=> {
    mode = "study"

    slider.style.transform = "translateX(0%)"
    studyBtn.classList.add("active")
    allBtn.classList.remove("active")

    displayCards()
})

allBtn.addEventListener("click", ()=> {
    mode="all"
    slider.style.transform = "translateX(90%)"

    allBtn.classList.add("active")
    studyBtn.classList.remove("active")

    displayCards()

})


document.getElementById("categories").addEventListener("change", filterCards)

function filterCards() {
    let filtered = cards
    const selected = document.getElementById("categories").value

    if(selected === "all") {
        filteredCards = [...cards]
    }else{
        filteredCards = cards.filter(card => card.category === selected)
    }
    displayCards()
    return filtered
}

function displayCards() {
    const card = filteredCards[currentIndex]
    let showAnswers = false

    document.getElementById("type").innerText = card.category
    document.getElementById("question").innerText = card.question


    document.querySelector("#navbar p").innerText = `Card ${currentIndex + 1} of ${filteredCards.length}`
}

function toggleAnswer() {

    const card = filteredCards[currentIndex]

    if(!showAnswers) {
        document.getElementById("question").innerText = card.answer
        showAnswers = true
        if(card.status === "new") {
            card.status = "learning"
            updateStats()
        }
    }else{
        document.getElementById("question").innerText = card.question
        showAnswers = false
    }
}

function prevCard() {
    let showAnswers = false
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = filteredCards.length - 1
    }
    showAnswers = false
    displayCards()
}

function nextCard() {
    let showAnswers = false
    currentIndex++;
    if(currentIndex >= filteredCards.length){
        currentIndex = 0
    }
    showAnswers = false
    displayCards()
}

function master() {
    filteredCards[currentIndex].status = "mastered"

    save()
    updateStats()
    updateProgressBar()
    nextCard()
}
function updateStats() {
    let total = filteredCards.length
    let mastered = cards.filter(card => card.status === "mastered").length
    let progress = cards.filter(card => card.status === "learning").length
    let notStarted = cards.filter(card =>card.status === "new").length

    document.getElementById("card-number").innerText = total
    document.getElementById("mastered-number").innerText = mastered
    document.getElementById("in-progress-number").innerText = progress
    document.getElementById("not-started-number").innerText = notStarted

    save()
}

function updateProgressBar() {
    let mastered = cards.filter(card => card.status === "mastered").length

    let percent = (mastered/filteredCards.length)*100
    document.getElementById("progress-bar").style.width = percent + "%"
}

document.getElementById("shuffle").addEventListener("click",shuffleCards)

function shuffleCards() {
    let filtered = filterCards()

    filtered.sort(()=> Math.random()-0.5)

    currentIndex = 0

    displayCards(filtered)
}

document.getElementById("reset").addEventListener("click",reset)

function reset() {
    cards.forEach(card => {
        card.status = "new"
    })
    save()
    displayCards()
    updateStats()
    updateProgressBar()
}

displayCards()
updateStats()
updateProgressBar()