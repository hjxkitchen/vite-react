import React, {Fragment, useEffect, useState} from "react";
import OrderList from "./AddOrder";

const AddToOrder = ({orders, setOrders}) => {
    const [inputs, setInputs] = useState({});
    const [array, setArray] = useState([]);

    setOrders(array);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    // submit function
    const onSubmitForm = async(e) => {
        e.preventDefault();
        // array.push(inputs);

        if (inputs.product_name && inputs.quantity && inputs.cost) {

            // if description already exists, update quantity and cost
            let found = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i].product_name === inputs.product_name) {
                    // change quantity with set array
                    setArray(array.map((item, index) => {
                        if (index === i) {
                            return {
                                ...item,
                                quantity: parseInt(item.quantity) + parseInt(inputs.quantity),
                                // cost: parseInt(item.cost) + parseInt(inputs.cost)
                            }
                        }
                        return item;
                    }))
                    found = true;
                    break;
                }
            }

            // if description does not exist, add to array
            if (!found) {
                setArray(array => [...array, inputs]);
            }
        }
        
        setOrders(array);
        console.log(orders);
        
    };

    // form
    return <Fragment>
        <div className="d-flex mt-5 justify-content-center">
        <div className="d-flex w-50 justify-content-center">
            <form className="" onSubmit={onSubmitForm}>
                
                    
                        {/* 1st input */}
                        <label>Product
                        <input 
                            type="text" 
                            name="product_name"
                            className="form-control" 
                            value={inputs.description} 
                            onChange={handleChange} 
                        />
                        </label>
                    
                    
                        {/* 2nd */}
                        <label>Quantity
                        <input 
                            type="number" 
                            name="quantity"
                            min="0"
                            step="1"
                            className="form-control" 
                            value={inputs.inventory} 
                            onChange={handleChange} 
                        />
                        </label>
                    
                    
                        {/* 3rd */}
                        <label>Cost
                        <input 
                            type="number" 
                            name="cost"
                            className="form-control" 
                            value={inputs.cost} 
                            onChange={handleChange} 
                        />
                        </label>
                    
                
                <div class ="row">
                    <div class = "col">
                        {/* 5th */}
                        <label>Images
                        <input 
                            type="file" 
                            name="images"
                            className="form-control" 
                            value={inputs.images} 
                            onChange={handleChange} 
                        />
                        </label>
                    </div>
                    <div class = "col mt-4">
                        {/* 6th */}
                        {/* <label>Shop
                        <input 
                            type="text" 
                            name="shop"
                            className="form-control" 
                            value={inputs.shop} 
                            onChange={handleChange} 
                        />
                        </label> */}
                        {/* submit button */}
                        <button className="btn btn-success" onClick={onSubmitForm()}>Add</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        {/* <OrderList props={array}/> */}
    </Fragment>;
};

// export {array};
export default AddToOrder;

