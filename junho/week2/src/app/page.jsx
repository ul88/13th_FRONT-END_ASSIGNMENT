"use client"

import { useState } from "react"
import styles from "./page.module.css"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [firstNumber, setFirstNumber] = useState("0")
  const [selectedOperator, setSelectedOperator] = useState(null)

  function handleNumberButtonClick(number) {
    const displayLength = display.toString().length
    if (displayLength >= 9) {
      return
    }
    if (display === "0") {
      setDisplay(number)
      return
    }
    setDisplay(display + number.toString())
  }

  function handleOperatorButtonClick(operator) {
    if (operator === "AC") {
      setDisplay("0")
      setFirstNumber("0")
      setSelectedOperator(null)
      return
    }

    if (operator === "+/-") {
      setDisplay((parseFloat(display) * -1).toString())
      return
    }

    switch (operator) {
      case "+":
      case "-":
      case "X":
      case "/":
      case "%":
        setFirstNumber(display)
        setDisplay("0")
        setSelectedOperator(operator)
        break
      case "=":
        if (!selectedOperator) {
          return
        }
        if (firstNumber === "0") {
          return
        }
        const operand1 = parseFloat(firstNumber)
        const operand2 = parseFloat(display)
        const result = calc(selectedOperator, operand1, operand2).toString()
        if (result.length > 9) {
          setDisplay(parseFloat(result.slice(0, 9)))
        } else {
          setDisplay(result)
        }
        setFirstNumber(`${firstNumber}${selectedOperator}${display}`)
        break
    }
  }

  function calc(operator, operand1, operand2) {
    switch (operator) {
      case "+":
        return operand1 + operand2
      case "-":
        return operand1 - operand2
      case "X":
        return operand1 * operand2
      case "/":
        return operand1 / operand2
      case "%":
        return operand1 % operand2
    }
  }

  function handleDotButtonClick() {
    if (display.toString().indexOf(".") === -1) {
      setDisplay(`${display}.`)
    }
  }

  return (
    <div className={styles.calculator}>
      <div className={styles["first-number"]}>
        {firstNumber !== "0" && firstNumber}
      </div>
      <div className={styles.display}>{display}</div>
      <div className={styles["button-area"]}>
        <div className={styles["button-row"]}>
          <OperatorButton operator={"AC"} onClick={handleOperatorButtonClick} />
          <OperatorButton
            operator={"+/-"}
            onClick={handleOperatorButtonClick}
          />
          <OperatorButton operator={"%"} onClick={handleOperatorButtonClick} />
          <OperatorButton operator={"/"} onClick={handleOperatorButtonClick} />
        </div>
        <div className={styles["button-row"]}>
          <NumberButton number={7} onClick={handleNumberButtonClick} />
          <NumberButton number={8} onClick={handleNumberButtonClick} />
          <NumberButton number={9} onClick={handleNumberButtonClick} />
          <OperatorButton operator={"X"} onClick={handleOperatorButtonClick} />
        </div>
        <div className={styles["button-row"]}>
          <NumberButton number={4} onClick={handleNumberButtonClick} />
          <NumberButton number={5} onClick={handleNumberButtonClick} />
          <NumberButton number={6} onClick={handleNumberButtonClick} />
          <OperatorButton operator={"-"} onClick={handleOperatorButtonClick} />
        </div>
        <div className={styles["button-row"]}>
          <NumberButton number={1} onClick={handleNumberButtonClick} />
          <NumberButton number={2} onClick={handleNumberButtonClick} />
          <NumberButton number={3} onClick={handleNumberButtonClick} />
          <OperatorButton operator={"+"} onClick={handleOperatorButtonClick} />
        </div>
        <div className={styles["button-row"]}>
          <div className={styles.button}></div>
          <NumberButton number={0} onClick={handleNumberButtonClick} />
          <div className={styles.button} onClick={handleDotButtonClick}>
            .
          </div>
          <OperatorButton operator={"="} onClick={handleOperatorButtonClick} />
        </div>
      </div>
    </div>
  )
}

function NumberButton({ number, onClick }) {
  function handleClick() {
    onClick(number)
  }
  return (
    <div className={styles.button} onClick={handleClick}>
      {number}
    </div>
  )
}

function OperatorButton({ operator, onClick }) {
  function handleClick() {
    onClick(operator)
  }
  return (
    <div
      className={`${styles.button} ${styles["orange-button"]}`}
      onClick={handleClick}
    >
      {operator}
    </div>
  )
}
