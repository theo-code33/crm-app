import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const params = useLocation().state?.params;
    const [credentials, setCredentials] = useState(id ? params : {});
    const [editMode, setEditMode] = useState(id ? true : false);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (editMode) {
            fetch(`http://localhost:8000/api/invoice/${id}`)
                .then(response => response.json())
                .then(data => {
                    setCredentials(data);
                });
        }
    }, [id])

    useEffect(() => {
        fetch("http://localhost:8000/api/customers")
            .then(response => response.json())
            .then(data => {
                setCustomers(data);
            });
    }, ['customers'])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials(credentials => ({
            ...credentials,
            [name]: value
        }));
    }
    const handleChangeCustomer = (e) => {
        setCredentials(credentials => ({...credentials, customer: e.target.value}));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(editMode) {
            fetch(`http://localhost:8000/api/invoice/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            .then(response => navigate("/"))
        }else{
            if(credentials.customer === undefined) {
                credentials.customer = customers[0]._id;
            }
            if(credentials.status === undefined) {
                credentials.status = "send";
            }
            fetch("http://localhost:8000/api/invoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            .then(response => navigate("/"))
        }
    }
    return ( 
        <form onSubmit={(e) => handleSubmit(e)}>
            <Stack spacing={3} sx={{ width: 50 + "%", margin: "auto" }}>
                <FormControl fullWidth>
                    <InputLabel id="status-label-select">Client</InputLabel>
                    {customers.length > 0 && (
                    <Select
                        labelId="client-label-select"
                        label={"Client"}
                        name="customer"
                        defaultValue={credentials.customer?._id ? credentials.customer._id :  customers[0]._id}
                        onChange={(e) => {handleChangeCustomer(e)}}
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer._id} value={customer._id}>{customer._id} - {customer.firstName} {customer.lastName}</MenuItem>
                        ))}
                    </Select>)}
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="status-label-select">Statut</InputLabel>
                    <Select
                        labelId="status-label-select"
                        label={"Statut"}
                        name="status"
                        onChange={(e) => {handleChange(e)}}
                        required
                        defaultValue={credentials.status ? credentials.status : "send"}
                    >
                        <MenuItem value="send">Send</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>

                </FormControl>
                <TextField
                    id="outlined-number"
                    label="Montant"
                    type="number"
                    name="amount"
                    step="0.1"
                    defaultValue={credentials.amount ?? ""}
                    onChange={(e) => {handleChange(e)}}
                />
                <Button variant="contained" type="submit">Ajouter</Button>
            </Stack>
        </form>
    );
}
 
export default InvoiceForm;