import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";

const InvoiceUpdatePage = ({params, setInvoices}) => {
    const { id } = useParams();
    return ( 
        <Box>
            <Typography variant="h2">Modifier la facture avec l'ID { id }</Typography>
            <InvoiceForm/>
        </Box>
     );
}
 
export default InvoiceUpdatePage;