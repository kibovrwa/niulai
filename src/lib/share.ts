export const SITE = "https://niulai.org";

export function publicUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE}${p}`;
}

export type SharePayload = {
  title: string;
  text: string;
  url: string;
};

/** WeChat-moments paste: identity first, one poke, then the link. */
export function packShare(payload: SharePayload) {
  return `${payload.text}\n${payload.url}`;
}

export function homeShare(): SharePayload {
  return {
    title: "测你是哪种牛",
    text: "我刚给牛来磕了一个。测你是核动力牛还是套死牛。八题，来对线。",
    url: publicUrl("/ce"),
  };
}

export function ceShare(from?: string): SharePayload {
  return {
    title: "测你的 NBTI",
    text: from
      ? "有人把牛相甩过来了。八题，测你是哪种牛，来对线。"
      : "八题测出你是哪种牛。核动力、美股大海、套死。测完来对线。",
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
    text: `我测出来是【${input.name}】NBTI·${input.code}\n牛来指数 ${input.index}，击败 ${input.beat}% 散户。${input.punch}\n你是哪种牛？来对线 →`,
    url: publicUrl(`/ce?from=${input.code}`),
  };
}

export function wishShare(input: { serial: number; label: string; id: string }): SharePayload {
  return {
    title: `第${input.serial}号「${input.label}」`,
    text: `我向牛来登记了「${input.label}」，第 ${input.serial} 号。神已收下。你也来贪一个 →`,
    url: publicUrl(`/w/${input.id}`),
  };
}

export function lotShare(input: { rank: string; line: string }): SharePayload {
  return {
    title: `抽到【${input.rank}】`,
    text: `【${input.rank}】${input.line}\n我在牛来图腾抽的。灵不灵以后说。你也来一签 →`,
    url: publicUrl("/qian"),
  };
}

export function paiShare(input: { name?: string; bows: number }): SharePayload {
  return {
    title: "来牛来领香牌",
    text: `${input.name ? `我是${input.name}。` : "我在牛来图腾磕过了。"}已叩 ${input.bows} 次。点三个还没测的，来领一张香牌 →`,
    url: publicUrl("/ce"),
  };
}

export async function fireShare(payload: SharePayload): Promise<"shared" | "copied" | "failed"> {
  const packed = packShare(payload);
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        url: payload.url,
      });
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(packed);
    return "copied";
  } catch {
    return "failed";
  }
}
