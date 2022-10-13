const FAQ = ({}) => {
  return (
    <section className="mb-6 rounded-md bg-neutral-100 px-6 py-12 text-gray-900">
      <div className="mx-auto flex flex-col justify-center p-4 md:p-8">
        <div className="mx-auto mb-10 text-center">
          <span className="font-bold uppercase tracking-wider text-blue-700">
            How it works
          </span>
          <h2 className="mt-2 text-2xl font-bold leading-none sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid gap-10 sm:p-3 md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="font-semibold">What is a QR Code?</h3>
            <p className="mt-1 text-neutral-600">
              QR Code is a two-dimensional version of the barcode, typically
              made up of black and white pixel patterns. Denso Wave, a Japanese
              subsidiary of the Toyota supplier Denso, developed them for
              marking components in order to accelerate logistics processes for
              their automobile production. Now, it has found its way into mobile
              marketing with the widespread adoption of smartphones.
              &quot;QR&quot; stands for &quot;Quick Response&quot;, which refers
              to the instant access to the information hidden in the Code.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              What are the benefits of using QR Codes?
            </h3>
            <p className="mt-1 text-neutral-600">
              They are gaining popularity because of their versatility. You can
              use them to gather feedback to improve your products or services,
              increase customer engagement with images or videos, or even
              promote your business via events and coupons. All of these can be
              done with just a single scan!
            </p>
          </div>
          <div>
            <h3 className="font-semibold">How do I scan QR Codes?</h3>
            <p className="mt-1 text-neutral-600">
              Depending on your device, you might already have a built-in QR
              Code reader or scanner. Open the camera app on your mobile phone
              and hold it over a Code for a few seconds until a notification
              pops up. If this doesn’t happen, check your settings and see if QR
              Code scanning is enabled. Still not working? Don’t worry, all you
              have to do now is install third-party QR Code readers from your
              app stores.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              How can I generate my own QR code?
            </h3>
            <p className="mt-1 text-neutral-600">
              There are different platforms and tools to create your own QR, but
              none like QR Code Now. With QR Code Now, you can not only create
              custom QR codes, you can also manage and edit your code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
