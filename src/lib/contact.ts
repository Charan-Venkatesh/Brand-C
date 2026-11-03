import { CONTACT_EMAIL, CONTACT_PHONE_TEL } from "@/data/portfolio";

export interface Inquiry {
  senderName: string;
  senderEmail: string;
  companyName: string;
  roleInterestedIn: string;
  message: string;
}

export const telUrl = `tel:${CONTACT_PHONE_TEL}`;

export const whatsappUrl = (text = "Hi Charan, I came across your portfolio and would like to connect.") =>
  `https://wa.me/${CONTACT_PHONE_TEL.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export const inquirySubject = (q: Inquiry) =>
  `Opportunity: ${q.roleInterestedIn || "Hello"} — ${q.companyName || q.senderName}`;

export const inquiryBody = (q: Inquiry) =>
  [
    "Hi Charan,",
    "",
    q.message,
    "",
    `Role: ${q.roleInterestedIn}`,
    "",
    q.senderName,
    q.companyName,
    q.senderEmail,
    "",
    "— Sent from your portfolio contact form",
  ].join("\n");

export const mailtoUrl = (q: Inquiry) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(inquirySubject(q))}&body=${encodeURIComponent(inquiryBody(q))}`;
