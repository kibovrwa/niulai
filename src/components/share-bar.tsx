import { useState } from "react";
import { fireShare, type SharePayload } from "@/lib/share";

export function ShareBar({
  payload,
  onShared,
  saveLabel,
  onSave,
  saving,
  compact,
  hideSlip,
}: {
  payload: SharePayload;
  onShared?: () => void;
  saveLabel?: string;
  onSave?: () => void;
  saving?: boolean;
  compact?: boolean;
  hideSlip?: boolean;
}) {
  const [state, setState] = useState<"idle" | "shared" | "copied" | "failed">("idle");

  async function go() {
    const next = await fireShare(payload);
    setState(next);
    if (next === "shared" || next === "copied") onShared?.();
  }

  const label =
    state === "copied"
      ? "已复制，去微信贴"
      : state === "shared"
        ? "已发出"
        : state === "failed"
          ? "再点一次"
          : "复制去发";

  return (
    <div className="space-y-2">
      {hideSlip ? null : (
        <div className="rounded-sm bg-paper-deep px-3 py-2.5 text-left text-ink">
          <p className={`whitespace-pre-wrap font-display leading-relaxed ${compact ? "text-sm" : "text-base"}`}>
            {payload.lines.join("\n")}
          </p>
        </div>
      )}
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
    </div>
  );
}
