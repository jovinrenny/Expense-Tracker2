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

const modal = document.getElementById("clear-modal")
const confirmClearBtn = document.getElementById("confirm-clear")
const cancelClearBtn = document.getElementById("cancel-clear")

loadFromLocalStorage()


document.getElementById("income-form").addEventListener("submit", (e)=> {
    e.preventDefault()
    const income = parseFloat(document.getElementById("income-amount").value)
    if(income > 0) {
        totalIncome = income
        updateSummary()
        saveToLocalStorage()
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
        renderTransactions()
        saveToLocalStorage()
        e.target.reset()
    }
})

function updateSummary() {
    balance = totalIncome - totalExpense
    document.querySelector(".summary-item.income").textContent = `💰 Income: ₹${totalIncome}`
    document.querySelector(".summary-item.expense").textContent = `💸 Expense: ₹${totalExpense}`
    document.querySelector(".summary-item.balance").textContent = `📊 Balance: ₹${balance}`
}

function renderTransactions() {
    const list = document.getElementById("expenses-list")
    list.innerHTML = ""

    transactions.forEach((tx, index) => {
        const item = document.createElement("div")
        item.className = "expense-item"
        item.innerHTML = `
        <strong>${tx.category}</strong>: ₹${tx.expenseAmount}<br>
        <small>${tx.description} - ${tx.date}</small>
        <button onclick="showDetails(${index})">Details</button>`

        list.appendChild(item)
    })
}

function showDetails(index) {
    const tx = transactions[index]
    alert(
        `Category: ${tx.category}\nAmount: ₹${tx.expenseAmount}\nDescription: ${tx.description}\nDate: ${tx.date}`
    )
}

// saved to local storage to fetch later use

function saveToLocalStorage() {
    localStorage.setItem("totalIncome", totalIncome)
    localStorage.setItem("transactions", JSON.stringify(transactions))
    localStorage.setItem("categoryTotals", JSON.stringify(categoryTotals))
    toggleClearBtn()
}

// fetching saved data from the local storage

function loadFromLocalStorage() {
    const savedIncome = localStorage.getItem("totalIncome")
    const savedTransactions = localStorage.getItem("transactions")
    const savedCategoryTotal = localStorage.getItem("categoryTotals")

    if(savedIncome) totalIncome = parseFloat(savedIncome)
    if(savedTransactions) transactions.push(...JSON.parse(savedTransactions))
    if(savedCategoryTotal) Object.assign(categoryTotals, JSON.parse(savedCategoryTotal))

    totalExpense = transactions.reduce((acc, tx) => acc + tx.expenseAmount, 0)

    updateSummary()
    renderTransactions()
    toggleClearBtn()

    if (totalIncome > 0) {
    document.getElementById("income-section").style.display = "none";
    document.getElementById("expense-section").style.display = "block";
    } else {
    document.getElementById("income-section").style.display = "block";
    document.getElementById("expense-section").style.display = "none";
    }
}

// to show the clear button 

function toggleClearBtn() {
    const clearBtn = document.getElementById("clear-btn")

    if(localStorage.length > 0) {
        clearBtn.style.display = "inline-block"
    } else {
        clearBtn.style.display = "none"
    }
}


document.getElementById("clear-btn").addEventListener("click", () => {
    modal.style.display = "flex"
})

confirmClearBtn.addEventListener("click", ()=> {
    localStorage.clear()
    toggleClearBtn()
    location.reload()
})

cancelClearBtn.addEventListener("click", ()=> {
    modal.style.display = "none"
})
