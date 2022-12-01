import { Alert } from "@mui/material";

const StatusRow = ({params}) => {
    const severity = {
        paid: "success",
        send: "warning",
        cancel: "error",
    }

    return ( 
        <Alert severity={severity[params.row.status]} icon={false}>
            {params.row.status}
        </Alert>
     );
}
 
export default StatusRow;