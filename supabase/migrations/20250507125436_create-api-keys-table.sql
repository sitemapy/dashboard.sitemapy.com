create table
    api_keys (
        organization_id uuid primary key references organizations (id) on delete cascade,
        key text unique not null,
        created_at timestamptz default now (),
        updated_at timestamptz default now ()
    );