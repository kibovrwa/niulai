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
    title: "测你是哪种牛",
    lines: ["我刚测了牛来。", "你是核动力牛还是套死牛？"],
    url: publicUrl("/ce"),
  };
}

export function ceShare(from?: string): SharePayload {
  return {
    title: "测你是哪种牛",
    lines: from
      ? ["有人把牛相甩过来了。", "八题，测你是哪种牛，来对线。"]
      : ["测你是哪种牛。", "核动力、美股大海、套死。八题出结果。"],
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
    lines: [
      `我测出来是【${input.name}】`,
      `牛来指数 ${input.index}，击败 ${input.beat}% 散户`,
      input.punch,
      "你是哪种牛？来对线",
    ],
    url: publicUrl(`/ce?from=${input.code}`),
  };
}

export function wishShare(input: { serial: number; label: string; id: string }): SharePayload {
  return {
    title: `第${input.serial}号「${input.label}」`,
    lines: [
      `我向牛来许了「${input.label}」`,
      `第 ${input.serial} 号，神已收下`,
      "你也来贪一个",
    ],
    url: publicUrl(`/w/${input.id}`),
  };
}

export function lotShare(input: { rank: string; line: string }): SharePayload {
  return {
    title: `抽到【${input.rank}】`,
    lines: [`今日抽到【${input.rank}】`, input.line, "你也来一签"],
    url: publicUrl("/qian"),
  };
}

export function paiShare(input: { name?: string; bows: number }): SharePayload {
  return {
    title: "来牛来领香牌",
    lines: [
      input.name ? `我是${input.name}` : "我在牛来磕过了",
      `已叩 ${input.bows} 次。点三个还没测的`,
    ],
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
