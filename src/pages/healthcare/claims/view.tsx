import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, getBadgeVarient } from "@/lib/utils";

interface HealthcareClaim {
  id: string;
  claim_patient: string;
  insurance_provider: string;
  diagnosis_icd_code: string;
  consultation_date: string;
  medical_report: string;
  treatment_procedure_note: string;
  prescriptions_and_investigation_ordered: string;
  invoice: string;
  additional_documents: string;
  healthcare_provider: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

const HealthcareClaimDetails: React.FC = () => {
  const navigate = useNavigate();
  const claim = useLocation()?.state?.claim as HealthcareClaim;

  if (!claim) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading claim details...
      </div>
    );
  }

  const {
    diagnosis_icd_code,
    consultation_date,
    medical_report,
    treatment_procedure_note,
    prescriptions_and_investigation_ordered,
    invoice,
    additional_documents,
    status,
    created_at,
  } = claim;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Healthcare Claim Details</h1>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {/* Claim Info */}
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <p className="text-sm text-gray-500">Diagnosis (ICD Code)</p>
          <p className="font-medium">{diagnosis_icd_code}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Consultation Date</p>
          <p className="font-medium">
            {new Date(consultation_date).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge className={cn(getBadgeVarient(status), "capitalize text-sm")}>
            {status}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date Filed</p>
          <p className="font-medium">{new Date(created_at).toLocaleString()}</p>
        </div>
      </div>

      {/* Medical Report */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Medical Report</h2>
        <p className="text-gray-700 whitespace-pre-line">{medical_report}</p>
      </div>

      {/* Treatment & Prescriptions */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Treatment Procedure Notes
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {treatment_procedure_note}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Prescriptions & Investigations
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {prescriptions_and_investigation_ordered}
          </p>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Uploaded Documents</h2>

        <div className="space-y-3">
          {/* Invoice */}
          <div>
            <p className="text-sm font-medium mb-1">Invoice</p>
            {invoice ? (
              <a
                href={invoice}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Invoice
              </a>
            ) : (
              <p className="text-gray-500">No invoice uploaded.</p>
            )}
          </div>

          {/* Additional Documents */}
          <div>
            <p className="text-sm font-medium mb-1">Additional Documents</p>
            {additional_documents ? (
              <a
                href={additional_documents}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Document
              </a>
            ) : (
              <p className="text-gray-500">No document uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareClaimDetails;
