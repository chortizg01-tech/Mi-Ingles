import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}

class SupabaseService {
  private client: SupabaseClient | null = null;
  private config: SupabaseConfig = {
    url: '',
    anonKey: '',
    isConnected: false
  };

  constructor() {
    this.initFromStorage();
  }

  private initFromStorage() {
    // Try env vars first, then localStorage
    const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
    const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

    const savedUrl = localStorage.getItem('mi_ingles_sb_url') || envUrl;
    const savedKey = localStorage.getItem('mi_ingles_sb_key') || envKey;

    if (savedUrl && savedKey) {
      try {
        this.client = createClient(savedUrl, savedKey);
        this.config = {
          url: savedUrl,
          anonKey: savedKey,
          isConnected: true
        };
      } catch (err) {
        console.warn('Failed to initialize Supabase client:', err);
      }
    }
  }

  public getClient(): SupabaseClient | null {
    return this.client;
  }

  public getConfig(): SupabaseConfig {
    return this.config;
  }

  public setConfig(url: string, anonKey: string): boolean {
    try {
      if (!url || !anonKey) {
        this.client = null;
        this.config = { url: '', anonKey: '', isConnected: false };
        localStorage.removeItem('mi_ingles_sb_url');
        localStorage.removeItem('mi_ingles_sb_key');
        return true;
      }

      this.client = createClient(url, anonKey);
      this.config = { url, anonKey, isConnected: true };
      localStorage.setItem('mi_ingles_sb_url', url);
      localStorage.setItem('mi_ingles_sb_key', anonKey);
      return true;
    } catch (err) {
      console.error('Error saving Supabase configuration:', err);
      return false;
    }
  }

  public isReady(): boolean {
    return this.client !== null && this.config.isConnected;
  }
}

export const supabaseService = new SupabaseService();
