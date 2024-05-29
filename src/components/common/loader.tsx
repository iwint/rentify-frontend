import { Modal } from "@mui/material";
import React from "react";
import { TailSpin } from "react-loader-spinner";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <Modal open={isLoading} className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-10 justify-center">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="rgb(244 63 94 /1)"
          ariaLabel="tail-spin-loading"
          radius="2"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <div className="text-white font-semibold text-lg md:text-2xl ">
          Please wait for a minute...
        </div>
      </div>
    </Modal>
  );
};

export default Loader;
