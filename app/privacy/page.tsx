import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to BIOSYTEMS. This privacy policy outlines how we handle
          your personal information.
        </p>
        <p className="mb-4">
          By using our website, you agree to the collection and use of
          information in accordance with this policy.
        </p>
        <h2 className="text-2xl font-bold mb-2">
          Information Collection and Use
        </h2>
        <p className="mb-4">
          We collect several different types of information for various
          purposes to provide and improve our Service to you.
        </p>
        <h2 className="text-2xl font-bold mb-2">Log Data</h2>
        <p className="mb-4">
          We want to inform you that whenever you visit our Service, we collect
          information that your browser sends to us that is called Log Data.
          This Log Data may include information such as your computer’s
          Internet Protocol ("IP") address, browser version, pages of our
          Service that you visit, the time and date of your visit, the time
          spent on those pages, and other statistics.
        </p>
        <h2 className="text-2xl font-bold mb-2">Cookies</h2>
        <p className="mb-4">
          Cookies are files with a small amount of data that is commonly used
          as an anonymous unique identifier. These are sent to your browser
          from the website that you visit and are stored on your computer’s
          hard drive.
        </p>
        <p className="mb-4">
          Our website uses these "cookies" to collect information and to
          improve our Service. You have the option to either accept or refuse
          these cookies, and know when a cookie is being sent to your computer.
          If you choose to refuse our cookies, you may not be able to use some
        </p>
        <h2 className="text-2xl font-bold mb-2">Security</h2>
        <p className="mb-4">
          We value your trust in providing us your Personal Information, thus
          we are striving to use commercially acceptable means of protecting
          it. But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </p>
        <h2 className="text-2xl font-bold mb-2">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately, after they are posted on
          this page.
        </p>
      </main>
      <Footer />
    </>
  );
}