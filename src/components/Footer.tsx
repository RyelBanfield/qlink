const Footer = ({}) => {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex h-16 w-full max-w-5xl items-center justify-center px-6 text-center text-sm sm:px-8 md:px-12">
      <p>Copyright © {year} - All right reserved by RCB Software LLC</p>
    </footer>
  );
};

export default Footer;
