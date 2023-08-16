import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DrawerProps {
  isOpen: boolean;
  title?: string;
  desc?: string;
  onChange?(str: boolean): void;
  children?: React.ReactNode;
  footerDrawer?: React.ReactNode;
}

function Drawer(props: DrawerProps) {
  const { isOpen, title, desc, children, onChange, footerDrawer } = props;
  return (
    <Sheet open={isOpen} onOpenChange={onChange}>
      <SheetContent>
        {(title || desc) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {desc && <SheetDescription>{desc}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
        {footerDrawer}
      </SheetContent>
    </Sheet>
  );
}

export default Drawer;

// footer drawer

//  <SheetFooter>
/* <SheetClose asChild>
<Button type="submit">Save changes</Button>
</SheetClose>
</SheetFooter> */
