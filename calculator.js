let num1 = ""
let num2 = ""
let operator = ""
let res = document.getElementById("display")
let buttons = document.querySelectorAll("button")

function addNumber(value){
    if(operator === ""){
        num1 = num1 === ""? value : num1 + value
        if (num1.length > 10){
            res.innerHTML = parseFloat(num1).toPrecision(10) // Number Max Digits
        } else {
            res.innerHTML = num1
        }
        
    } else {
        num2 = num2 === ""? value : num2 + value
        if (num2.length > 10){
            res.innerHTML = parseFloat(num2).toPrecision(10) // Number Max Digits
        } else {
            res.innerHTML = num2
        }
    }
}

function addOperator(value){
    if(num1 != "" && num2 === ""){ //Add operator
        operator = value

    } else if (num1!= "" && num2 === "0" && operator === "/"){ // Divided by zero => Error
        res.innerHTML = "Error"
        clearAll()

    } else if (num1 != "" &&  num2 != "" && operator != ""){ // Num1 E num2 !=0 => calc
        calculate()
        operator = value
    }
}

function operate(num1, operator, num2){ //Operations
    if(operator === "+"){
        return parseFloat(num1) + parseFloat(num2)
    } else if (operator === "-"){
        return parseFloat(num1) - parseFloat(num2)
    } else if (operator === "*"){
        return parseFloat(num1) * parseFloat(num2)
    } else if (operator === "/"){
        return parseFloat(num1) / parseFloat(num2)
    }
}

function calculate(){
    let result
    if(num1 !== "" && num2 !== "" && operator !== ""){
        result = operate(parseFloat(num1), operator, parseFloat(num2))

        if(result.toString().length > 10){ // result max 10 digits
            res.innerHTML = parseFloat(result.toString().slice(0,10))
        } else {
            res.innerHTML = parseFloat(result.toFixed(3))
        }
        num1 = result.toString() //toString() can be used for other operations (like subsequently includes())
        num2 = ""
    }
}

function addNegative(){
    if(num2 !== ""){
        num2 = (-1) * parseFloat(num2)
        res.innerHTML = num2

    } else if (num1 !== ""){
        num1 = (-1) * parseFloat(num1)
        res.innerHTML = num1
    }
}

function addPercentage(){
    if(num2 !== ""){
        num2 = parseFloat(num2) * (0.01) 
        res.innerHTML = num2
        
    } else if (num1 !== "") { 
        num1 = parseFloat(num1) * (0.01) 
        res.innerHTML = num1
    }
}

function addDecimal(value){
    if (num1 !== "" && !num1.includes(".")){
        num1 += value
        res.innerHTML = num1 

    } else if (num2 !== "" && !num2.includes(".")){
        num2 += value
        res.innerHTML = num2

    } else if(num1 !=="" && num1.includes(".")){ 
        num1
 
    } else if (num1 === ""){
        num1 += "0." 
        res.innerHTML = num1
    
    } else if (num2 === "") {
        num2 = "0." 
        res.innerHTML = num2    
    } 
}

function clearAll(){
    num1 = ""
    num2 = ""
    operator = ""
    res.innerHTML = " "
}

function cleanOneDigit(){
    if(num2 !==""){
        num2 = res.innerHTML.slice(0,-1)
        res.innerHTML = num2

    } else if (num1 !== ""){
        num1 = res.innerHTML.slice(0,-1)
        res.innerHTML = num1
    }
}

buttons.forEach(function(button){
    button.addEventListener('click', function(){
        let value = button.innerHTML
        if(!isNaN(value)){
            addNumber(value)
        } else if (value === "+" || value === "-" || value === "*" || value=== "/"){
            addOperator(value)
        } else if(value === "="){
            calculate()
        } else if (value === "+/-") {
            addNegative()
        } else if (value === "%") {
            addPercentage()
        } else if (value === ".") {
            addDecimal(value)
        } else if (value === "AC") {
            clearAll()
        } else if (value === "C"){
            cleanOneDigit()
        }       
    })
})

document.addEventListener('keydown', function(event){
    let key = event.key
    if(!isNaN(key)){
        addNumber(key)
    } else if (key ==="+" || key === "-" || key === "*" || key=== "/"){
        addOperator(key)
    } else if(key === "Enter"){
        calculate()
    } else if (key === "-") {
        addNegative()
    } else if (key === "%") {
        addPercentage()
    } else if (key === ".") {
        addDecimal(key)
    } else if (key === "Backspace") {
        clearAll()
    } else if (key === "Escape"){
        cleanOneDigit()
    }  
})