const buttonPointsElements = document.querySelectorAll("[data-js-button-points]")
const blockElements = document.querySelectorAll("[data-js-blocks]")
const buttonDailyElement = document.querySelector("[data-js-button-daily]")
const buttonWeeklyElement = document.querySelector("[data-js-button-weekly]")
const buttonMonthlyElement = document.querySelector("[data-js-button-monthly]")
const activityElements = document.querySelectorAll("[data-js-activity]")



buttonPointsElements.forEach((button, index) => {
    button.addEventListener("mouseenter", () => {
        if (blockElements[index]) {
            blockElements[index].classList.remove("hover:brightness-140")
            button.classList.add("hover:invert", "hover:brightness-0")
        }
    })
    
    button.addEventListener("mouseout", (event) => {
        if (blockElements[index]) {
            blockElements[index].classList.add("hover:brightness-140")
        }
    })
})

const buttons = [buttonDailyElement, buttonWeeklyElement, buttonMonthlyElement]

const setActiveButton = (activeButton) => {
  buttons.forEach(button => {
    button.classList.remove("text-white")
    button.classList.add("text-[hsl(235,45%,61%)]")
  })
  activeButton.classList.add("text-white")
  activeButton.classList.remove("text-[hsl(235,45%,61%)]")
}




const updateCards = (data, period) => {
    data.forEach(value => {
        const card = document.querySelector(`[data-js-activity="${value.title}"]`)
        if (!card) {
            return
        }

        const currentEl = card.querySelector(".current")
        const previousEl = card.querySelector(".previous")

        if (currentEl) {
            currentEl.textContent = `${value.timeframes[period].current}hrs`
        }

        if (previousEl) {
            previousEl.textContent = `${value.timeframes[period].previous}hrs`
        }
    })
}



let activityData = []



fetch("/data.json").then((response) => {
    if (!response.ok) {
        const messageError = "Something went wrong!"
        throw new Error(messageError)
    }

    return response.json()
}).then((data) => {
    activityData = data
    updateCards(activityData, "weekly")
}).catch((error) => {
    alert(error.message)
})


buttonDailyElement.addEventListener("click", () => {
    updateCards(activityData, "daily")
    setActiveButton(buttonDailyElement)
})


buttonWeeklyElement.addEventListener("click", () => {
    updateCards(activityData, "weekly")
    setActiveButton(buttonWeeklyElement)
})

buttonMonthlyElement.addEventListener("click", () => {
    updateCards(activityData, "monthly")
    setActiveButton(buttonMonthlyElement)
})