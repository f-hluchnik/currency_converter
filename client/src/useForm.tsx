import {useState} from "react"

const useForm = () => {
    const [amountInput, setAmount] = useState("")
    const [sourceInput, setSource] = useState("")
    const [targetInput, setTarget] = useState("")
    const [converted, setConverted] = useState("")
    const [rate, setRate] = useState("")

    const setAmountInput = (event: any) => {setAmount(event.target.value); setConverted("")};
    const setSourceInput = (event: any) => {setSource(event.target.value.toUpperCase()); setConverted("")};
    const setTargetInput = (event: any) => {setTarget(event.target.value.toUpperCase()); setConverted("")};
    const setConvertedInput = (convertedAmount: any) => setConverted(convertedAmount.toString());
    const setExchangeRateInput = (exchangeRate: any) => setRate(exchangeRate.toString());

    var convertedAmount: number = 0;
    var fromCurrency: string = "";
    var toCurrency: string = "";
    var amount: number = 0;
    var exchangeRate: number = 0;
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        fromCurrency = sourceInput;
        toCurrency = targetInput;
        amount = parseInt(amountInput);
        const res = await convert(fromCurrency, toCurrency, amount);
        convertedAmount = res.convertedAmount;
        exchangeRate = res.conversionRate;
        setConvertedInput(convertedAmount);
        setExchangeRateInput(exchangeRate);
    }

    const resetForm = () => {
        setAmount("")
        setConverted("")
        setSource("")
        setTarget("")
    }

    return {
        amountInput,
        setAmountInput,
        sourceInput,
        setSourceInput,
        targetInput,
        setTargetInput,
        converted,
        setConvertedInput,
        rate,
        setExchangeRateInput,
        handleSubmit,
        resetForm
    }
};

// convert ... Function converts between currencies.
async function convert(fromCurrency: string, toCurrency: string, amount: number): Promise<{convertedAmount: number, conversionRate: number}> {
    var data: any
    try {
      const response = await fetch('http://localhost:7654/exchange/' + fromCurrency + "-" + toCurrency)
      if (response.status == 204) {
        return {convertedAmount: -1, conversionRate: -1};
      }
      data = await response.json()
    } catch (err) {
      console.log(err)
    }
    return {convertedAmount: Math.round((amount*data.exchangeRate + Number.EPSILON) * 100) / 100, conversionRate: data.exchangeRate}
  }

export default useForm;