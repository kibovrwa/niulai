const GIFTS = [
  { t: "钱", kind: "coin" },
  { t: "爱情", kind: "slip" },
  { t: "事业", kind: "slip" },
  { t: "健康", kind: "slip" },
  { t: "回信", kind: "slip" },
  { t: "涨停", kind: "seal" },
  { t: "来", kind: "seal" },
  { t: "钱", kind: "coin" },
  { t: "爱情", kind: "slip" },
  { t: "事业", kind: "slip" },
  { t: "香", kind: "seal" },
  { t: "钱", kind: "coin" },
] as const;

const LAY = [
  { left: "6%", delay: "0s", dur: "16s", rot: "-8deg", size: "sm" },
  { left: "18%", delay: "2.4s", dur: "18s", rot: "10deg", size: "md" },
  { left: "28%", delay: "7s", dur: "15s", rot: "-14deg", size: "sm" },
  { left: "39%", delay: "1.1s", dur: "20s", rot: "6deg", size: "lg" },
  { left: "51%", delay: "5.2s", dur: "17s", rot: "-4deg", size: "md" },
  { left: "62%", delay: "3.6s", dur: "19s", rot: "12deg", size: "sm" },
  { left: "73%", delay: "8.4s", dur: "16s", rot: "-11deg", size: "md" },
  { left: "84%", delay: "0.8s", dur: "21s", rot: "7deg", size: "sm" },
  { left: "12%", delay: "11s", dur: "18s", rot: "15deg", size: "lg" },
  { left: "46%", delay: "13s", dur: "15s", rot: "-9deg", size: "sm" },
  { left: "68%", delay: "9.5s", dur: "20s", rot: "4deg", size: "md" },
  { left: "90%", delay: "6s", dur: "17s", rot: "-6deg", size: "sm" },
] as const;

export function BlessRain() {
  return (
    <div className="bless-rain" aria-hidden>
      {GIFTS.map((g, i) => {
        const lay = LAY[i];
        return (
          <span
            key={`${g.t}-${i}`}
            className={`bless-bit bless-${g.kind} bless-${lay.size}`}
            style={{
              left: lay.left,
              animationDelay: lay.delay,
              animationDuration: lay.dur,
              ["--bit-rot" as string]: lay.rot,
            }}
          >
            {g.t}
          </span>
        );
      })}
    </div>
  );
}
