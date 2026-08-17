create table if not exists cult (
  k text primary key,
  n int not null default 0
);

insert into cult (k, n) values ('fire', 3188) on conflict (k) do nothing;
insert into cult (k, n) values ('casts', 0) on conflict (k) do nothing;
