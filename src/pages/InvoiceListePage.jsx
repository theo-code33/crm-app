import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsRow from "../components/table/ActionsRow";
import CreatedAtRow from "../components/table/CreatedAtRow";
import StatusRow from "../components/table/StatusRow";

const InvoiceListePage = () => {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [invoicesFiltered, setInvoicesFiltered] = useState([]);
    const [columns, setColumns] = useState([
        { field: '_id', headerName: 'ID', width: 200 },
        { 
            field: 'customer', headerName: 'Client', width: 130,
            valueGetter: (params) => 
                `${params.row.customer?.firstName} ${params.row.customer?.lastName}`,
        },
        { 
            field: 'createdAt', headerName: 'Date d\'envoie', width: 130,
            renderCell: (params) => <CreatedAtRow params={params} />
         },
        { 
            field: 'status', headerName: 'Status', width: 90,
            renderCell: (params) => <StatusRow params={params} />
        },
        { 
            field: 'amount', headerName: 'Montant', width: 160,
            valueGetter: (params) => `${params.value} €`,
         },
        { field: "id", headerName: 'Actions', width: 300,
            renderCell: (params) => <ActionsRow params={params} setInvoices={setInvoices} type={"invoice"}/> },
    ]);

    useEffect(() => {
        fetchInvoices();
    }, [])
    useEffect(() => {
        setInvoicesFiltered(invoices);
    }, [invoices])

    const fetchInvoices = async () => {
        fetch("http://localhost:8000/api/invoices")
            .then(response => response.json())
            .then(data => setInvoices(data));
    }
    const navigateNewInvoice = () => {
        navigate("/new-invoice");
    }

    const handleSearch = (e) => {
        const search = e.target.value;
        const searchArray = search.split(":")
        if (searchArray.length === 2) {
            setInvoicesFiltered(invoices)
            const field = searchArray[0];
            const value = searchArray[1];
            switch (field) {
                case "status":
                    setInvoicesFiltered(invoices.filter(invoice => invoice.status.toLowerCase().includes(value.toLowerCase())));
                    break;
                case "client":
                    setInvoicesFiltered(invoices.filter(invoice => invoice.customer.firstName.toLowerCase().includes(value.toLowerCase()) || invoice.customer.lastName.toLowerCase().includes(value.toLowerCase())));
                    break;
                case "montant":
                    setInvoicesFiltered(invoices.filter(invoice => invoice.amount.toString().includes(value)));
                    break;
                default:
                    break;
            }
        }else{
            setInvoicesFiltered(invoices.filter(invoice => invoice.customer.firstName.toLowerCase().includes(search.toLowerCase()) || invoice.customer.lastName.toLowerCase().includes(search.toLowerCase())));
        }
    }

    return ( 
        <Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Typography variant="h2">Liste des factures</Typography>
                <Button variant="contained" onClick={navigateNewInvoice}>Nouvelle facture</Button>
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
                    rows={invoicesFiltered}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </Box>
        </Box>
     );
}
 
export default InvoiceListePage;