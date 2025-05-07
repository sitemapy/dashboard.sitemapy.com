import { Database, Tables } from "@/database.types";
import { Button } from "@/ui";
import { RouteComponentProps } from "@reach/router";
import { createClient, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient<Database>(
  "http://127.0.0.1:54321",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
);

export const SupabaseRoute: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<Tables<"employees">[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getEmployees();
    getIsAuthenticated();
  }, []);

  async function signIn(params: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword(params);

    if (error) alert(error.message);

    setUser(data.user);
  }

  async function signUp(params: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        emailRedirectTo: "http://127.0.0.1:8000/welcome",
      },
    });

    if (error) alert(error.message);
    if (data.user) setUser(data.user);
  }

  async function updatePassword(params: { password: string }) {
    const { data, error } = await supabase.auth.updateUser({
      password: params.password,
    });

    if (error) alert(error.message);
    if (data.user) setUser(data.user);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) alert(error.message);

    setUser(null);
  }

  async function getIsAuthenticated() {
    const { data, error } = await supabase.auth.getSession();

    if (error) alert(error.message);

    setUser(data.session?.user ?? null);
  }

  async function getEmployees() {
    const { data, error } = await supabase.from("employees").select("*");

    if (error) console.error(error);

    setEmployees(data || []);
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://127.0.0.1:8000/authentication/google/callback",
      },
    });
  }

  async function createEmployee() {
    const { error } = await supabase.from("employees").insert({
      name: "John Doe",
      email: "john.doe@example.com",
    });

    if (error) {
      alert(error.message);
    } else {
      getEmployees();
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <div>
            <p>User ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <img src={user.user_metadata.avatar_url} alt="Avatar" />
          </div>
          <Button onClick={() => signOut()}>Sign Out</Button>
          <Button onClick={() => updatePassword({ password: "testtest" })}>
            Update Password
          </Button>
        </div>
      ) : (
        <>
          <Button
            onClick={() =>
              signUp({
                email: `services@sitemapy.com`,
                password: "testtest",
              })
            }
          >
            Sign Up
          </Button>
          <Button
            onClick={() =>
              signIn({ email: "services@sitemapy.com", password: "testtest" })
            }
          >
            Sign In
          </Button>
          <Button onClick={() => signInWithGoogle()}>
            Sign In With Google
          </Button>
        </>
      )}

      <ul>
        {employees.map((employee) => (
          <li key={employee.name}>{employee.name}</li>
        ))}
      </ul>
      <Button onClick={() => createEmployee()}>Create Employee</Button>
    </div>
  );
};
