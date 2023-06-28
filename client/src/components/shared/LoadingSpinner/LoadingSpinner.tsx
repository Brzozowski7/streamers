import { Box } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";

interface LoadingSpinnerProps {
  color?: string;
  width?: string;
}

const LoadingSpinner = ({
  color = "blue",
  width = "20",
}: LoadingSpinnerProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <RotatingLines
        width={width}
        strokeColor={color}
        strokeWidth="4"
        visible={true}
        animationDuration="1.5"
        ariaLabel="rings-loading"
      />
    </Box>
  );
};

export default LoadingSpinner;
