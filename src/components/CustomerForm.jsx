import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CustomerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const params = useLocation().state?.params;
    const [credentials, setCredentials] = useState(id ? params : {});
    const [editMode, setEditMode] = useState(id ? true : false);

    useEffect(() => {
        if (editMode) {
            fetch(`http://localhost:8000/api/customer/${id}`)
                .then(response => response.json())
                .then(data => {
                    setCredentials(data);
                });
        }
    }, [id])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials(credentials => ({
            ...credentials,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(editMode) {
            fetch(`http://localhost:8000/api/customer/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            .then(response => navigate("/customers"))
        }else{
            credentials.user = "6375f7c00bd055142757df54"
            fetch("http://localhost:8000/api/customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            .then(response => navigate("/customers"))
        }
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ width: 50 + "%", margin: "auto" }}>
                <TextField
                        id="firstName"
                        label="Prénom"
                        name="firstName"
                        defaultValue={credentials.firstName ?? ""}
                        onChange={(e) => {handleChange(e)}}
                />
                <TextField
                        id="lastName"
                        label="Nom"
                        name="lastName"
                        defaultValue={credentials.lastName ?? ""}
                        onChange={(e) => {handleChange(e)}}
                />
                <TextField
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        defaultValue={credentials.email ?? ""}
                        onChange={(e) => {handleChange(e)}}
                />
                <TextField
                        id="company"
                        label="Entreprise"
                        name="company"
                        defaultValue={credentials.company ?? ""}
                        onChange={(e) => {handleChange(e)}}
                />
            <Button variant="contained" type="submit">Ajouter</Button>
            </Stack>
        </form>
     );
}
 
export default CustomerForm;