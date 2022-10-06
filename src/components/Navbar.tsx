import { LoginBtn } from "./LoginBtn";

export function Navbar({}) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl normal-case">QR Code Generator</a>
      </div>
      <div className="navbar-end">
        <LoginBtn />
      </div>
    </div>
  );
}
