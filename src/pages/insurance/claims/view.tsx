import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn, getBadgeVarient } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import type { HealthcareDetails } from "@/types/otp";
import { FaArrowLeft } from "react-icons/fa";
import { useSend } from "@/hooks/use-send";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PatientDetails {
  id: number;
  photo: string | null;
  email: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  address: string;
  gender: string;
  date_of_birth: string;
}

interface Claim {
  id: string;
  claim_type: string;
  diagnosis: string;
  treatment_date: string;
  total_charges: string;
  status: string;
  reason: string | null;
  created_at: string;
  patient_details: PatientDetails;
  invoice: string[];
  payment_receipt: string[];
  supporting_documents: string[];
  insurance_provider: string;
  healthcare_provider: string;
}

const InsuranceClaimDetails: React.FC = () => {
  const navigate = useNavigate();
  const claim = useLocation()?.state?.claim as Claim;
  const [open, setOpen] = useState(false);
  const [reason_text, setReason] = useState("");

  const {
    claim_type,
    diagnosis,
    treatment_date,
    total_charges,
    status,
    reason,
    created_at,
    patient_details,
    invoice,
    payment_receipt,
    supporting_documents,
    healthcare_provider,
  } = claim || {};

  const { data: healthcareProviderResponse } = useFetch<HealthcareDetails>(
    `healthcare/${healthcare_provider}`,
    {
      useAuth: true,
      errorMessage: "Failed to load healthcare provider",
      hideToast: "success",
      enabled: Boolean(healthcare_provider),
    }
  );

  const { mutate, isPending } = useSend("/patient-claims/update_claim_status/");

  if (!claim) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading claim details...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Claim Details</h1>
      </div>

      {/* Claim Info */}
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <p className="text-sm text-gray-500">Claim Type</p>
          <p className="font-medium capitalize">{claim_type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Diagnosis</p>
          <p className="font-medium">{diagnosis}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Treatment Date</p>
          <p className="font-medium">
            {new Date(treatment_date).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Charges</p>
          <p className="font-medium">
            ₦{Number(total_charges).toLocaleString()}
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
        {reason && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Reason (if rejected)</p>
            <p className="font-medium text-red-600">{reason}</p>
          </div>
        )}
      </div>

      {/* Patient Info */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">
              {patient_details?.first_name} {patient_details?.last_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{patient_details?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="font-medium">{patient_details?.contact_number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium capitalize">{patient_details?.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">
              {new Date(patient_details?.date_of_birth).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{patient_details?.address}</p>
          </div>
        </div>
      </div>

      {/* Healthcare Info */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-3">
          Healthcare Provider Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{healthcareProviderResponse?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{healthcareProviderResponse?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="font-medium">
              {healthcareProviderResponse?.contact_number}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{healthcareProviderResponse?.address}</p>
          </div>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Uploaded Documents</h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Invoices</p>
            <div className="flex flex-wrap gap-3">
              {typeof invoice === "string" ? (
                <a
                  href={invoice}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Invoice
                </a>
              ) : typeof invoice === "object" && invoice?.length > 0 ? (
                <>
                  {invoice?.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Invoice {idx + 1}
                    </a>
                  ))}
                </>
              ) : (
                <p className="text-gray-500">No invoices available.</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Payment Receipts</p>

            <div className="flex flex-wrap gap-3">
              {typeof payment_receipt === "string" ? (
                <a
                  href={payment_receipt}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Receipt
                </a>
              ) : typeof payment_receipt === "object" &&
                payment_receipt?.length > 0 ? (
                <>
                  {payment_receipt?.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Receipt {idx + 1}
                    </a>
                  ))}
                </>
              ) : (
                <p className="text-gray-500">No receipt available.</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Supporting Documents</p>

            <div className="flex flex-wrap gap-3">
              {typeof supporting_documents === "string" ? (
                <a
                  href={supporting_documents}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Document
                </a>
              ) : typeof supporting_documents === "object" &&
                supporting_documents?.length > 0 ? (
                <>
                  {supporting_documents?.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Document {idx + 1}
                    </a>
                  ))}
                </>
              ) : (
                <p className="text-gray-500">No document available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <FaArrowLeft className="size-2.5" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setOpen(true)}>
            Reject
          </Button>
          <Button
            isLoading={isPending}
            onClick={() =>
              mutate({
                status: "approve",
                claim_id: claim.id,
                reason: "",
              })
            }
          >
            Approve
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div>
            <Label className="mb-2">Enter reason for rejection</Label>
            <textarea
              className="w-full p-2"
              value={reason_text}
              onChange={({ target: { value } }) => setReason(value)}
            />
            <div className="flex items-center gap-2 mt-6">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                isLoading={isPending}
                disabled={!reason_text}
                onClick={() =>
                  mutate({
                    status: "reject",
                    claim_id: claim.id,
                    reason: reason_text,
                  })
                }
              >
                Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsuranceClaimDetails;
