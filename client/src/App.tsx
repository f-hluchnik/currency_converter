import React from 'react';
// import logo from './logo.svg';
import logo from './coin.svg';
import './App.css';

function App() {
  const fromCurrency = "usd";
  const toCurrency = "czk";
  const amount = 5;
  const convertedAmount = useConvert(fromCurrency, toCurrency, amount)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!convertedAmount ? "Loading..." : amount + " " + fromCurrency.toUpperCase() + " = " + convertedAmount + " " + toCurrency.toUpperCase()}</p>
      </header>
    </div>
  );
}

// useConvert ... Function converts between currencies.
function useConvert(fromCurrency: string, toCurrency: string, amount: number): number {
  const [myData, setData] = React.useState<any>([]);

  const getMyData = async () => {
    const response = await fetch('http://localhost:7654/exchange/' + fromCurrency + "-" + toCurrency)
    console.log(response)
    const data = await response.json()
    console.log(data)
    setData(data)
  }

  React.useEffect(() => {
    getMyData();
  }, []);
  return amount*myData.exchangeRate
}

export default App;
