"use client"
import { useState } from 'react'
import "./page.css"

export default function Home() {
  const [res, setRes] = useState("0")
  const [firstNum, setFirstNum] = useState("0")
  const [resNum1, setResNum1] = useState("0")
  const [resNum2, setResNum2] = useState("0")
  const [resOp, setResOp] = useState("0")
  const [op, setOp] = useState("")

  function addNumber(num: string){
    if(num === "." && res.indexOf(".") !== -1) return
    if(op === "="){
      setRes(num)
      setOp("")
    }
    else if(res === "0" && num !== "."){
      setRes(num)
    }
    else setRes(res+num)
  }

  function buttonFuncion(n : string){
    switch(n){
      case "CE":
        if(op !== "="){
          setRes("")
          break
        }
      case "C":
        setRes("0")
        setFirstNum("0")
        setOp("")
        break
      case "d":
        if(res !== ""){
          setRes(res.substring(0, res.length - 1))
        }
        break
    }
  }

  function calc(n : string){
    if(firstNum !== "0"){
      var temp = 0
      switch(op){
        case "+":
          temp = Number.parseFloat(firstNum) + Number.parseFloat(n)
          break
        case "-":
          temp = Number.parseFloat(firstNum) - Number.parseFloat(n)
          break
        case "x":
          temp = Number.parseFloat(firstNum) * Number.parseFloat(n)
          break
        case "÷":
          temp = Number.parseFloat(firstNum) / Number.parseFloat(n)
          break
        case "%":
          temp = Number.parseFloat(firstNum) % Number.parseFloat(n)
          break
      }
      setFirstNum(temp.toString())
      setOp("")
    }
  }

  function calcButton(n : string){
    if(op === "="){
      setOp(n)
    }
    else if(op === "") {
      setFirstNum(res)
      setRes("0")
      setOp(n)
    }
    else{
      calc(res)
      setOp(n)
      setRes("0")
    }
  }

  function resultButton(){ 
    if(firstNum !== "0" && res === "0") return;
    setResNum1(firstNum)
    setResOp(op)
    setResNum2(res)
    calc(res)
    setRes("0")
    setOp("=")
  }
  
  return (
    <html lang='en'>
    <head>
        <title>계산기</title>
    </head>
    <body>
        <div className="content">
            <div className="sub-result-box">{op === "" ? "0" : (op === "=" ? resNum1 + " " + resOp + " " + resNum2 + " =" : firstNum + " " + op)}</div>
            <div className="result-box">{res === "0" ? firstNum : (res === "" ? 0 : res)}</div>
            <div className="calc-btn" onClick={() => calcButton("%")}>%</div>
            <div className="calc-btn" onClick={() => buttonFuncion("CE")}>CE</div>
            <div className="calc-btn" onClick={() => buttonFuncion("C")}>C</div>
            <div className="calc-btn" onClick={() => buttonFuncion("d")}>⌫</div>
            <div className="number-btn" onClick={() => addNumber("7")}>7</div>
            <div className="number-btn" onClick={() => addNumber("8")}>8</div>
            <div className="number-btn" onClick={() => addNumber("9")}>9</div>
            <div className="calc-btn" onClick={() => calcButton("x")}>x</div>
            <div className="number-btn" onClick={() => addNumber("4")}>4</div>
            <div className="number-btn" onClick={() => addNumber("5")}>5</div>
            <div className="number-btn" onClick={() => addNumber("6")}>6</div>
            <div className="calc-btn" onClick={() => calcButton("-")}>-</div>
            <div className="number-btn" onClick={() => addNumber("1")}>1</div>
            <div className="number-btn" onClick={() => addNumber("2")}>2</div>
            <div className="number-btn" onClick={() => addNumber("3")}>3</div>
            <div className="calc-btn" onClick={() => calcButton("+")}>+</div>
            <div className="calc-btn" onClick={() => calcButton("÷")}>÷</div>
            <div className="number-btn" onClick={() => addNumber("0")}>0</div>
            <div className="calc-btn" onClick={() => addNumber(".")}>.</div>
            <div className="result-btn" onClick={() => resultButton()}>=</div>
        </div>
        
    </body>
    </html>
  );
}
