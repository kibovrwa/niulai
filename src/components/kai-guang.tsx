import { useEffect, useState } from "react";

const KEY = "niulai.kaiguang.v1";

export function KaiGuang() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(KEY)) return;
      window.localStorage.setItem(KEY, new Date().toISOString());
    } catch {
      /* still show once this session */
    }
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="kai-veil" role="status">
      <span className="kai-chop">开光</span>
      <p className="mt-6 font-brush text-2xl text-gold-soft">信牛来，牛市一定来</p>
      <p className="mt-2 text-xs tracking-[0.35em] text-paper/70">此页已开光 · 丙午年</p>
    </div>
  );
}

export function KaiSeal() {
  return (
    <span className="kai-seal" aria-hidden>
      开光
    </span>
  );
}
