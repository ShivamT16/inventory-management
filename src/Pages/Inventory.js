import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addInventory, deleteInventory, fetchInventory, updateInventory } from "../actions";
import "./pages.css"

export const Inventory = () => {
    const dispatch = useDispatch();
    const inventory = useSelector((state => state.inventory))
    const [newInventory, setNewInventory] = useState({
        name:"",
        quantity:"",
        category:"",
        price:""
    })
    const [search,setSearch] = useState("")
    const [button,setButton] = useState(false)

    useEffect(() => {
        dispatch(fetchInventory())
    }, [dispatch] )

    const handleNewInventory = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setNewInventory({...newInventory, [name]: value})
    }
    const handleInventory =(e) => {
        e.preventDefault()
        dispatch(addInventory(newInventory))
        setNewInventory({
            name:"",
            quantity:"",
            category:"",
            price:""
        })
    }
    const handleUpdate = (id) => {
     const findItem = inventory.find((item) => item._id === id )
     setNewInventory({
        id:findItem._id,
        name:findItem.name,
        quantity:findItem.quantity,
        category:findItem.category,
        price:findItem.price
    }) 
    setButton(true)
    }

    const handleUpdateInventory = () => {
        dispatch(updateInventory(newInventory));
        setNewInventory({
            name:"",
            quantity:"",
            category:"",
            price:""
        })
        setButton(false)
    }
    
    const handleCancelButton = () => {
        setNewInventory({
            name:"",
            quantity:"",
            category:"",
            price:""
        })
        setButton(false)
    }

    const check = !newInventory.name.length || !newInventory.quantity.length || !newInventory.category.length || !newInventory.price.length

    return(
        <div className="main">
        <h2>Add Items to Inventory</h2>
        <form>
            <div className="formInput">
            <div className="label" >
            <label>Name-</label>
            <input className="input" type="text" autoComplete="off" value={newInventory.name} name="name" onChange={handleNewInventory} />
            </div>
            <div className="label">
            <label>Quantity-</label>
            <input className="input" type="number" autoComplete="off" value={newInventory.quantity} name="quantity" onChange={handleNewInventory} />
            </div>
            <div className="label">
            <label>Category-</label>
            <input className="input" type="text" autoComplete="off" value={newInventory.category} name="category" onChange={handleNewInventory} />
            </div>
            <div className="label">
            <label>Price-</label>
            <input className="input" type="number" autoComplete="off" value={newInventory.price} name="price" onChange={handleNewInventory} />
            </div>
            </div>
            {button ? <button className="submit-btn" onClick={handleUpdateInventory}>Update Inventory</button> : <button className="submit-btn" disabled={ check ? true : false} onClick={handleInventory} >Add To Inventory</button>}
            {button && <button className="submit-btn" onClick={handleCancelButton} >Cancel</button>}

        </form>
        <div>
        <h2>Inventory Report</h2>
        <div className="label">
            <label>Sort by Category</label>
            <input className="input" type="text" placeholder="Type here..." onChange={(e) => setSearch(e.target.value)} />
        </div>
        <table>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Price ($)</th>
                    <th>Operations</th>
                </tr>
            {inventory.filter(({category}) => category.includes(search)).map(({_id,name,quantity,category,price}) => 
                <tr key={_id}>
                            <td>{name}</td>
                            <td>{quantity}</td>
                            <td>{category}</td>
                            <td>{price}</td>
                            <td>
                            <button className="action-btn" onClick={() => dispatch(deleteInventory(_id))} >Delete</button>
                            <button onClick={() => handleUpdate(_id)}>Update</button>
                            </td>
                        </tr>   
            )}
            </table>
        </div>
        </div>
    )
}