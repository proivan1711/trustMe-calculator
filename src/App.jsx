import { useEffect, useState } from "react";
import { evaluate } from "mathjs";

const jokerResponses = [
  "Ha, ha, ha... WRONG!",
  "Math isn't going to save you",
  "Math doesn't love you!",
];

export default function App() {
  useEffect(() => {
    function handleKeyUp(e) {
      let el = document.getElementById(e.key.toLowerCase());
      if (e.key.toLowerCase() === "enter") return; // Some weird bug, will fix in future
      if (!el) return;
      el.focus();
      el.click();
    }
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, []);
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Calculator />
    </div>
  );
}

function Calculator() {
  const [calcOperations, setCalcOperations] = useState("");
  return (
    <>
      <JokerBtn />
      <div className="flex-col bg-black/20 backdrop-blur-xs pb-3 px-0.5">
        <CalcScreen text={calcOperations} />
        <CalcKeys
          calcOperations={calcOperations}
          setCalcOperations={setCalcOperations}
        />
      </div>
    </>
  );
}

function CalcScreen({ text }) {
  return (
    <div
      className="bg-black/40 w-5xl h-[10rem] m-0.5 rounded-md flex items-center justify-center"
      id="screen"
    >
      <p className="text-7xl">{text}</p>
    </div>
  );
}

function CalcKeys({ setCalcOperations, calcOperations }) {
  return (
    <div id="calc-keys" className="flex">
      <div
        id="keys-num"
        className="text-5xl grid grid-cols-7 grid-rows-3 gap-3 w-[57rem] h-[24rem]"
      >
        <KeyBtn id="1" onClick={() => setCalcOperations(calcOperations + "1")}>
          1
        </KeyBtn>
        <KeyBtn id="2" onClick={() => setCalcOperations(calcOperations + "2")}>
          2
        </KeyBtn>
        <KeyBtn onClick={() => setCalcOperations(calcOperations + "3")} id="3">
          3
        </KeyBtn>
        <KeyBtn
          id="-"
          onClick={() => setCalcOperations(calcOperations + "-")}
          className="text-7xl"
        >
          -
        </KeyBtn>
        <KeyBtn
          id="*"
          onClick={() => setCalcOperations(calcOperations + "*")}
          className="text-7xl"
        >
          ×
        </KeyBtn>
        <KeyBtn
          id="+"
          className="text-7xl"
          onClick={() => setCalcOperations(calcOperations + "+")}
        >
          +
        </KeyBtn>
        <KeyBtn id="c" onClick={() => setCalcOperations("")}>
          C
        </KeyBtn>
        <KeyBtn id="4" onClick={() => setCalcOperations(calcOperations + "4")}>
          4
        </KeyBtn>
        <KeyBtn id="5" onClick={() => setCalcOperations(calcOperations + "5")}>
          5
        </KeyBtn>
        <KeyBtn id="6" onClick={() => setCalcOperations(calcOperations + "6")}>
          6
        </KeyBtn>
        <KeyBtn
          id="."
          className="text-7xl"
          onClick={() => setCalcOperations(calcOperations + ".")}
        >
          .
        </KeyBtn>
        <KeyBtn
          id="/"
          className="text-7xl"
          onClick={() => setCalcOperations(calcOperations + "/")}
        >
          ÷
        </KeyBtn>
        <KeyBtn
          id="√"
          className="text-7xl"
          onClick={() => setCalcOperations(calcOperations + "√")}
        >
          √
        </KeyBtn>
        <KeyBtn
          id="backspace"
          className="text-7xl"
          onClick={() => setCalcOperations(() => calcOperations.slice(0, -1))}
        >
          ←
        </KeyBtn>
        <KeyBtn id="7" onClick={() => setCalcOperations(calcOperations + "7")}>
          7
        </KeyBtn>
        <KeyBtn id="8" onClick={() => setCalcOperations(calcOperations + "8")}>
          8
        </KeyBtn>
        <KeyBtn id="9" onClick={() => setCalcOperations(calcOperations + "9")}>
          9
        </KeyBtn>
        <KeyBtn
          className="text-7xl"
          id="0"
          onClick={() => setCalcOperations(calcOperations + "0")}
        >
          0
        </KeyBtn>
        <KeyBtn id="%" onClick={() => setCalcOperations(calcOperations + "%")}>
          %
        </KeyBtn>
        <KeyBtn
          className="text-7xl"
          onClick={() => setCalcOperations(calcOperations + Math.PI)}
        >
          π
        </KeyBtn>
        <KeyBtn
          id="="
          onClick={() => {
            const isChecked = document.getElementById("is-joker-btn").checked;
            try {
              if (isChecked && Math.random() > 0.2)
                return setCalcOperations(
                  evaluate(calcOperations + randomizeCalc())
                );
              const regex = /√(.*?)(?=$|[-/+*])/g;
              const cleanedCalcOperations = calcOperations.replace(
                regex,
                (_, nums) => `sqrt(${nums})`
              );
              setCalcOperations(evaluate(cleanedCalcOperations));
            } catch {
              setCalcOperations(
                isChecked
                  ? jokerResponses[
                      Math.floor(Math.random() * jokerResponses.length)
                    ]
                  : "Error"
              );
              setTimeout(() => {
                setCalcOperations("");
              }, 2000);
            }
          }}
        >
          =
        </KeyBtn>
      </div>
    </div>
  );
}

function JokerBtn() {
  return (
    <div className="absolute top-0 left-0 p-2">
      <label>Joker mode: </label>
      <input type="checkbox" id="is-joker-btn" />
    </div>
  );
}

function KeyBtn({ children = "", className = "", id = "", onClick }) {
  return (
    <button
      onClick={onClick}
      id={id}
      className={`className="transition-transform duration-300 ease-in-out hover:scale-105 bg-black/40 size-32 rounded-sm active:bg-black/70 ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
}

function randomizeCalc() {
  const random = Math.random();
  return `${random > 0.5 ? "-" : "+"} ${Math.floor(random * 5)}`;
}
