import useForm from "./useForm";

const Form = () => {
    const {
        amountInput,
        setAmountInput,
        sourceInput,
        setSourceInput,
        targetInput,
        setTargetInput,
        converted,
        rate,
        handleSubmit,
        resetForm } = useForm();

    return (
        <div>
            <div className="result">
                <div>{!converted ? "" : parseInt(converted) < 0 ? "Sorry, can't do that." : `${amountInput} ${sourceInput.toUpperCase()} = ${converted} ${targetInput.toUpperCase()}`}</div>
                <div className="rate">{!converted || parseInt(converted) < 0 ? "" : `conversion rate: ${rate}`}</div>
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
            </form>
            <button onClick={resetForm}>reset</button>
        </div>
    );
};

export default Form;