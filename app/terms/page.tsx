import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4">
          Welcome to BIOSYTEMS. These terms and conditions outline the rules and
          regulations for the use of our website.
        </p>
        <p className="mb-4">
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use BIOSYTEMS if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>
        <h2 className="text-2xl font-bold mb-2">Cookies</h2>
        <p className="mb-4">
          We employ the use of cookies. By accessing BIOSYTEMS, you agreed to
          use cookies in agreement with the BIOSYTEMS's Privacy Policy.
        </p>
        <h2 className="text-2xl font-bold mb-2">License</h2>
        <p className="mb-4">
          Unless otherwise stated, BIOSYTEMS and/or its licensors own the
          intellectual property rights for all material on BIOSYTEMS. All
          intellectual property rights are reserved. You may access this from
          BIOSYTEMS for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>
        <p className="mb-4">You must not:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Republish material from BIOSYTEMS</li>
          <li>Sell, rent or sub-license material from BIOSYTEMS</li>
          <li>Reproduce, duplicate or copy material from BIOSYTEMS</li>
          <li>Redistribute content from BIOSYTEMS</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website. Nothing in this disclaimer will:
        </p>
        <ul className="list-disc list-inside">
          <li>
            limit or exclude our or your liability for death or personal injury;
          </li>
          <li>
            limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li>
            exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}