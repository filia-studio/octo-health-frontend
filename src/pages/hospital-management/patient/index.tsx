// import OverViewCard from "@/components/features/cards/overview";
// import RecentSection from "@/components/features/pills/recent";
import PatientsTable from "@/components/features/tables/patients-table";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const PatientManagement: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4">
      <div className="flex justify-end items-end my-12">
        <Button
          className="bg-black w-max"
          onClick={() => navigate("create-patient")}
        >
          Add Patient
        </Button>
      </div>

      <PatientsTable />
    </div>
  );
};

export default PatientManagement;
