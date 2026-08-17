export const SITE = "https://niulai.org";

export function publicUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE}${p}`;
}

export type SharePayload = {
  title: string;
  lines: string[];
  url: string;
};

/** What actually gets pasted into WeChat. Short. First person. A dare. */
export function packShare(payload: SharePayload) {
  return [...payload.lines, payload.url].join("\n");
}

export function homeShare(): SharePayload {
  return {
    title: "牛来许愿池",
    lines: ["来许一个", "号只增不减"],
    url: publicUrl("/ce"),
  };
}

export function ceShare(from?: string): SharePayload {
  return {
    title: "测你是哪种牛",
    lines: from
      ? ["有人把结果甩过来了", "你也测"]
      : ["测你是哪种牛", "核动力 / 美牛牛 / 牛跃亭"],
    url: publicUrl(from ? `/ce?from=${from}` : "/ce"),
  };
}

export function nbtiShare(input: {
  code: string;
  name: string;
  index: string;
  punch: string;
  beat: number;
}): SharePayload {
  return {
    title: `我是「${input.name}」`,
    lines: [`我是【${input.name}】`, input.punch, "你也测"],
    url: publicUrl(`/ce?from=${input.code}`),
  };
}

export function wishShare(input: { serial: number; label: string; id: string }): SharePayload {
  return {
    title: `第${input.serial}号「${input.label}」`,
    lines: [`许了「${input.label}」`, `第 ${input.serial} 号`, "你也来"],
    url: publicUrl(`/w/${input.id}`),
  };
}

export function lotShare(input: { rank: string; line: string }): SharePayload {
  return {
    title: `抽到【${input.rank}】`,
    lines: [`抽到【${input.rank}】`, input.line, "你也抽一支"],
    url: publicUrl("/qian"),
  };
}

export function repayShare(input: { serial: number; label: string; id: string }): SharePayload {
  return {
    title: `第${input.serial}号灵了`,
    lines: [`第${input.serial}号「${input.label}」灵了`, "我来还愿", "你也去许一个"],
    url: publicUrl(`/w/${input.id}`),
  };
}

export function paiShare(input: { name?: string; bows: number }): SharePayload {
  return {
    title: "测你是哪种牛",
    lines: [input.name ? `我是${input.name}` : "我测过了", "你们也来"],
    url: publicUrl("/ce"),
  };
}

export async function fireShare(payload: SharePayload): Promise<"shared" | "copied" | "failed"> {
  const packed = packShare(payload);
  // WeChat keeps the pasted 文案. The system share sheet often drops it
  // and only sends the link, so clipboard is the real path.
  try {
    await navigator.clipboard.writeText(packed);
  } catch {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.lines.join("\n"),
          url: payload.url,
        });
        return "shared";
      } catch {
        return "failed";
      }
    }
    return "failed";
  }
  return "copied";
}
