import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSend } from "@/hooks/use-send";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { IoReload } from "react-icons/io5";

const AuthCard = ({
  type = "healthcare",
  placeholder = "Enter ID",
  btnText = "Send OTP",
  showResendOtp = false,
  onSubmit,
  defaultValues,
  loading,
  registerKey = "email",
}: {
  placeholder?: string;
  btnText?: string;
  showResendOtp?: boolean;
  onSubmit: SubmitHandler<Record<string, string>>;
  defaultValues?: Record<string, string>;
  registerKey?: string;
  loading?: boolean;
  type?: "healthcare" | "patient" | "insurance";
}) => {
  const form = useForm({
    defaultValues,
  });

  const key = type === "patient" ? "patient_code" : "email";

  const [storedKey, setStoredKey] = useState<string | null>(
    localStorage.getItem(key)
  );

  useEffect(() => {
    if (storedKey) {
      form.setValue(key, storedKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: logHeathcare, isPending: logingHealthcare } =
    useSend<{ email: string }, { message: string }>("healthcare/login/", {
      useAuth: false,
    });

  const { mutate: logPatient, isPending: loggingPatient } = useSend<
    unknown,
    { message: string }
  >("patient/patient_login/", {
    useAuth: false,
  });

  const isPending = logingHealthcare || loggingPatient;

  const onResendOtp = (data: { key: string }) => {
    if (key === "patient_code") {
      logPatient({ patient_code: data.key });
      return;
    }
    logHeathcare({ email: data.key });
  };

  return (
    <Card className="h-[18rem] lg:h-[28.375rem] w-full max-w-[39.125rem] py-0 gap-0 rounded-4xl overflow-hidden border-none">
      <div className="bg-primary text-white h-[5.5625rem] px-7 lg:px-10 py-8">
        <h5 className="lg:text-2xl font-bold">
          <FaInfoCircle className="inline w-6 h-6 mr-2 lg:mr-3" /> Please verify
          your credentials
        </h5>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-8 px-9 lg:p-10"
      >
        <Input
          {...form.register(registerKey)}
          placeholder={placeholder}
          className="h-16 lg:h-[5.375rem] max-w-[18.75rem] md:max-w-[34rem] mx-auto bg-transparent border-black rounded-[12.5rem] text-center lg:!text-2xl"
        />
        <div className="flex justify-between items-center mt-9">
          {showResendOtp ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={
                !isPending
                  ? () => onResendOtp({ key: sessionStorage.getItem(key) ?? "" })
                  : undefined
              }
            >
              <IoReload
                color="#000"
                className={cn({ "animate-spin": isPending })}
              />
              <Label htmlFor="switch-mode" className="text-sm lg:text-xl cursor-pointer">
                Resend OTP
              </Label>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Switch
                id="switch-mode"
                className="w-8 lg:w-[5.5625rem] h-4 lg:h-11 lg:p-1"
                checked={!!storedKey}
                onCheckedChange={() => {
                  if (storedKey) {
                    localStorage.removeItem(key);
                    setStoredKey(null);
                  } else {
                    localStorage.setItem(key, form.getValues(key));
                    setStoredKey(form.getValues(key));
                  }
                }}
              />
              <Label htmlFor="switch-mode" className="text-sm lg:text-xl">
                Store Credentials
              </Label>
            </div>
          )}
          <Button
            disabled={isPending}
            isLoading={loading}
            className="rounded-[12.5rem] bg-black w-full max-w-[6.5rem] lg:max-w-[11.8rem] h-10 lg:h-[4.1875rem] text-sm lg:text-xl font-semibold"
          >
            {btnText}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AuthCard;
