import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ActionsRow = ({params, setCustomers, setInvoices, type}) => {
    const navigate = useNavigate() 
    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/${type}/${params.row._id}/edit`, {state:{params: params.row}});
    }

    const handleDelete = async (e) => {
        e.stopPropagation();
        fetch(`http://localhost:8000/api/${type}/${params.row._id}`, {
            method: "DELETE"
        })
        .then(response => {
            if(type === "invoice"){
                setInvoices(invoices => invoices.filter(invoice => invoice._id !== params.row._id))
            }
            if(type === "customer"){
                setCustomers(customers => customers.filter(customer => customer._id !== params.row._id))
            }
        })
        
    }

    return ( 
        <Box display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" size="small" onClick={handleEdit}>Éditer</Button>
            <Button variant="contained" color="secondary" size="small" onClick={handleDelete}>Supprimer</Button>
        </Box>
     );
}
 
export default ActionsRow;