import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

const OrderForm = () => {
    const schema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .min(2, 'name must be at least 2 characters')
    })
    
    const initialFormValues = {
        name: '',
        size: '',
        topping1: false,
        topping2: false,
        special: ''
    }

    const initialFormErrors = {
        name: ''
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);

    const history = useHistory();

    const routeToConfirm = () => {
        history.push('/confirmation');
    }

    const inputChange = (event) => {
        const { name, value } = event.target;
        yup.reach(schema, name).validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: '' }))
            .catch(error => setFormErrors({ ...formErrors, [name]: error.errors[0]}))
        setFormValues({ ...formValues, [name]: value });
    }

    return (
        <div>
            <form id='pizza-form'>
                <div className='errors'>
                    <div>
                        {formErrors.name}
                    </div> 
                </div>
                <label>Name:
                    <input
                        value={formValues.name}
                        onChange={inputChange}
                        name='name'
                        type='text'
                        id='name-input'
                    />
                </label>

                <button
                    onClick={routeToConfirm}
                    id='order-button'
                >
                    Add to Order
                </button>
            </form>
        </div>
    )
}

export default OrderForm;