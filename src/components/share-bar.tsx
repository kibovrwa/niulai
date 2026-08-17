import { useState } from "react";
import { fireShare, type SharePayload } from "@/lib/share";

export function ShareBar({
  payload,
  onShared,
  saveLabel,
  onSave,
  saving,
}: {
  payload: SharePayload;
  onShared?: () => void;
  saveLabel?: string;
  onSave?: () => void;
  saving?: boolean;
}) {
  const [state, setState] = useState<"idle" | "shared" | "copied" | "failed">("idle");

  async function go() {
    const next = await fireShare(payload);
    setState(next);
    if (next === "shared" || next === "copied") onShared?.();
  }

  const label =
    state === "copied"
      ? "文案已复制 · 去朋友圈贴"
      : state === "shared"
        ? "已唤起分享"
        : state === "failed"
          ? "再点一次分享"
          : "发朋友圈";

  return (
    <div className="space-y-2">
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
      <p className="text-center text-[11px] leading-relaxed text-muted">
        先出图，再发一句「我测出来是这个」。链接会带着你的牛相。
      </p>
    </div>
  );
}
