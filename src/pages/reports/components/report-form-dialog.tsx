import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReportFormDialog({ open, onOpenChange }: Props) {

      const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  function close(){
    onOpenChange(false)
  }
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Report"
      description="We will add the form fields next."
    >
   <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Report Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mid-Term Report"
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Created By</label>
          <input
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            placeholder="Admin"
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button disabled>Save</Button>
      </DialogFooter>
    </Dialog>
  );
}