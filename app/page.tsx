import Hero from "@/components/home/hero";
import ProjectSection from "@/components/home/project-section";
import LabSection from "@/components/home/lab-section";
import ProfileSection from "@/components/home/profile-section";
import ContactSection from "@/components/home/contact-section";
import SectionBreak from "@/components/section-break";
import { siteConfig } from "@/lib/config/site-config";
import { hasResume } from "@/lib/resume";

export default function Home() {
  const resumeAvailable = hasResume();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.seo.url,
    description: siteConfig.seo.description,
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.education.institution,
    },
    email: `mailto:${siteConfig.links.email}`,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero hasResume={resumeAvailable} />
      <SectionBreak />
      <ProjectSection />
      <SectionBreak />
      <LabSection />
      <SectionBreak />
      <ProfileSection />
      <SectionBreak />
      <ContactSection hasResume={resumeAvailable} />
    </>
  );
}
