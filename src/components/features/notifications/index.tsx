import { Button } from "@/components/ui/button";
import { FaRegBell } from "react-icons/fa";

const Notifications = () => {
  return (
    <Button variant="link" className="text-black">
      <FaRegBell className="size-7" />
    </Button>
  );
};

export default Notifications;
