import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Light check of the strings themselves (ts compiled not required).
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/lib/share.ts", import.meta.url), "utf8");
const bar = readFileSync(new URL("../src/components/share-bar.tsx", import.meta.url), "utf8");

const banned = [
  "点开就测",
  "马上出结果",
  "发出去的就是这几句",
  "链接只是尾巴",
  "来对线",
  "神已收下",
  "民间造神运动",
];
for (const w of banned) {
  assert.equal(src.includes(w), false, `share.ts still has “${w}”`);
  assert.equal(bar.includes(w), false, `share-bar still has “${w}”`);
}

assert.match(src, /我是【\$\{input\.name\}】/);
assert.match(src, /你也测一个/);
assert.match(src, /你也来/);
assert.match(bar, /复制去发/);

console.log("share-copy ok");
