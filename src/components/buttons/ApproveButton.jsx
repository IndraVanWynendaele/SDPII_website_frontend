import { useNavigate } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import { post } from "../../api/index";
import useSWRMutation from "swr/mutation";
import Button from "@mui/material/Button";

export default function ApproveButton({ type, id }) {

    const navigate = useNavigate();

    const {
        trigger: saveDecision
    } = useSWRMutation(`dashboard/notifications/${id}`, post);

    const handleApprove = async () => {
        try {
            await saveDecision({
                type: type,
                judgement: "approved"
            });
            navigate("/admin/notifications");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button variant="outlined" color="success" endIcon={<DoneIcon />} onClick={handleApprove}>
            Approve
        </Button>
    )
}