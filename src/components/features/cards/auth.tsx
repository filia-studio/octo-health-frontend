import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthCard = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: { id: string }) => {
    console.log(data);
    navigate("/storefront/schedule");
  };

  return (
    <Card className="h-[28.375rem] w-full max-w-[39.125rem] py-0 gap-0 rounded-4xl overflow-hidden">
      <div className="bg-primary text-white h-[5.5625rem] px-10 py-8">
        <h5 className="text-2xl font-bold">
          <FaInfoCircle className="inline w-6 h-6 mr-3" /> Please verify your
          credentials
        </h5>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-10">
        <Input
          {...form.register("id")}
          placeholder="Enter ID"
          className="h-[5.375rem] max-w-[34rem] mx-auto bg-transparent border-black rounded-[12.5rem] text-center !text-2xl"
        />
        <div className="flex justify-between items-center mt-9">
          <div className="flex items-center space-x-2">
            <Switch id="switch-mode" className="w-[5.5625rem] h-11 p-1" />
            <Label htmlFor="switch-mode" className="text-xl">Store Credentials</Label>
          </div>
          <Button className="rounded-[12.5rem] bg-black w-full max-w-[11.8rem] h-[4.1875rem] text-xl font-semibold">
            Send OTP
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AuthCard;
