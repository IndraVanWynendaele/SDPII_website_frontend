import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ApproveButton from "../../../buttons/ApproveButton";
import DenyButton from "../../../buttons/DenyButton";
import { useParams } from "react-router-dom";
import BackButton from "../../../buttons/BackButton";

export default function EditReview({ details }) {
  const changelist = [];
  for (let key in details.data) {
    changelist.push(key + ": " + details.data[key]);
  }

  const { id } = useParams();

  return (
    <>
      <BackButton defaultRedirect="/admin/notifications" />
      <Stack direction="row" spacing={2} justifyContent="center" mb={2} mr={2}>
        <ApproveButton type={details.notificationType.name} id={id} />
        <DenyButton type={details.notificationType.name} id={id} />
      </Stack>
      <div className="centerpaperedit">
        <Paper className="editreviewpaper">
          <Stack>
            <h4 className="leftheading">
              {details.fromAccount.name} wants to edit the following data:
            </h4>
            <ul>
              {changelist.map((change, index) => (
                <li key={index}>
                  <h5 className="nomargin">{change}</h5>
                </li>
              ))}
            </ul>
            <br />
          </Stack>
        </Paper>
      </div>
    </>
  );
}
