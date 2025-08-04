let totalIncome = 0
let totalExpense = 0
let balance = 0

let categoryTotals = {
    Fuel : 0,
    Food : 0,
    Cinema : 0,
    Outing : 0,
    Other : 0
}

const transactions = []


document.getElementById("income-form").addEventListener("submit", (e)=> {
    e.preventDefault()
    const income = parseFloat(document.getElementById("income-amount").value)
    if(income > 0) {
        totalIncome = income
        updateSummary()
        document.getElementById("income-section").style.display = "none"
        document.getElementById("expense-section").style.display = "block"
    }
})

document.getElementById("expense-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value)
    const category = document.getElementById("category").value
    const description = document.getElementById("expense-description").value || "No description"
    const date = document.getElementById("expense-date").value

    if(expenseAmount > 0 && category && date) {
        transactions.push({expenseAmount, category, description, date})
        categoryTotals[category] += expenseAmount
        totalExpense += expenseAmount
        updateSummary()
        e.target.reset()
    }
})

function updateSummary() {
    const balance = totalIncome - totalExpense
    document.querySelector(".summary-item.income").textContent = `💰 Income: ₹${totalIncome}`
    document.querySelector(".summary-item.expense").textContent = `💸 Expense: ₹${totalExpense}`
    document.querySelector(".summary-item.balance").textContent = `📊 Balance: ₹${balance}`
}