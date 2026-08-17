export function ShareShot({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-ink/90 px-5 pb-8 pt-16">
      <p className="text-center font-brush text-2xl text-gold-soft">长按图片保存</p>
      <p className="mt-1 text-center text-sm text-paper/80">再打开微信 → 发到朋友圈</p>
      <img
        src={src}
        alt="长按保存"
        className="mx-auto mt-5 max-h-[62dvh] w-full max-w-sm object-contain"
        style={{ outline: "none", WebkitTouchCallout: "default" }}
      />
      <p className="mt-4 text-center text-xs text-paper/60">手指按住图不放，选保存图片</p>
      <button
        type="button"
        onClick={onClose}
        className="mx-auto mt-5 min-h-11 px-6 font-display tracking-widest text-gold-soft"
      >
        关上
      </button>
    </div>
  );
}
