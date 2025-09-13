import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSend } from "@/hooks/use-send";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { IoReload } from "react-icons/io5";

const AuthCard = ({
  placeholder = "Enter ID",
  btnText = "Send OTP",
  showResendOtp = false,
  onSubmit,
  defaultValues,
  registerKey = "email",
}: {
  placeholder?: string;
  btnText?: string;
  showResendOtp?: boolean;
  onSubmit: SubmitHandler<Record<string, string>>;
  defaultValues?: Record<string, string>;
  registerKey?: string;
}) => {
  const form = useForm({
    defaultValues,
  });

  const [storedEmail, setStoredEmail] = useState<string | null>(
    localStorage.getItem("email")
  );

  useEffect(() => {
    if (storedEmail) {
      form.setValue("email", storedEmail);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isPending } = useSend<{ email: string }, { message: string }>(
    "healthcare/login/",
    {
      useAuth: false,
      // onSuccess: (data, variables) => {
      //   navigate(`${hospitalUrl}/auth/login`);
      // },
    }
  );

  const onResendOtp = (data: { email: string }) => {
    mutate(data);
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
              onClick={() => onResendOtp({ email: "" })}
            >
              <IoReload color="#000" />
              <Label htmlFor="switch-mode" className="text-sm lg:text-xl">
                Resend OTP
              </Label>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Switch
                id="switch-mode"
                className="w-8 lg:w-[5.5625rem] h-4 lg:h-11 lg:p-1"
                checked={!!storedEmail}
                onCheckedChange={() => {
                  if (storedEmail) {
                    localStorage.removeItem("email");
                    setStoredEmail(null);
                  } else {
                    localStorage.setItem("email", form.getValues("email"));
                    setStoredEmail(form.getValues("email"));
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
