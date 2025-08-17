import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoFilter } from "react-icons/io5";

const SearchProvider = () => {
  return (
    <div className="flex items-center gap-2 w-full max-w-[36rem]">
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
