// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://babpuofrmnltfaxizkbu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhYnB1b2ZybW5sdGZheGl6a2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTg0MzYsImV4cCI6MjA1NTkzNDQzNn0.aaDDySBu59wHJytb4MDtq7_iKKQ4pxfEUiePmQtdrmg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);