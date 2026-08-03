import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { chatEmailSchema } from "../lib/zod/validation"
import CommonForms from "./CommonForms"


const DialogPage=({open, setOpen})=>{
  const defaultValues={
        email:'',
        number:''
    }

  return(
    <Dialog size="" open={open} onOpenChange={()=>setOpen(!open)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Buildyours chat</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <CommonForms defaultValues={defaultValues} emailSchema={chatEmailSchema} formElement={"chat"}/>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DialogPage
