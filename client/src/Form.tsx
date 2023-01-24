import useForm from "./useForm";

const Form = () => {
    var {
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
        resetForm } = useForm();

    return (
        <div>
            <div className="result">
                <div>{!converted ? "" : parseInt(converted) < 0 ? "Sorry, can't do that." : amountInput + " " + sourceInput.toUpperCase() + " = " + converted + " " + targetInput.toUpperCase()}</div>
                <div className="rate">{!converted || parseInt(converted) < 0 ? "" : "conversion rate: " + rate}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="formInput">
                    <div>
                        <div>FROM</div>
                        <input 
                            type="number" 
                            name="amountInput"
                            value={amountInput} 
                            onChange={setAmountInput}
                        />
                        <input 
                            type="text" 
                            name="sourceInput"
                            value={sourceInput}
                            onChange={setSourceInput}
                        />
                    </div>
                </div>
                <div className="formInput">
                    <div>TO
                        <div>
                            <input 
                                type="text" 
                                name="targetInput"
                                value={targetInput}
                                onChange={setTargetInput}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit">convert</button>
                <button onClick={resetForm}>reset</button>
            </form>
        </div>
    );
};

export default Form;