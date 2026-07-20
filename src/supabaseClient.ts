import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://byhetipjiloesumtzxoq.supabase.co'
const supabaseAnonKey = 'sb_publishable_kcrX3eZGiIy5MDSArNorMA_JjW0K-FS'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)