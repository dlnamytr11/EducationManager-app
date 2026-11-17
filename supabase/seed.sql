insert into public.courses (id, name)
values
  ('web', 'Веб-разработка'),
  ('algo', 'Алгоритмы и структуры данных'),
  ('design', 'Проектирование ПО'),
  ('history', 'История'),
  ('db', 'Базы данных')
on conflict (id) do update
set name = excluded.name;