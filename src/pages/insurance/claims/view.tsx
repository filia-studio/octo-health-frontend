import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn, formatAPIDate, getBadgeVarient } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { FaArrowLeft } from "react-icons/fa";
import { useSend } from "@/hooks/use-send";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import dayjs from "dayjs";
import type {
  HealthcareClaim as THealthcareClaim,
  IHealthcare,
} from "@/types/healthcare";
import type { PatientClaim as TPatientClaim } from "@/types/patient";

const PatientClaim = ({
  claim,
  healthcareProviderResponse,
}: {
  claim: TPatientClaim;
  healthcareProviderResponse?: IHealthcare;
}) => {
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
  } = claim;

  return (
    <>
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
            {dayjs(treatment_date.split("T")[0]).format("DD MMM, YYYY")}
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
          <p className="font-medium">
            {dayjs(created_at.split("T")[0]).format("DD MMM, YYYY")}
          </p>
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
              {dayjs(patient_details?.date_of_birth.split("T")[0]).format(
                "DD MMM, YYYY"
              )}
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
    </>
  );
};

const HealthcareClaim = ({ claim }: { claim: THealthcareClaim }) => {
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
    <>
      {/* Claim Info */}
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <p className="text-sm text-gray-500">Diagnosis (ICD Code)</p>
          <p className="font-medium">{diagnosis_icd_code}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Consultation Date</p>
          <p className="font-medium">{formatAPIDate(consultation_date)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge className={cn(getBadgeVarient(status), "capitalize text-sm")}>
            {status}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date Filed</p>
          <p className="font-medium">{formatAPIDate(created_at)}</p>
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
    </>
  );
};

const InsuranceClaimDetails: React.FC = () => {
  const navigate = useNavigate();
  const { claim: claimState, type = "patient" } = useLocation()?.state || {};
  const [open, setOpen] = useState(false);
  const [reason_text, setReason] = useState("");
  const [claim, setClaim] = useState(claimState);

  const { healthcare_provider, claim_patient } = claim || {};

  const { isLoading: isLoadingPaymentInfo, data: paymentData } = useFetch<{
    data: {
      bank: string;
      account_name: string;
      account_number: string;
    };
  }>(
    type === "healthcare"
      ? `/healthcare/${healthcare_provider}/get_healthcare_payment`
      : `/patient/${claim_patient}/get-patient-payment/`,
    {
      hideToast: "success",
    }
  );

  const { data: healthcareProviderResponse } = useFetch<IHealthcare>(
    `healthcare/${healthcare_provider}`,
    {
      useAuth: true,
      errorMessage: "Failed to load healthcare provider",
      hideToast: "success",
      enabled: Boolean(healthcare_provider),
    }
  );

  const { mutate, isPending } = useSend<
    unknown,
    { data: THealthcareClaim | TPatientClaim }
  >(
    type === "patient"
      ? "/patient-claims/update_claim_status/"
      : "/healthcare-claim/update_health_claim_status/",
    {
      successMessage: "Claim status updated successfully",
      onSuccess(data) {
        setClaim(data?.data);
      },
    }
  );

  useEffect(() => {
    if (claim.status === "pending") {
      mutate({
        status: "submitted",
        claim_id: claim.id,
        reason: "",
      });
    }
  }, [claim, mutate]);

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

      {type === "patient" && (
        <PatientClaim
          claim={claim}
          healthcareProviderResponse={healthcareProviderResponse}
        />
      )}

      {type === "healthcare" && <HealthcareClaim claim={claim} />}

      {/* Payment Info */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Payment Information</h2>
        {isLoadingPaymentInfo ? (
          <p className="text-gray-500">Loading payment information...</p>
        ) : !paymentData?.data?.bank ? (
          <p className="text-gray-500 mb-2">
            No payment information available.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Bank</p>
              <p className="font-medium">{paymentData?.data?.bank}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Account Name</p>
              <p className="font-medium">{paymentData?.data?.account_name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="font-medium">{paymentData?.data?.account_number}</p>
            </div>
          </div>
        )}
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
