import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Form } from "@/components/ui/form";
import { useSend } from "@/hooks/use-send";
import { createApiClient } from "@/lib/api";
import { onDownloadBlob } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEdit, FaFileDownload, FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import z from "zod";

const ACCEPTED_FILE_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];

const UploadBulkEnrollees = () => {
  const { client } = createApiClient({ useAuth: true });
  const navigate = useNavigate();

  const schema = z.object({
    file: z
      .any()
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
        "Only .xlsx and .csv formats are supported."
      ),
  });

  const download = async () => {
    const data = await client.get<string, Blob>(
      "/insurance-enrollee/download_simple_template/",
      {
        responseType: "blob",
      }
    );

    onDownloadBlob(data, "enrollees.xlsx");
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: null,
    },
  });

  const file = form.watch("file");

  const { mutate, isPending } = useSend("/insurance-enrollee/bulk_create/", {
    onSuccess() {
      navigate(-1);
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const formData = new FormData();

    formData.append("file", values.file);

    mutate(formData);
  };

  return (
    <DashboardDetailLayout title="Upload Enrollees">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[42rem] mx-auto"
        >
          <div className="flex gap-6">
            <button
              type="button"
              onClick={download}
              className="flex items-center justify-center max-w-xs w-full rounded-lg bg-gray-200 p-3"
            >
              <FaFileDownload className="mr-2" /> Download template
            </button>
            <div className="w-full flex flex-col justify-center max-w-[50%]">
              {file ? (
                <div className="flex gap-4 items-center w-full">
                  <p className="text-gray-800 text-sm w-full truncate">
                    {file.name}
                  </p>
                  <FileUpload
                    multiple={false}
                    accept=".xlsx, .csv"
                    onChange={({ target }) =>
                      form.setValue("file", target.files?.item?.(0))
                    }
                  >
                    <div className="px-6 py-2.5 text-green-700 border border-green-700 rounded-full text-sm font-medium flex items-center justify-center">
                      <FaEdit className="mr-1" /> Edit
                    </div>
                  </FileUpload>
                </div>
              ) : (
                <FileUpload
                  multiple={false}
                  accept=".xlsx, .csv"
                  onChange={({ target }) =>
                    form.setValue("file", target.files?.item?.(0))
                  }
                >
                  <div className="px-6 py-2.5 text-green-700 border border-green-700 rounded-full text-sm font-medium flex items-center justify-center">
                    <FaFileUpload className="mr-1" /> Upload file
                  </div>
                </FileUpload>
              )}
            </div>
          </div>
          {form.formState.errors.file?.message && (
            <p className="text-red-500 text-sm mt-3">
              {form.formState.errors.file?.message as string}
            </p>
          )}

          <div className="flex justify-end gap-4 mt-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="rounded-[12.5rem] w-full max-w-[6.5rem] lg:max-w-[11.8rem] h-10 lg:h-[4.1875rem] text-sm lg:text-xl font-semibold"
            >
              Back
            </Button>
            <Button
              type="submit"
              isLoading={isPending}
              disabled={Object.keys(form.formState.errors)?.length > 0}
              className="rounded-[12.5rem] bg-black w-full max-w-[6.5rem] lg:max-w-[11.8rem] h-10 lg:h-[4.1875rem] text-sm lg:text-xl font-semibold"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </DashboardDetailLayout>
  );
};

export default UploadBulkEnrollees;
