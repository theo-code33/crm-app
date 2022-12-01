import { useParams } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";

const CustomerUpdatePage = () => {
    const { id } = useParams();
    return ( 
        <div>
            <h1>Modification du client avec l'ID { id }</h1>
            <CustomerForm />
        </div>
     );
}
 
export default CustomerUpdatePage;