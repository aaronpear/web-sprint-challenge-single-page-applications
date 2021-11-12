import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const OrderForm = () => {
    const initialFormValues = {
        name: '',
        size: '',
        topping1: false,
        topping2: false,
        special: ''
    }
    const [formValues, setFormValues] = useState(initialFormValues);

    const history = useHistory();

    const routeToConfirm = () => {
        history.push('/confirmation');
    }

    const inputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    return (
        <div>
            <form id='pizza-form'>
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