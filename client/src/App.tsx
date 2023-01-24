import React from 'react';
// import logo from './logo.svg';
import logo from './coin.svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './App.css';

function App() {
  // const fromCurrency = "usd";
  // const toCurrency = "czk";
  // const amount = 5;
  // const convertedAmount = useConvert(fromCurrency, toCurrency, amount)

  const [amountInput, setAmount] = useState("")
  const [sourceInput, setSource] = useState("")
  const [targetInput, setTarget] = useState("")
  const [converted, setConverted] = useState("")

  var convertedAmount: number = 0
  var fromCurrency: string = "def"
  var toCurrency: string = "def"
  var amount: number = 0
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    fromCurrency = sourceInput
    toCurrency = targetInput
    amount = parseInt(amountInput)
    convertedAmount = await convert(fromCurrency, toCurrency, amount)
    // console.log(inputs)
    setConverted(convertedAmount.toString())
    // alert(convertedAmount);
  }

  const resetForm = () => {
    setAmount("")
    setConverted("")
    setSource("")
    setTarget("")
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <label>I want to convert:
          <input 
            type="number" 
            name="amountInput"
            value={amountInput} 
            onChange={(event) => setAmount(event.target.value)}
          />
          </label>
          <label>of currency:
            <input 
              type="text" 
              name="sourceInput"
              value={sourceInput}
              onChange={(event) => setSource(event.target.value.toUpperCase())}
            />
          </label>
          <label>to currency:
            <input 
              type="text" 
              name="targetInput"
              value={targetInput}
              onChange={(event) => setTarget(event.target.value.toUpperCase())}
            />
          </label>
          <button type="submit">convert</button>
        </form>
        <button onClick={resetForm}>reset</button>
        <p>{!converted ? "" : amountInput + " " + sourceInput.toUpperCase() + " = " + converted + " " + targetInput.toUpperCase()}</p>
      </div>
    </div>
  );
}

// convert ... Function converts between currencies.
async function convert(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
  // const [myData, setData] = React.useState<any>([]);

  var data: any
  try {
    const response = await fetch('http://localhost:7654/exchange/' + fromCurrency + "-" + toCurrency)
    console.log(response)
    data = await response.json()
    console.log(data)
  } catch (err) {
    console.log(err)
  }

  // React.useEffect(() => {
    // getMyData();
  // }, []);
  return amount*data.exchangeRate
}

export default App;
