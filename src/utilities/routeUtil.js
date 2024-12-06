import { useNavigate } from "react-router-dom";

export const useNavUtil = ({ path, replace }) => {
  const navigate = useNavigate();
  return (path) => {
    navigate(path, { replace: true });
  };
};

export const basePath = "/" + navigator.language.toLowerCase();
