'use client'

import { useState } from "react";

export default function Test() {
  
  const name = "Tamerlan"
  const [counter, setCounter] = useState(10);
  console.log('component was rerendered')
  const plusFunc = () => {
    setCounter(counter + 1);
    console.log('plus', counter)
  }
  const minusFunc = () => {
    setCounter(counter - 1);
    console.log('minus', counter)
  }
  return (
    <div>
      <h1>My test component {name}</h1>


      <p>Counter: {counter}</p>

      <button onClick={minusFunc}>Minus</button>
      <button onClick={plusFunc}>Plus</button>
    </div>
  )
}