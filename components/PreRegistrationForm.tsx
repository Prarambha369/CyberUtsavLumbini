"use client";

import { useState, useRef, useCallback } from "react";
import { countries, interests, teamRoles } from "@/lib/data";

/* ─── SVG Icons ─── */
function Lock() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function Check() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function Shield() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

/* ─── Types ─── */
interface FormData {
  // Step 1: Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 2: Team
  teamName: string;
  teamRole: string;
  teamMember1: string;
  teamMember2: string;
  // Step 3: Event
  country: string;
  affiliation: string;
  interest: string;
  experience: string;
  // Step 4: Review
  agreedToCodeOfConduct: boolean;
  agreedToPrivacy: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  teamName: "",
  teamRole: "",
  teamMember1: "",
  teamMember2: "",
  country: "",
  affiliation: "",
  interest: "",
  experience: "",
  agreedToCodeOfConduct: false,
  agreedToPrivacy: false,
};

/* ─── Validation ─── */
function validateStep(step: number, data: FormData): string[] {
  const errors: string[] = [];

  if (step === 1) {
    if (!data.firstName.trim()) errors.push("First name is required");
    if (!data.lastName.trim()) errors.push("Last name is required");
    if (!data.email.trim()) errors.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.push("Please enter a valid email address");
    if (data.phone && !/^[\d\s+\-()]{7,20}$/.test(data.phone))
      errors.push("Please enter a valid phone number");
  }

  if (step === 2) {
    if (!data.teamName.trim()) errors.push("Team name is required");
    if (!data.teamRole) errors.push("Please select your role in the team");
  }

  if (step === 3) {
    if (!data.country) errors.push("Please select your country");
    if (!data.affiliation.trim()) errors.push("Affiliation is required");
    if (!data.interest) errors.push("Please select your area of interest");
  }

  if (step === 4) {
    if (!data.agreedToCodeOfConduct) errors.push("You must agree to the Code of Conduct");
    if (!data.agreedToPrivacy) errors.push("You must agree to the Privacy Policy");
  }

  return errors;
}

/* ─── Step indicator ─── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-10 h-10 flex items-center justify-center font-black text-sm border-2 transition-all ${
              i + 1 === current
                ? "bg-[#00D4FF] text-black border-black neo-shadow-sm"
                : i + 1 < current
                ? "bg-[#00FF41] text-black border-black"
                : "bg-[#1A1A1A] text-[#555] border-[#333]"
            }`}
          >
            {i + 1 < current ? <Check /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`w-8 h-0.5 ${
                i + 1 < current ? "bg-[#00FF41]" : "bg-[#333]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Input wrapper ─── */
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-black text-[#00D4FF]">
        {label} {required && <span className="text-[#E53E3E]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[#E53E3E] font-sans" role="alert">{error}</p>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-[#0A0A0A] border-2 border-[#333] p-4 text-[#F5F5F5] font-mono focus:border-[#00D4FF] focus:outline-none focus:shadow-[4px_4px_0px_0px_#00D4FF] transition-all placeholder:text-[#555] text-sm";

const selectClass =
  "w-full bg-[#0A0A0A] border-2 border-[#333] p-4 text-[#F5F5F5] font-mono focus:border-[#00D4FF] focus:outline-none focus:shadow-[4px_4px_0px_0px_#00D4FF] transition-all appearance-none cursor-pointer text-sm";

/* ═══════════════════════════════════════
   MAIN FORM COMPONENT
   ═══════════════════════════════════════ */
export default function PreRegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const totalSteps = 4;

  const update = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors([]);
    },
    []
  );

  const goNext = useCallback(() => {
    const stepErrors = validateStep(step, formData);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors([]);
    setStep((s) => Math.min(s + 1, totalSteps));
  }, [step, formData]);

  const goBack = useCallback(() => {
    setErrors([]);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const stepErrors = validateStep(step, formData);
      if (stepErrors.length > 0) {
        setErrors(stepErrors);
        return;
      }

      setIsSubmitting(true);
      setServerError("");

      try {
        // Simulate API call — replace with actual endpoint
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // In production, POST to your API:
        // const res = await fetch("/api/register", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(formData),
        // });
        // if (!res.ok) throw new Error("Registration failed");

        setIsSubmitted(true);
      } catch {
        setServerError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [step, formData]
  );

  /* ── Success state ── */
  if (isSubmitted) {
    return (
      <div className="bg-[#111] border-2 border-[#00FF41] p-8 md:p-12 neo-shadow text-center">
        <div className="w-20 h-20 bg-[#00FF41]/10 border-2 border-[#00FF41] flex items-center justify-center mx-auto mb-6">
          <Check />
        </div>
        <h3 className="text-3xl font-black text-[#00FF41] mb-3">
          PRE-REGISTRATION SUCCESSFUL
        </h3>
        <p className="text-[#A0A0A0] font-sans mb-6 max-w-md mx-auto">
          Welcome aboard, {formData.firstName}! Check <strong className="text-[#F5F5F5]">{formData.email}</strong> for
          your confirmation and next steps.
        </p>
        <div className="bg-[#0A0A0A] border-2 border-[#222] p-6 max-w-sm mx-auto text-left">
          <h4 className="font-black text-sm text-[#00D4FF] mb-3">REGISTRATION DETAILS</h4>
          <div className="space-y-2 text-sm font-sans">
            <div className="flex justify-between">
              <span className="text-[#555]">Name:</span>
              <span className="font-bold">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#555]">Team:</span>
              <span className="font-bold">{formData.teamName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#555]">Track:</span>
              <span className="font-bold text-[#00D4FF]">{formData.interest}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#555]">Country:</span>
              <span className="font-bold">{formData.country}</span>
            </div>
          </div>
        </div>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#00D4FF] text-black font-black text-sm border-2 border-black neo-shadow-sm neo-hover"
        >
          BACK TO HOME
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-[#111] border-2 border-[#00D4FF] p-6 md:p-12 neo-shadow-lg"
      noValidate
    >
      <StepIndicator current={step} total={totalSteps} />

      {/* ── Error banner ── */}
      {errors.length > 0 && (
        <div className="bg-[#E53E3E]/10 border-2 border-[#E53E3E] p-4 mb-6" role="alert">
          <p className="font-black text-sm text-[#E53E3E] mb-1">PLEASE FIX THE FOLLOWING:</p>
          <ul className="text-xs text-[#E53E3E] font-sans space-y-1">
            {errors.map((err) => (
              <li key={err}>• {err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Server error ── */}
      {serverError && (
        <div className="bg-[#E53E3E]/10 border-2 border-[#E53E3E] p-4 mb-6" role="alert">
          <p className="font-black text-sm text-[#E53E3E]">{serverError}</p>
        </div>
      )}

      {/* ═══ STEP 1: Personal Info ═══ */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#00D4FF] text-black flex items-center justify-center border-2 border-black neo-shadow-sm">
              <UserIcon />
            </div>
            <div>
              <h3 className="font-black text-lg">PERSONAL INFORMATION</h3>
              <p className="text-xs text-[#555] font-sans">Step 1 of {totalSteps} — Tell us about yourself</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="First Name" required error={errors.find((e) => e.includes("First name"))}>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={inputClass}
                placeholder="John"
                autoComplete="given-name"
              />
            </Field>

            <Field label="Last Name" required error={errors.find((e) => e.includes("Last name"))}>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={inputClass}
                placeholder="Doe"
                autoComplete="family-name"
              />
            </Field>
          </div>

          <Field label="Email Address" required error={errors.find((e) => e.includes("email"))}>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
              placeholder="john@example.com"
              autoComplete="email"
            />
          </Field>

          <Field label="Phone Number (Optional)" error={errors.find((e) => e.includes("phone"))}>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
              placeholder="+977 98XXXXXXXX"
              autoComplete="tel"
            />
          </Field>
        </div>
      )}

      {/* ═══ STEP 2: Team Info ═══ */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#00D4FF] text-black flex items-center justify-center border-2 border-black neo-shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-lg">TEAM DETAILS</h3>
              <p className="text-xs text-[#555] font-sans">Step 2 of {totalSteps} — Your team of 3</p>
            </div>
          </div>

          <Field label="Team Name" required error={errors.find((e) => e.includes("Team name"))}>
            <input
              type="text"
              value={formData.teamName}
              onChange={(e) => update("teamName", e.target.value)}
              className={inputClass}
              placeholder="e.g. CyberNepal, ByteForce, etc."
            />
          </Field>

          <Field label="Your Role in Team" required error={errors.find((e) => e.includes("role"))}>
            <select
              value={formData.teamRole}
              onChange={(e) => update("teamRole", e.target.value)}
              className={selectClass}
            >
              <option value="">Select your role</option>
              {teamRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </Field>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Teammate 1 Name (Optional)">
              <input
                type="text"
                value={formData.teamMember1}
                onChange={(e) => update("teamMember1", e.target.value)}
                className={inputClass}
                placeholder="Teammate name"
              />
            </Field>

            <Field label="Teammate 2 Name (Optional)">
              <input
                type="text"
                value={formData.teamMember2}
                onChange={(e) => update("teamMember2", e.target.value)}
                className={inputClass}
                placeholder="Teammate name"
              />
            </Field>
          </div>

          <div className="bg-[#1A1A1A] border-2 border-[#333] p-4 text-xs text-[#A0A0A0] font-sans">
            <strong className="text-[#F5F5F5]">Note:</strong> Teams of exactly 3 members are required for CyberUtsav. 
            You can register your team now and add teammate details later.
          </div>
        </div>
      )}

      {/* ═══ STEP 3: Event Preferences ═══ */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#00D4FF] text-black flex items-center justify-center border-2 border-black neo-shadow-sm">
              <Shield />
            </div>
            <div>
              <h3 className="font-black text-lg">EVENT PREFERENCES</h3>
              <p className="text-xs text-[#555] font-sans">Step 3 of {totalSteps} — Where and what</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Country of Residence" required error={errors.find((e) => e.includes("country"))}>
              <select
                value={formData.country}
                onChange={(e) => update("country", e.target.value)}
                className={selectClass}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Affiliation" required error={errors.find((e) => e.includes("Affiliation"))}>
              <input
                type="text"
                value={formData.affiliation}
                onChange={(e) => update("affiliation", e.target.value)}
                className={inputClass}
                placeholder="University / School / Organization"
              />
            </Field>
          </div>

          <Field label="Area of Interest" required error={errors.find((e) => e.includes("interest"))}>
            <select
              value={formData.interest}
              onChange={(e) => update("interest", e.target.value)}
              className={selectClass}
            >
              <option value="">Select your track</option>
              {interests.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </Field>

          <Field label="Hackathon Experience (Optional)">
            <select
              value={formData.experience}
              onChange={(e) => update("experience", e.target.value)}
              className={selectClass}
            >
              <option value="">Select your experience level</option>
              <option value="first-time">First-time hacker</option>
              <option value="1-3">1–3 hackathons</option>
              <option value="4+">4+ hackathons</option>
              <option value="pro">Professional / Industry</option>
            </select>
          </Field>

          {/* Track preview cards */}
          <div className="bg-[#1A1A1A] border-2 border-[#333] p-6">
            <h4 className="font-black text-sm text-[#00D4FF] mb-4">SELECTED TRACK: {formData.interest || "—"}</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {interests.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => update("interest", i)}
                  className={`p-2 text-[10px] font-bold border-2 transition-all ${
                    formData.interest === i
                      ? "border-[#00D4FF] bg-[#00D4FF] text-black"
                      : "border-[#333] bg-[#111] text-[#555] hover:border-[#555]"
                  }`}
                >
                  {i.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ STEP 4: Review & Submit ═══ */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#00D4FF] text-black flex items-center justify-center border-2 border-black neo-shadow-sm">
              <Lock />
            </div>
            <div>
              <h3 className="font-black text-lg">REVIEW & SUBMIT</h3>
              <p className="text-xs text-[#555] font-sans">Step 4 of {totalSteps} — Confirm your registration</p>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#0A0A0A] border-2 border-[#222] p-4">
              <h4 className="font-black text-xs text-[#00D4FF] tracking-widest mb-3">PERSONAL</h4>
              <div className="space-y-2 text-sm font-sans">
                <div className="flex justify-between"><span className="text-[#555]">Name:</span><span className="font-bold">{formData.firstName} {formData.lastName}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Email:</span><span className="font-bold">{formData.email}</span></div>
                {formData.phone && <div className="flex justify-between"><span className="text-[#555]">Phone:</span><span className="font-bold">{formData.phone}</span></div>}
              </div>
            </div>

            <div className="bg-[#0A0A0A] border-2 border-[#222] p-4">
              <h4 className="font-black text-xs text-[#00D4FF] tracking-widest mb-3">TEAM</h4>
              <div className="space-y-2 text-sm font-sans">
                <div className="flex justify-between"><span className="text-[#555]">Team:</span><span className="font-bold">{formData.teamName}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Role:</span><span className="font-bold">{formData.teamRole}</span></div>
                {formData.teamMember1 && <div className="flex justify-between"><span className="text-[#555]">Member 1:</span><span className="font-bold">{formData.teamMember1}</span></div>}
                {formData.teamMember2 && <div className="flex justify-between"><span className="text-[#555]">Member 2:</span><span className="font-bold">{formData.teamMember2}</span></div>}
              </div>
            </div>

            <div className="bg-[#0A0A0A] border-2 border-[#222] p-4">
              <h4 className="font-black text-xs text-[#00D4FF] tracking-widest mb-3">EVENT</h4>
              <div className="space-y-2 text-sm font-sans">
                <div className="flex justify-between"><span className="text-[#555]">Country:</span><span className="font-bold">{formData.country}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Affiliation:</span><span className="font-bold">{formData.affiliation}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Track:</span><span className="font-bold text-[#00D4FF]">{formData.interest}</span></div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border-2 border-[#222] p-4">
              <h4 className="font-black text-xs text-[#00D4FF] tracking-widest mb-3">EXPERIENCE</h4>
              <div className="space-y-2 text-sm font-sans">
                <div className="flex justify-between"><span className="text-[#555]">Level:</span><span className="font-bold">{formData.experience || "Not specified"}</span></div>
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="space-y-4 pt-4 border-t border-[#222]">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.agreedToCodeOfConduct}
                onChange={(e) => update("agreedToCodeOfConduct", e.target.checked)}
                className="mt-1 w-5 h-5 accent-[#00D4FF] bg-[#0A0A0A] border-2 border-[#333] cursor-pointer"
              />
              <span className="text-sm font-sans text-[#A0A0A0] group-hover:text-[#F5F5F5] transition-colors">
                I agree to the <strong className="text-[#00D4FF]">Code of Conduct</strong> and will follow all event rules and guidelines. <span className="text-[#E53E3E]">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.agreedToPrivacy}
                onChange={(e) => update("agreedToPrivacy", e.target.checked)}
                className="mt-1 w-5 h-5 accent-[#00D4FF] bg-[#0A0A0A] border-2 border-[#333] cursor-pointer"
              />
              <span className="text-sm font-sans text-[#A0A0A0] group-hover:text-[#F5F5F5] transition-colors">
                I agree to the <strong className="text-[#00D4FF]">Privacy Policy</strong> and consent to data processing for event communication. <span className="text-[#E53E3E]">*</span>
              </span>
            </label>
          </div>

          <div className="bg-[#1A1A1A] border-2 border-[#333] p-4 flex items-center gap-3 text-xs text-[#A0A0A0] font-sans">
            <Lock />
            <span>Your data is encrypted and will only be used for event communication. We never share your information with third parties.</span>
          </div>
        </div>
      )}

      {/* ── Navigation buttons ── */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#222]">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#333] text-[#A0A0A0] font-black text-sm hover:border-[#555] hover:text-[#F5F5F5] transition-all"
          >
            <ArrowLeft /> BACK
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#00D4FF] text-black font-black text-sm border-2 border-black neo-shadow-sm neo-hover"
          >
            NEXT <Arrow />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#00FF41] text-black font-black text-sm border-2 border-black neo-shadow-sm neo-hover disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#00FF41] transition-all"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                SUBMITTING...
              </>
            ) : (
              <>
                SUBMIT REGISTRATION <Arrow />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
