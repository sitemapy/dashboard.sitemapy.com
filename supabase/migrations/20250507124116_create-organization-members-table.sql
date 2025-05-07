create table
    organization_members (
        id uuid primary key default gen_random_uuid (),
        organization_id uuid not null references organizations (id) on delete cascade,
        user_id uuid not null references auth.users (id) on delete cascade,
        role text not null check (role in ('owner', 'admin', 'member')),
        created_at timestamptz default now (),
        updated_at timestamptz default now (),
        unique (user_id, organization_id)
    );