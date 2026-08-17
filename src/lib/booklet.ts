import type { WishId, CowTypeId } from "@/lib/wish-data";

const KEY = "niulai.booklet.v1";

export type BookSlip = {
  id: string;
  serial: number;
  wishId: WishId;
  label: string;
  at: string;
};

export type SavedNbti = {
  letters: string;
  answers: string;
  name: string;
  index: number;
};

export type Booklet = {
  slips: BookSlip[];
  xiang?: CowTypeId;
  nbti?: SavedNbti;
};

function empty(): Booklet {
  return { slips: [] };
}

export function loadBooklet(): Booklet {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Booklet;
    return {
      slips: Array.isArray(parsed.slips) ? parsed.slips.slice(0, 36) : [],
      xiang: parsed.xiang,
      nbti: parsed.nbti,
    };
  } catch {
    return empty();
  }
}

export function saveBooklet(book: Booklet) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(book));
}

export function addSlip(slip: BookSlip) {
  const book = loadBooklet();
  if (book.slips.some((s) => s.id === slip.id)) return book;
  book.slips = [slip, ...book.slips].slice(0, 36);
  saveBooklet(book);
  return book;
}

export function saveXiang(id: CowTypeId) {
  const book = loadBooklet();
  book.xiang = id;
  saveBooklet(book);
  return book;
}

export function saveNbti(nbti: SavedNbti) {
  const book = loadBooklet();
  book.nbti = nbti;
  saveBooklet(book);
  return book;
}
