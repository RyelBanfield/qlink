const QNA = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 sm:text-xl">{question}</h3>
      <p className="mt-1 text-neutral-900">{answer}</p>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="mb-6 rounded bg-neutral-100 px-6 py-12 sm:mb-12">
      <div className="mx-auto flex flex-col justify-center p-4">
        <div className="mx-auto mb-10 text-center">
          <span className="font-bold uppercase tracking-wider text-blue-700 sm:text-lg">
            How it works
          </span>
          <h2 className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <QNA
            question="What is a QR Code?"
            answer='A QR Code is a two-dimensional version of the barcode, typically
              made up of black and white pixel patterns. Denso Wave, a Japanese
              subsidiary of the Toyota supplier Denso, developed them for
              marking components in order to accelerate logistics processes for
              their automobile production. Now, it has found its way into mobile
              marketing with the widespread adoption of smartphones.
              "QR" stands for "Quick Response", which refers
              to the instant access to the information hidden in the Code.'
          />
          <QNA
            question="What are the benefits of using QR Codes?"
            answer="They are gaining popularity because of their versatility. You can
              use them to gather feedback to improve your products or services,
              increase customer engagement with images or videos, or even
              promote your business via events and coupons. All of these can be
              done with just a single scan!"
          />
          <QNA
            question="How do I scan QR Codes?"
            answer="Depending on your device, you might already have a built-in QR
              Code reader or scanner. Open the camera app on your mobile phone
              and hold it over a Code for a few seconds until a notification
              pops up. If this doesn’t happen, check your settings and see if QR
              Code scanning is enabled. Still not working? Don’t worry, all you
              have to do now is install third-party QR Code readers from your
              app stores."
          />
          <QNA
            question="How can I generate my own QR code?"
            answer='You can generate your own QR Code with our QR Code generator. Just
              enter the URL you want to encode and click "Generate
              QR Code". If you don&apos;t have a website yet, you can use our
              one-link website creator and create a QR Code that links to all your accounts.'
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
