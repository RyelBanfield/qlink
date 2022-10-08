export function Footer({}) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 text-center text-sm">
      <p>Copyright © {year} - All right reserved by RCB Software LLC</p>
    </footer>
  );
}
