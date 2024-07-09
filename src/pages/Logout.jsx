import { useEffect } from "react";
import { useAuth } from "../contexts/Auth.context";

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    async function logoutUser() {
      if (isAuthed) {
        await logout();
      }
    }
    logoutUser();
  }, [logout]);

  if (isAuthed) {
    return (
      <div className="text-center p-3">
        <div className="row">
          <div className="col-12">
            <h1>logging out</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-3">
      <div className="row">
        <div className="col-12">
          <h1 data-cy="logoutMessage">You have successfully logged out</h1>
        </div>
      </div>
    </div>
  );
}
