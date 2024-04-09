import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSales, fetchSales } from "../actions"

export const Sales = () => {
    const dispatch = useDispatch()
    const sales = useSelector((state) => state.sales)

    const [newSales, setNewSales] = useState({
        description:"",
        quantity: "",
        price: "",
    })
 
    useEffect(() =>
     {dispatch(fetchSales())}, [dispatch])

    const handleNewSales = (e) => {
         const name = e.target.name
         const value = e.target.value
         setNewSales({...newSales, [name]: value })
    }

    const handleSales = (e) => {
        e.preventDefault()
        dispatch(addSales(newSales))
        setNewSales({
            description:"",
            quantity: "",
            price: "",
        })
    }

    return(
        <div className="main">
            <h1>Sales</h1>
        <form>
            <div className="formInput">
            <div className="label" >
            <label>Description- </label>
            <input className="input" type="text" autoComplete="off" value={newSales.description} name="description" onChange={handleNewSales} />
            </div>
            <div className="label" >
            <label>Quantity- </label>
            <input className="input" type="number" autoComplete="off" value={newSales.quantity} name="quantity" onChange={handleNewSales}/>
            </div>
            <div className="label" >
            <label>Price- </label>
            <input className="input" type="number" autoComplete="off" value={newSales.price} name="price" onChange={handleNewSales} />
            </div>
            </div>
            <button className="submit-btn" onClick={handleSales} >Add To Sales</button>
        </form>
        <div>
        <table>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price ($)</th>
                    <th>Revenue ($)</th>
                </tr>
            {
            sales.map(({_id,description,quantity,price}) => 
            <tr key={_id}>
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{price * quantity}</td>
            </tr> )
            }
        </table>
        <h3>Total Revenue: ${sales.reduce((acc, curr) => curr.quantity * curr.price + acc,0 )} </h3>
        </div>
        </div>
    )
}