import { useState } from "react";
import { addGongde } from "@/lib/gongde";
import { awardSeal } from "@/lib/seals";

const FACES = [
  {
    src: "/art/leopard.jpg",
    name: "路边豹",
    lines: [
      "先装饿。你一伸手，我就说自己在减肥。",
      "奶是你的。涨停是我的。这叫分工。",
      "研报第一句：今天也饿。",
    ],
  },
  {
    src: "/art/lark.jpg",
    name: "云雀",
    lines: [
      "我只负责看着。梦是你自己跳进去的。",
      "我在你账户里筑过巢。孵出来的是手续费。",
      "片尾曲不是止损。别跟着哼。",
    ],
  },
  {
    src: "/art/bull.jpg",
    name: "族里的牛",
    lines: [
      "他趴着的时候，妈就给起名了。你呢。",
      "倒了四次。第五次有人鼓掌。不是因为站起来。",
      "建模穿了。我还在。你也是。",
    ],
  },
];

export function Roadside() {
  const [said, setSaid] = useState<{ who: string; line: string } | null>(null);

  function talk(i: number) {
    const face = FACES[i];
    const line = face.lines[Math.floor(Math.random() * face.lines.length)];
    setSaid({ who: face.name, line });
    awardSeal("gossip");
    addGongde(2);
  }

  return (
    <section className="bg-grass px-4 py-12 text-paper sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-brush text-gold-soft">证人</p>
        <h2 className="mt-1 font-display text-3xl tracking-widest">点他们，听狗血</h2>
        <p className="mt-2 text-sm text-paper/70">豹要奶。云雀进梦。牛还趴着。点一张脸，功德 +2。</p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {FACES.map((f, i) => (
            <button
              key={f.name}
              type="button"
              onClick={() => talk(i)}
              className="overflow-hidden rounded-sm bg-ink/30 p-0 text-left"
            >
              <img
                src={f.src}
                alt={f.name}
                className="aspect-3/4 w-full object-cover object-top"
                loading="lazy"
                width={400}
                height={533}
              />
              <span className="block px-2 py-2 text-center text-xs text-gold-soft">{f.name}</span>
            </button>
          ))}
        </div>
        {said ? (
          <blockquote className="mt-6 rounded-sm bg-ink/40 px-4 py-4">
            <p className="text-base leading-relaxed">「{said.line}」</p>
            <footer className="mt-2 text-xs text-gold-soft">— {said.who}</footer>
          </blockquote>
        ) : (
          <p className="mt-6 text-sm text-paper/60">还没人开口。点豹，他最能装。</p>
        )}
      </div>
    </section>
  );
}
