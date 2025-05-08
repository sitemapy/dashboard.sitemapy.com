import { Database } from "@/database.types";
import { ApiKeyEntity, SitemapLogEntity } from "@sitemapy/interfaces";
import { SupabaseClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { ApiRepository } from "./api.repository";

export class ApiRepositorySupabase implements ApiRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async fetch_logs(params: {
    organization_id: string;
    current_page: number;
    how_many_logs_per_page: number;
  }): ReturnType<ApiRepository["fetch_logs"]> {
    const start = (params.current_page - 1) * params.how_many_logs_per_page;
    const end = start + params.how_many_logs_per_page - 1;

    const {
      data: logs,
      error,
      count,
    } = await this.supabase
      .from("sitemap_logs")
      .select("*", { count: "exact" })
      .eq("organization_id", params.organization_id)
      .order("created_at", { ascending: false })
      .range(start, end);

    if (error) {
      return { error: true, code: error.message };
    }

    return {
      error: false,
      body: {
        logs: logs.map((log) => ({
          ...log,
          source: log.source as SitemapLogEntity["source"],
          created_at: new Date(log.created_at || new Date()),
          mode: log.mode as SitemapLogEntity["mode"],
        })),
        total_logs: count || 0,
        total_pages: Math.ceil((count || 0) / params.how_many_logs_per_page),
      },
    };
  }

  async reset_api_key(params: {
    organization_id: string;
  }): ReturnType<ApiRepository["reset_api_key"]> {
    const new_api_key = {
      key: nanoid(32),
      organization_id: params.organization_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const { error, data } = await this.supabase
      .from("api_keys")
      .update({
        key: new_api_key.key,
        updated_at: new_api_key.updated_at.toISOString(),
      })
      .eq("organization_id", params.organization_id)
      .select("*");

    if (error) {
      return { error: true, code: error.message };
    }

    if (!data || data.length === 0) {
      return {
        error: true,
        code: "RLS restrictions. You should not see this error.",
      };
    }

    return { error: false, body: { api_key: new_api_key } };
  }

  async create_api_key(params: {
    organization_id: string;
  }): Promise<RepositoryResponse<{ api_key: ApiKeyEntity }>> {
    const new_api_key = {
      key: nanoid(32),
      organization_id: params.organization_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const response = await this.supabase
      .from("api_keys")
      .insert(new_api_key)
      .select()
      .single();

    if (response.error) {
      return { error: true, code: response.error.message };
    }

    return {
      error: false,
      body: {
        api_key: {
          ...response.data,
          created_at: new Date(response.data.created_at || new Date()),
          updated_at: new Date(response.data.updated_at || new Date()),
        },
      },
    };
  }

  async fetch_api_key(params: {
    organization_id: string;
  }): ReturnType<ApiRepository["fetch_api_key"]> {
    const { data, error } = await this.supabase
      .from("api_keys")
      .select("*")
      .eq("organization_id", params.organization_id);

    if (error) {
      return { error: true, code: error.message };
    }

    if (data.length === 0) {
      return this.create_api_key({ organization_id: params.organization_id });
    }

    const api_key = data[0];

    return {
      error: false,
      body: {
        api_key: {
          ...api_key,
          created_at: new Date(api_key.created_at || new Date()),
          updated_at: new Date(api_key.updated_at || new Date()),
        },
      },
    };
  }
}
