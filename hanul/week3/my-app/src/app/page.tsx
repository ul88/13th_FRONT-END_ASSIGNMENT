"use client"
import { useState } from 'react'
import styles from "./page.module.css"
import { useRouter } from 'next/navigation'
import sendPost from "./sendPost"

export default function Home() {
  const [res, setRes] = useState("0")
  const [firstNum, setFirstNum] = useState("0")
  const [resNum1, setResNum1] = useState("0")
  const [resNum2, setResNum2] = useState("0")
  const [resOp, setResOp] = useState("0")
  const [op, setOp] = useState("")

  const {push} = useRouter()
  function goToHistoryPage(){
    push("history")
  }

  function addNumber(event: React.MouseEvent<HTMLDivElement>){
    const n = event.currentTarget.textContent
    if(n == null) return

    if(n === "." && res.indexOf(".") !== -1) return
    if(op === "="){
      setRes(n)
      setOp("")
      return
    }
    
    if(res === "0" && n !== "."){
      setRes(n)
      return
    }

    setRes(res+n)
  }

  function buttonFuncion(event: React.MouseEvent<HTMLDivElement>){
    const n = event.currentTarget.textContent
    
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
        return
      case "⌫":
        if(res !== ""){
          setRes(res.substring(0, res.length - 1))
        }
        return
    }
  }

  function calc(n : string){
    if(firstNum !== "0"){
      let temp = 0
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
      return temp.toString()
    }
  }

  function calcButton(event: React.MouseEvent<HTMLDivElement>){
    const n = event.currentTarget.textContent
    if(n == null) return

    if(op === "="){
      setOp(n)
      return
    }

    if(op === "") {
      setFirstNum(res)
      setRes("0")
      setOp(n)
      return
    }

    calc(res)
    setOp(n)
    setRes("0")
  }

  function resultButton(){ 
    if(firstNum !== "0" && res === "0") return;
    setResNum1(firstNum)
    setResOp(op)
    setResNum2(res)
    let resString = firstNum + op + res + "="
    resString += calc(res)
    setRes("0")
    setOp("=")

    sendPost("hanul", resString)
  }
  
  return (
        <div className={styles.content}>
            <div className={styles["sub-result-box"]} onClick={()=>goToHistoryPage()}>📝</div>
            <div className={styles["sub-result-box"]}>{op === "" ? "0" : (op === "=" ? resNum1 + " " + resOp + " " + resNum2 + " =" : firstNum + " " + op)}</div>
            <div className={styles["result-box"]}>{res === "0" ? firstNum : (res === "" ? 0 : res)}</div>
            <div className={styles["calc-btn"]} onClick={(event) => calcButton(event)}>%</div>
            <div className={styles["calc-btn"]} onClick={(event) => buttonFuncion(event)}>CE</div>
            <div className={styles["calc-btn"]} onClick={(event) => buttonFuncion(event)}>C</div>
            <div className={styles["calc-btn"]} onClick={(event) => buttonFuncion(event)}>⌫</div>
            <div className={styles["number-btn"]} onClick={(event) => addNumber(event)}>7</div>
            <div className={styles["number-btn"]}  onClick={(event) => addNumber(event)}>8</div>
            <div className={styles["number-btn"]}  onClick={(event) => addNumber(event)}>9</div>
            <div className={styles["calc-btn"]} onClick={(event) => calcButton(event)}>x</div>
            <div className={styles["number-btn"]} onClick={(event) => addNumber(event)}>4</div>
            <div className={styles["number-btn"]} onClick={(event) => addNumber(event)}>5</div>
            <div className={styles["number-btn"]} onClick={(event) => addNumber(event)}>6</div>
            <div className={styles["calc-btn"]} onClick={(event) => calcButton(event)}>-</div>
            <div className={styles["number-btn"]} onClick={(event) => addNumber(event)}>1</div>
            <div className={styles["number-btn"]} onClick={(event) => addNumber(event)}>2</div>
            <div className={styles["number-btn"]} onClick={(event) => addNumber(event)}>3</div>
            <div className={styles["calc-btn"]} onClick={(event) => calcButton(event)}>+</div>
            <div className={styles["calc-btn"]} onClick={(event) => calcButton(event)}>÷</div>
            <div className={styles["number-btn"]} onClick={(event) => addNumber(event)}>0</div>
            <div className={styles["calc-btn"]} onClick={(event) => addNumber(event)}>.</div>
            <div className={styles["result-btn"]} onClick={() => resultButton()}>=</div>
        </div>
  );
}
