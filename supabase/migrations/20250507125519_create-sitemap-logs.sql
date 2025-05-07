create table
    sitemap_logs (
        id uuid primary key default gen_random_uuid (),
        organization_id uuid not null references organizations (id) on delete cascade,
        url text not null,
        number_of_sitemap_fetched integer not null,
        total_pages_in_sitemaps integer not null,
        fetching_duration integer not null,
        does_sitemap_contain_errors boolean not null,
        created_at timestamptz default now (),
        mode text check (
            mode in (
                'sitemap_tree',
                'pages_only',
                'sitemap_tree_with_pages'
            )
        ) default 'sitemap_tree',
        source text check (source in ('api', 'cron', 'web')) default 'web'
    );