export const fetchInventory = () => async (dispatch) => {
    try{
        dispatch({type: "FETCH_DATA_LOADING"});
        const response= await fetch("https://0eeee39d-60ad-4daa-9bd2-ee49b469d77e-00-1w6ttqoj05hfx.spock.replit.dev/items")
        const data = await response.json();
        dispatch({type: "FETCH_INVENTORY_SUCCESS", payload: data })
    }
    catch (error) {
      console.log("error fetching inventory data",error);
      dispatch({type: "FETCH_INVENTORY_FAILURE" })
    }
}

export const fetchSales = () => async (dispatch) => {
    try{
        dispatch({type: "FETCH_DATA_LOADING"})
        const response = await fetch("https://0eeee39d-60ad-4daa-9bd2-ee49b469d77e-00-1w6ttqoj05hfx.spock.replit.dev/sales")
        const data = await response.json();
        dispatch({type: "FETCH_SALES_SUCCESS", payload: data})
    }
    catch{
        console.log("Error fetching sales data")
        dispatch({type: "FETCH_SALES_FAILURE"})
    }
}

export const addInventory = (newEntry) => async (dispatch) => {
    try{
     const response = await fetch("https://0eeee39d-60ad-4daa-9bd2-ee49b469d77e-00-1w6ttqoj05hfx.spock.replit.dev/items",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry)
     })
     const data = await response.json()
     if(data) {
        dispatch({type: "ADD_TO_INVENTORY", payload: data})
     }
    }
    catch (error) {
        console.log('Error adding entry', error)
        dispatch({type: "ADD_ENTRY_FAILURE"})
    }
}

export const deleteInventory = (entry) => async (dispatch) => {
    try{
        const response = await fetch(`https://0eeee39d-60ad-4daa-9bd2-ee49b469d77e-00-1w6ttqoj05hfx.spock.replit.dev/items/${entry}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if(data) {
            dispatch({type: "REMOVE_FROM_INVENTORY", payload: data._id})
        }   
    }
    catch(error){
       console.log("Error deleting item",error);
       dispatch({type: "ADD_ENTRY_FAILURE"})
    }
}

export const updateInventory = (entry) => async (dispatch) => {
    try{
        const response = await fetch(`https://0eeee39d-60ad-4daa-9bd2-ee49b469d77e-00-1w6ttqoj05hfx.spock.replit.dev/items/${entry.id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(entry)
        })
      const data= await response.json()
      if(data) {
        dispatch({type: "UPDATE_INVENTORY", payload: data})
      }
    }
    catch (error) {
        console.log("Error updating inventory",error)
        dispatch({type: "ADD_ENTRY_FAILURE"})
    }
}

export const addSales = (newEntry) => async (dispatch) => {
    try{
        const response = await fetch("https://0eeee39d-60ad-4daa-9bd2-ee49b469d77e-00-1w6ttqoj05hfx.spock.replit.dev/sales", 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        })
        const data = await response.json()
        if(data) {
            dispatch({type: "ADD_TO_SALES", payload: data})
        }
    }
    catch (error){
        console.log("Error adding sales", error)
        dispatch({type: "ADD_ENTRY_FAILURE"})
    }
}
