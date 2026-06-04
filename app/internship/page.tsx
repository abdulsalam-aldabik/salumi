import type { Metadata } from "next";
import { InternshipContent } from "@/components/internship/InternshipContent";

export const metadata: Metadata = {
  title: "Internship at Smart NV — Abdul Salam Aldabik",
  description:
    "During my internship at Smart NV I built IQ Noodles: an app that looks at a puzzle through your phone's camera, recognizes the pieces, and shows you how to solve it — and whether your placements are correct.",
  alternates: { canonical: "/internship" },
  openGraph: {
    type: "article",
    url: "https://salumieportfolio.netlify.app/internship",
    title: "Internship at Smart NV — IQ Noodles",
    description:
      "An app that solves a real puzzle game using your phone's camera. Computer vision internship at Smart NV, Kontich.",
  },
};

export default function InternshipPage() {
  return <InternshipContent />;
}
