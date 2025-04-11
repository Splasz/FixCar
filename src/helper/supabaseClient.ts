import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qmbvzpikzlbzzlcctcnb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtYnZ6cGlremxienpsY2N0Y25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNjQ0NzQsImV4cCI6MjA1OTk0MDQ3NH0.o7fotq-xjRCaoRWHH46MXvO4CtPUTwOWxhAZhFOoFoY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
