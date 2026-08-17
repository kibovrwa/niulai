-- Folk totem wish ledger. Public incense slips — not per-user private data.
create table if not exists wishes (
  id         text primary key,
  serial     integer not null unique,
  nickname   text not null,
  category   text not null,
  message    text not null,
  cow_type   text not null,
  user_id    text,
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx on wishes (created_at desc);
create index if not exists wishes_category_idx on wishes (category);

create sequence if not exists wish_serial_seq start with 8888 increment by 1;
