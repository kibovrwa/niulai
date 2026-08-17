import { useState } from "react";
import { fireShare, type SharePayload } from "@/lib/share";

export function ShareBar({
  payload,
  onShared,
  saveLabel,
  onSave,
  saving,
  compact,
}: {
  payload: SharePayload;
  onShared?: () => void;
  saveLabel?: string;
  onSave?: () => void;
  saving?: boolean;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "shared" | "copied" | "failed">("idle");

  async function go() {
    const next = await fireShare(payload);
    setState(next);
    if (next === "shared" || next === "copied") onShared?.();
  }

  const label =
    state === "copied"
      ? "已复制 · 打开微信贴上"
      : state === "shared"
        ? "已唤起分享"
        : state === "failed"
          ? "没复制上，再点一次"
          : "复制这段去发";

  return (
    <div className="space-y-2">
      <div className="rounded-sm bg-paper-deep px-3 py-2.5 text-left text-ink">
        {!compact ? (
          <p className="text-[11px] tracking-widest text-cinnabar">发出去的就是这几句</p>
        ) : null}
        <p className={`whitespace-pre-wrap font-display leading-relaxed ${compact ? "text-sm" : "mt-2 text-base"}`}>
          {payload.lines.join("\n")}
        </p>
      </div>
      <button
        type="button"
        onClick={() => void go()}
        className="min-h-12 w-full touch-manipulation rounded-sm bg-cinnabar font-display text-lg tracking-widest text-paper"
      >
        {label}
      </button>
      {onSave ? (
        <button
          type="button"
          onClick={onSave}
          className="min-h-12 w-full touch-manipulation rounded-sm bg-wood font-display tracking-widest text-paper"
        >
          {saving ? "在出图…" : saveLabel ?? "保存这张图"}
        </button>
      ) : null}
      {compact ? null : (
        <p className="text-center text-[11px] leading-relaxed text-muted">
          链接只是尾巴。朋友先读上面那几句。
        </p>
      )}
    </div>
  );
}
