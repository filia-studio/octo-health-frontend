import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSend } from "@/hooks/use-send";
import { useForm } from "react-hook-form";

const CompleteAppointmentModal = ({
  open,
  onClose,
  appointmentId,
}: {
  open: boolean;
  onClose: () => void;
  appointmentId?: string;
}) => {
  const form = useForm({
    defaultValues: {
      comments: "",
      rating: 5,
    },
  });

  const { isPending: loading, mutate: completeAppointment } = useSend(
    `/appointment/${appointmentId}/complete/`,
    {
      useAuth: true,
      onSuccess: () => {
        onClose();
      },
    }
  );

  const onSubmit = (values: { comments: string }) => {
    completeAppointment(values);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[34.8em] rounded-3xl gap-0">
        <DialogHeader className="gap-0 text-left">
          <h2 className="text-xl font-semibold">Complete Appointment</h2>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-[40rem] mx-auto space-y-6 py-12 px-4"
            >
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input appointment comments here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end mt-12">
                <Button
                  isLoading={loading}
                  type="submit"
                  className="rounded-[12.5rem] bg-black w-full max-w-[6.5rem] lg:max-w-[11.8rem] h-10 lg:h-12 text-sm lg:text-lg font-semibold"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CompleteAppointmentModal;
