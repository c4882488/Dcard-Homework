import React,{ useState, useEffect } from 'react'

function useInput(initaValue, initaType, isRequired = false) {
    const [value, setValue] = useState(initaValue);

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState(null);

    const handleChange = (e) => {
        let inputValue = e.target.value;
        setValue(inputValue);
        if (isRequired && initaType === "bodyText") {
            if (inputValue.length < 30) {
                setError(true);
            } else {
                setError(false);
            }
        }

        if (isRequired && initaType === "title") {
            if (
                inputValue === "" ||
                inputValue === null ||
                inputValue === undefined
            ) {
                setError(true);
            } else {
                setError(false);
            }
        }
    }

    useEffect(() => {
        if(isRequired && initaType === "bodyText"){
            if (value.length < 30) {
                setErrorText(
                    "Please enter a description that is less than 30 characters"
                );
            } else {
                setErrorText(null);
            }
        }

        if (isRequired && initaType === "title") {
            if (value === "" || value === null || value === undefined) {
                setErrorText("This field is required");
            } else {
                setErrorText(null);
            }
        }
    }, [value]);

    return {
        value,
        error,
        errorText,
        handleChange,
    };
}

export default useInput;
