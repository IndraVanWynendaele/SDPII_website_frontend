import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { type } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "admin") {
      navigate("/admin/notifications");
    } else {
      navigate("/products");
    }
  }, [type, navigate]);

  return null;
}
