export function Brand({ footer = false }: { footer?: boolean }) {
  return <span className={`brand ${footer ? "text-white" : ""}`}>
    <img className="meri-logo" src="/images/meri_logo.png" alt="MERI Industries original logo" width="72" height="72" />
    <span>SUNKA<small>BY MERI INDUSTRIES</small></span>
  </span>;
}
