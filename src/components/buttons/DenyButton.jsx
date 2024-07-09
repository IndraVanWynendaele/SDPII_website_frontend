import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { post } from "../../api/index";
import useSWRMutation from "swr/mutation";
import Button from "@mui/material/Button";

export default function DenyButton({ type, id }) {

    const navigate = useNavigate();

    const {
        trigger: saveDecision
    } = useSWRMutation(`dashboard/notifications/${id}`, post);

    const handleDeny = async () => {
        try {
            await saveDecision({
                type: type,
                judgement: "denied"
            });
            navigate("/admin/notifications");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button variant="outlined" color="error" endIcon={<CloseIcon />} onClick={handleDeny}>
            Deny
        </Button>
    )
}