export function Footer({}) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 px-6 text-center text-sm sm:px-8 md:px-12">
      <p>Copyright © {year} - All right reserved by RCB Software LLC</p>
    </footer>
  );
}
