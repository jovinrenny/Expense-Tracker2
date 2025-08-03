const incomeForm = document.getElementById("income-form")
const incomeSection = document.getElementById("income-section")
const expenseSection = document.getElementById("expense-section")

let totalIncome = 0

incomeForm.addEventListener("submit", (e)=> {
    e.preventDefault()
    const incomeInput = document.getElementById("income-amount")
    totalIncome = parseFloat(incomeInput.value)

    if(totalIncome > 0) {
        incomeSection.style.display = "none"
        expenseSection.style.display = "block"
    }
})