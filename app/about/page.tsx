import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-center mb-8">
            About BioSystems
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Your trusted partner in advancing healthcare across Africa. We are an innovative e-commerce platform dedicated to supplying high-quality medical equipment and consumables to healthcare providers.
          </p>

          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Founded in 2023, BioSystems emerged from a vision to bridge the gap in the medical supply chain in Africa. Our founders, a team of biomedical engineers and healthcare management experts, witnessed firsthand the challenges healthcare facilities faced in sourcing reliable and affordable medical equipment. Determined to make a difference, they launched BioSystems to create a transparent, efficient, and reliable marketplace for the healthcare industry.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Our mission is to empower healthcare providers in Africa with the tools they need to deliver superior patient care. We are committed to providing a comprehensive catalog of high-quality medical products, ensuring timely delivery, and offering exceptional customer service. We believe that by simplifying access to medical supplies, we can contribute to a healthier future for the continent.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
              <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                Meet the passionate individuals behind BioSystems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <img src="/placeholder-user.jpg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-bold">Dr. Adanna Okoro</h3>
                  <p className="text-muted-foreground">Co-founder & CEO</p>
                </div>
                <div className="text-center">
                  <img src="/professional-man-african-business.jpg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-bold">Jide Williams</h3>
                  <p className="text-muted-foreground">Co-founder & CTO</p>
                </div>
                <div className="text-center">
                  <img src="/professional-woman-doctor-african.jpg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-bold">Amina Diallo</h3>
                  <p className="text-muted-foreground">Head of Operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
