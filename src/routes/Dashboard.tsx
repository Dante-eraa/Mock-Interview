import Headings from "@/components/Headings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Headings
          title="Dashboard"
          description="Create and start your AI Mock Interview"
        />

        <Link to={"/generate/create"}>
          <Button size={"sm"}>
            <Plus /> Add Now
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default Dashboard;
