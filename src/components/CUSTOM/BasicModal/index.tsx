import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { ChangeEvent, MouseEvent, MouseEventHandler } from "react";

export const [CENTER, TOP] = ["center", "top"];

interface BasicModalProps {
  children: React.ReactNode;
  showModal: boolean;
  onOverlayCancel?(): void;
  position?: string;
  className?: string;
}

function BasicModal(props: BasicModalProps) {
  const {
    children,
    showModal,
    onOverlayCancel,
    position = "center",
    className,
  } = props;

  const handleCloseOverlay = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onOverlayCancel) {
      onOverlayCancel();
    }
  };

  const renderPosition = () => {
    let currentPosition = "";
    switch (position) {
      case TOP:
        currentPosition = "top-1/4";
        break;
      default:
        currentPosition = "top-1/2";
        break;
    }
    return currentPosition;
  };

  return (
    <>
      {showModal ? (
        <div
          role="presentation"
          onClick={handleCloseOverlay}
          className=" animate-in delay-200 fixed top-0 left-0 opacity-100 h-screen  w-screen bg-black/75 backdrop-blur-sm !z-[100001]"
        >
          <div
            className={cn(
              `!z-[1000021] fixed ${renderPosition()}
              left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-5 grid gap-y-10 overflow-hidden `,
              className
            )}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BasicModal;
