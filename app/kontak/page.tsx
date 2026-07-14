import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageHeader from "@/src/components/PageHeader";
import FadeIn from "@/src/components/FadeIn";
import ContactForm from "@/src/components/ContactForm";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "halo@kila.id",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 812 3456 7890",
  },
  {
    icon: MapPin,
    label: "Alamat",
    value: "Jl. Kemang Raya No. 45, Jakarta Selatan",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin–Sabtu, 09.00–18.00 WIB",
  },
];

export default function KontakPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10">
      <FadeIn>
        <PageHeader
          title="Hubungi Kami"
          subtitle="Ada pertanyaan tentang produk atau pesananmu? Kami senang membantu."
        />
      </FadeIn>

      <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-2">
        <FadeIn delay={0.15}>
          <ul className="space-y-8">
            {contactDetails.map((detail) => (
              <li key={detail.label} className="flex items-start gap-4">
                <detail.icon
                  className="mt-1 h-5 w-5 shrink-0 text-foreground"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {detail.label}
                  </p>
                  <p className="mt-1 text-foreground">{detail.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.25}>
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
