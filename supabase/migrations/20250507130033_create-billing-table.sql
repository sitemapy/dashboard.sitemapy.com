create table
    billing (
        id uuid primary key default gen_random_uuid (),
        user_id uuid not null references auth.users (id) on delete cascade,
        plan text not null check (
            plan in ('unlimited', 'enterprise', 'teams', 'individual')
        ),
        cancelation_effective_at timestamptz,
        created_at timestamptz default now (),
        updated_at timestamptz default now ()
    );