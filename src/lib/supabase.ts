import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dWtza2RydmR2bW1sYW94cXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMDY5OTMsImV4cCI6MjAzNzU4Mjk5M30.o3HmJx4DF9xOWuxGQ0SaiJH2_9zifVaRlEWhNjD0rc0" 
// process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY




export const supabase = createClient("https://iwukskdrvdvmmlaoxqtz.supabase.co", supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})