"use client"

import { useState } from "react";
import styles from "./page.module.css"

export default function Calculator() {
    const [display, setDisplay] = useState('0')
    const [firstNumber, setFirstNumber] = useState('0')
    const [selectedOperator, setSelectedOperator] = useState(null)
    const [isNewInput, setIsNewInput] = useState(false);

    function handleNumberButtonClick(number) {
        if (isNewInput) {
            setDisplay(number.toString());
            setIsNewInput(false);
        } else {
            if (display.length >= 9) return;
            if (display === "0") {
                setDisplay(number)
                return
            }
            setDisplay(display + number.toString())
        }
    }

    function handleOperatorButtonClick(operator) {
        if (operator === "AC") {
            setDisplay("0");
            setFirstNumber("0");
            setSelectedOperator(null);
            setIsNewInput(false);
            return;
        }

        if (operator === "DE") {
            if (display.length === 1) {
                setDisplay("0");
            } else {
                setDisplay(display.slice(0, -1));
            }
            return;
        }

        if (operator === "%") {
            if (selectedOperator && firstNumber !== "0") {
                const operand1 = parseFloat(firstNumber);
                const operand2 = parseFloat(display);
                const result = operand1 * (operand2 / 100); 
                setDisplay(result.toString());
                setFirstNumber(result.toString());
                setSelectedOperator(null);
                setIsNewInput(true);
            }
            return;
        }

        if (["+", "-", "*", "/", "%"].includes(operator)) {
            setFirstNumber(display);
            setSelectedOperator(operator);
            setIsNewInput(true);
            return;
        }

        if (operator === "=") {
            if (!selectedOperator || firstNumber === "0") return;

            const operand1 = parseFloat(firstNumber);
            const operand2 = parseFloat(display);
            const result = calc(selectedOperator, operand1, operand2).toString();

            setDisplay(result.length > 9 ? parseFloat(result.slice(0, 9)) : result);
            setFirstNumber(result);
            setSelectedOperator(null);
            setIsNewInput(true);
        }
    }

    function calc(operator, operand1, operand2) {
        switch (operator) {
            case "+": return operand1 + operand2
            case "-": return operand1 - operand2
            case "*": return operand1 * operand2
            case "/": return operand1 / operand2
        }
    }

    function handleDotButtonClick() {
        if (display.toString().indexOf(".") === -1) {
            setDisplay(`${display}.`)
        }
    }

    const { push } = useRouter()
    function goToHistoryPage() {
        push("/history")
    }

    return (
        <div className={styles.calculator}>
            <div className={styles["first-number"]}>
                {firstNumber !== "0" && selectedOperator && `${firstNumber} ${selectedOperator} ${isNewInput ? "" : display}`}
            </div>

            <div className={styles.display}>{display}</div>
            <div className={styles["button-area"]}>
                <div className={styles["button-row"]}>
                    <OperatorButton operator={"AC"} onClick={handleOperatorButtonClick} />
                    <OperatorButton operator={"DE"} onClick={handleOperatorButtonClick} />
                    <OperatorButton operator={"%"} onClick={handleOperatorButtonClick} />
                    <OperatorButton operator={"/"} onClick={handleOperatorButtonClick} />
                </div>
                <div className={styles["button-row"]}>
                    <NumberButton number={7} onClick={handleNumberButtonClick} />
                    <NumberButton number={8} onClick={handleNumberButtonClick} />
                    <NumberButton number={9} onClick={handleNumberButtonClick} />
                    <OperatorButton operator={"*"} onClick={handleOperatorButtonClick} />
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
                    <div className={styles.button} onClick={handleDotButtonClick}>.</div>
                    <NumberButton number={0} onClick={handleNumberButtonClick} />
                    <OperatorButton operator={"="} onClick={handleOperatorButtonClick} />
                </div>
            </div>
        </div>
    );
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
    return (
        <div
            className={operator === "=" ? styles["button-equal"] : styles.button}
            onClick={() => onClick(operator)}
        >
            {operator}
        </div>
    );
}
