import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yuywtsaoxolphscumfdz.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eXd0c2FveG9scGhzY3VtZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MTA3NjUsImV4cCI6MjAyOTM4Njc2NX0.nwUXyKOP53IyK4DLV5Rp6SSHzEwaULs5yzU8wqz3CFI'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
