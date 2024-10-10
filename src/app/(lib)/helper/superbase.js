const { createClient } = require("@supabase/supabase-js");

const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL;
const superbaseApiKey= process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, superbaseApiKey);