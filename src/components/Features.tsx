const Item = ({ text }: { text: string }) => {
  return (
    <li className="flex space-x-2">
      <div className="flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-5 w-5 fill-current text-blue-700"
        >
          <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
          <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
        </svg>
      </div>
      <span className="text-sm">{text}</span>
    </li>
  );
};

const Features = ({}) => {
  return (
    <section className="mb-12 flex h-min flex-col rounded-md bg-neutral-100 px-6 py-12 text-neutral-900">
      <h2 className="mb-8 text-center text-3xl font-bold leading-none sm:text-3xl">
        What do we have to offer?
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        <Item text="A fast and easy way to create & download QR codes" />
        <Item text="A website to host all your social links" />
        <Item text="An associate plan which you can use to sell QR codes & websites to local businesses" />
      </ul>
    </section>
  );
};

export default Features;
