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
import Rating from "@/components/ui/rating";
import { useSend } from "@/hooks/use-send";
import { useForm } from "react-hook-form";

const ReviewModal = ({
  open,
  onClose,
  appointmentId,
  healthcareId,
}: {
  open: boolean;
  onClose: () => void;
  appointmentId?: string;
  healthcareId: string;
}) => {
  const form = useForm({
    defaultValues: {
      comments: "",
      rating: 0,
    },
  });

  const { isPending: loading, mutate: ratehealthcare } = useSend(
    `healthcare-ratings/`,
    {
      useAuth: true,
      onSuccess: () => {
        onClose();
      },
    }
  );

  const onSubmit = (values: { comments: string; rating: number }) => {
    const payload = {
      healthcare: healthcareId,
      rating: values.rating,
      appointment: appointmentId || "",
      comment: values.comments,
    };

    ratehealthcare(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[34.8em] rounded-3xl gap-0">
        <DialogHeader className="gap-0 text-left">
          <h2 className="text-xl font-semibold">Leave a Review</h2>
        </DialogHeader>

        <div className="flex flex-col items-start space-y-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-[40rem] mx-auto space-y-6 py-12 px-4"
            >
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Rating rating={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input review comments here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end mt-12">
                <Button onClick={onClose} color="inherit" variant="outline">
                  Cancel
                </Button>
                <Button isLoading={loading} type="submit" color="inherit">
                  Submit Review
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewModal;
