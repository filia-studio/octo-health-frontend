import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoFilter } from "react-icons/io5";
import { cn } from "@/lib/utils";

const SearchProvider = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 w-full max-w-[36rem]", className)}>
      <Input
        placeholder="Search for provider"
        className="w-full max-w-[32.2rem] h-11 rounded-[12.5rem] border-black bg-transparent"
      />
      <Button size="icon" className="size-8 lg:size-11 rounded-full bg-black">
        <IoFilter className="size-4 lg:size-6" />
      </Button>
    </div>
  );
};

export default SearchProvider;
