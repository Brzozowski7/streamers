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
    <div className="flex justify-center items-center h-full">
      <RotatingLines
        width={width}
        strokeColor={color}
        strokeWidth="4"
        visible={true}
        animationDuration="1.5"
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default LoadingSpinner;
