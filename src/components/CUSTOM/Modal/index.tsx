import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  withClose?: boolean;
  title?: string;
  classContent?: string;
  desc?: string;
  children?: React.ReactNode;
  footerDialog?: React.ReactNode;
  onChange?(val: boolean): void;
}

function Modal(props: ModalProps) {
  const {
    isOpen,
    title,
    desc,
    children,
    footerDialog,
    onChange,
    withClose,
    classContent,
  } = props;
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        withClose={withClose}
        className={cn("sm:max-w-[425px]", classContent)}
      >
        {(title || desc) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {desc && <DialogDescription>{desc}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
        {footerDialog}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;

// dialog footer
{
  /* <DialogFooter>
<Button type="submit">Save changes</Button>
</DialogFooter> */
}
