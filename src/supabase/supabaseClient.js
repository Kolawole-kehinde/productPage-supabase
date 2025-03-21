import { createClient } from "@supabase/supabase-js";



const supabaseUrl = 'https://oukiculeoxmdrroglrdo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a2ljdWxlb3htZHJyb2dscmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1OTEzOTgsImV4cCI6MjA1ODE2NzM5OH0.YCKpCB8dweXNzCOavm3ormB3zRV4VpeUdvrMshTWAws'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
