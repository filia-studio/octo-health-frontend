import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardDetailLayout = ({
  children,
  title,
  showBack = true,
}: {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="bg-white rounded-2xl rounded-b-none border border-[#E1E1E1] min-h-dvh">
        <div className="flex items-center gap-2 p-3 border-b border-[#E1E1E1]">
          {showBack && (
            <Button variant="link" onClick={() => navigate(-1)}>
              <FaArrowLeft className="size-3" />
            </Button>
          )}
          <h4 className=" font-medium text-lg">{title}</h4>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </section>
  );
};

export default DashboardDetailLayout;
