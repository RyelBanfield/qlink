const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex w-full max-w-5xl items-center justify-center p-6 sm:px-8 md:px-12">
      <p className="text-center text-xs sm:text-sm">
        Copyright © {year} - All right reserved by QLink
      </p>
    </footer>
  );
};

export default Footer;
