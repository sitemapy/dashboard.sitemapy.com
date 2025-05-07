create table
    organizations (
        id uuid primary key default gen_random_uuid (),
        name text not null,
        created_at timestamptz default now (),
        updated_at timestamptz default now ()
    );