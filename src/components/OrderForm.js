import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from "axios";

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
        skittles: false,
        pepperoni: false,
        cheetos: false,
        mayonnaise: false,
        special: ''
    }

    const initialFormErrors = {
        name: ''
    }

    const initialOrders = [];

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [orders, setOrders] = useState(initialOrders)

    const history = useHistory();

    const routeToConfirm = () => {
        history.push('/pizza/confirmation');
    }

    const postNewOrder = newOrder => {
        axios.post('https://reqres.in/api/orders', newOrder)
            .then(response => {
                console.log(response);
                setOrders([response.data, ...orders]);
                routeToConfirm();
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setFormValues(initialFormValues);
            })
    }

    const inputChange = (event) => {
        const { name, value, checked, type } = event.target;
        const realValue = type === 'checkbox' ? checked : value;
        if (name === 'name') {
            yup.reach(schema, name).validate(value)
                .then(() => setFormErrors({ ...formErrors, [name]: '' }))
                .catch(error => setFormErrors({ ...formErrors, [name]: error.errors[0]}))
        }
        setFormValues({ ...formValues, [name]: realValue });
    }

    const submitForm = event => {
        event.preventDefault();
        const newOrder = {
            name: formValues.name.trim(),
            size: formValues.size,
            toppings: ['skittles', 'pepperoni', 'cheetos', 'mayonnaise'].filter(topping => formValues[topping]),
            special: formValues.special.trim()
        }
        postNewOrder(newOrder);
    }

    return (
        <div>
            <form id='pizza-form' onSubmit={submitForm}>
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
                <label>Size:
                    <select
                        onChange={inputChange}
                        value={formValues.size}
                        name='size'
                        id='size-dropdown'
                    >
                        <option value=''>--Pick a Size--</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                        <option value='extra large'>M E G A T H I C C</option>
                    </select>
                </label>
                <label>Skittles
                    <input
                        type='checkbox'
                        name='skittles'
                        onChange={inputChange}
                        checked={formValues.skittles}
                    />
                </label>
                <label>Pepperoni
                    <input
                        type='checkbox'
                        name='pepperoni'
                        onChange={inputChange}
                        checked={formValues.pepperoni}
                    />
                </label>
                <label>Cheetos
                    <input
                        type='checkbox'
                        name='cheetos'
                        onChange={inputChange}
                        checked={formValues.cheetos}
                    />
                </label>
                <label>Mayonnaise
                    <input
                        type='checkbox'
                        name='mayonnaise'
                        onChange={inputChange}
                        checked={formValues.mayonnaise}
                    />
                </label>
                <label>Special Instructions:
                    <input
                        value={formValues.special}
                        onChange={inputChange}
                        name='special'
                        type='text'
                        id='special-text'
                    />
                </label>
                <button
                    // onClick={routeToConfirm}
                    id='order-button'
                >
                    Add to Order
                </button>
            </form>
        </div>
    )
}

export default OrderForm;