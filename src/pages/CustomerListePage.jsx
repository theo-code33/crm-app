import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsRow from "../components/table/ActionsRow";

const CustomerListePage = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [customersFiltered, setCustomersFiltered] = useState([]);
    const [columns, setColumns] = useState([
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'firstName', headerName: 'Prénom', width: 130 },
        { field: 'lastName', headerName: 'Nom', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'company', headerName: 'Entreprise', width: 130 },
        { 
            field: "invoices", headerName: 'Factures', width: 300, 
            valueGetter: (params) => `${params.value.length}` 
        },
        { field: "id", headerName: 'Actions', width: 300,
            renderCell: (params) => <ActionsRow params={params} setCustomers={setCustomers} type={"customer"}/>
        }
    ]);
    useEffect(() => {
        fetchCustomers();
    }, [])
    useEffect(() => {
        setCustomersFiltered(customers);
    }, [customers])

    const fetchCustomers = async () => {
        fetch("http://localhost:8000/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data));
    }

    const navigateNewCustomer = () => {
        navigate("/customers/new-customer");
    }
    const handleSearch = (e) => {
        const search = e.target.value;
        const searchArray = search.split(":")
        if (searchArray.length === 2) {
            setCustomersFiltered(customers)
            const field = searchArray[0];
            const value = searchArray[1];
            switch (field) {
                case "entreprise":
                    setCustomersFiltered(customers.filter(customer => customer.company.toLowerCase().includes(value.toLowerCase())));
                    break;
                case "email":
                    setCustomersFiltered(customers.filter(customer => customer.email.toLowerCase().includes(value.toLowerCase())));
                    break;
                case "prénom":
                    setCustomersFiltered(customers.filter(customer => customer.firstName.toLowerCase().includes(value.toLowerCase())));
                    break;
                case "prenom":
                    setCustomersFiltered(customers.filter(customer => customer.firstName.toLowerCase().includes(value.toLowerCase())));
                    break;
                case "nom":
                    setCustomersFiltered(customers.filter(customer => customer.lastName.toLowerCase().includes(value.toLowerCase())));
                    break;
                default:
                    break;
            }
        }else{
            setCustomersFiltered(customers.filter(customer => customer.firstName.toLowerCase().includes(search.toLowerCase())));
        }
    }
    return ( 
        <Box>
            <Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Typography variant="h2">Liste des Clients</Typography>
                <Button variant="contained" onClick={navigateNewCustomer}>Nouvelle Client</Button>
            </Box>
            <Box component="form">
                <TextField 
                    variant="outlined" 
                    label="Recherche" 
                    sx={{width: "100%"}}
                    onChange={(e) => {handleSearch(e)}}
                />
            </Box>
            <Box
                sx={{
                    height: 400, 
                    width: '100%',
                    mt: 4
                }}
            >
                <DataGrid
                    rows={customersFiltered}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </Box>
        </Box>
        </Box>
     );
}
 
export default CustomerListePage;