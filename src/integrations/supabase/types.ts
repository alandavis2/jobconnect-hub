export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      adjustments: {
        Row: {
          branch_id: string
          created_at: string
          id: string
          owner_id: string
          product_name: string
          quantity_change: number
          reason: string | null
        }
        Insert: {
          branch_id: string
          created_at?: string
          id?: string
          owner_id: string
          product_name: string
          quantity_change: number
          reason?: string | null
        }
        Update: {
          branch_id?: string
          created_at?: string
          id?: string
          owner_id?: string
          product_name?: string
          quantity_change?: number
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "adjustments_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          created_at: string
          id: string
          location: string | null
          manager: string | null
          name: string
          owner_id: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          manager?: string | null
          name: string
          owner_id: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          manager?: string | null
          name?: string
          owner_id?: string
          phone?: string | null
        }
        Relationships: []
      }
      goods_received: {
        Row: {
          created_at: string
          id: string
          invoice_number: string
          notes: string | null
          owner_id: string
          received_by: string | null
          received_date: string
          supplier_id: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string
          id?: string
          invoice_number: string
          notes?: string | null
          owner_id: string
          received_by?: string | null
          received_date?: string
          supplier_id?: string | null
          total_amount?: number
        }
        Update: {
          created_at?: string
          id?: string
          invoice_number?: string
          notes?: string | null
          owner_id?: string
          received_by?: string | null
          received_date?: string
          supplier_id?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "goods_received_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      goods_received_items: {
        Row: {
          category: string | null
          expiry_date: string | null
          goods_received_id: string
          id: string
          owner_id: string
          product_name: string
          quantity: number
          rate: number
          total: number
          unit: string | null
        }
        Insert: {
          category?: string | null
          expiry_date?: string | null
          goods_received_id: string
          id?: string
          owner_id: string
          product_name: string
          quantity: number
          rate?: number
          total?: number
          unit?: string | null
        }
        Update: {
          category?: string | null
          expiry_date?: string | null
          goods_received_id?: string
          id?: string
          owner_id?: string
          product_name?: string
          quantity?: number
          rate?: number
          total?: number
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goods_received_items_goods_received_id_fkey"
            columns: ["goods_received_id"]
            isOneToOne: false
            referencedRelation: "goods_received"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          address: string | null
          alt_phone: string | null
          bank_account: string | null
          city: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          gst_number: string | null
          id: string
          ifsc: string | null
          name: string
          notes: string | null
          owner_id: string
          phone: string | null
          product_categories: string[] | null
          status: string
        }
        Insert: {
          address?: string | null
          alt_phone?: string | null
          bank_account?: string | null
          city?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          gst_number?: string | null
          id?: string
          ifsc?: string | null
          name: string
          notes?: string | null
          owner_id: string
          phone?: string | null
          product_categories?: string[] | null
          status?: string
        }
        Update: {
          address?: string | null
          alt_phone?: string | null
          bank_account?: string | null
          city?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          gst_number?: string | null
          id?: string
          ifsc?: string | null
          name?: string
          notes?: string | null
          owner_id?: string
          phone?: string | null
          product_categories?: string[] | null
          status?: string
        }
        Relationships: []
      }
      transfer_items: {
        Row: {
          branch_id: string
          id: string
          owner_id: string
          product_name: string
          quantity: number
          transfer_id: string
        }
        Insert: {
          branch_id: string
          id?: string
          owner_id: string
          product_name: string
          quantity: number
          transfer_id: string
        }
        Update: {
          branch_id?: string
          id?: string
          owner_id?: string
          product_name?: string
          quantity?: number
          transfer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transfer_items_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_items_transfer_id_fkey"
            columns: ["transfer_id"]
            isOneToOne: false
            referencedRelation: "transfers"
            referencedColumns: ["id"]
          },
        ]
      }
      transfers: {
        Row: {
          branch_id: string
          created_at: string
          id: string
          notes: string | null
          owner_id: string
          transfer_date: string
          transferred_by: string | null
        }
        Insert: {
          branch_id: string
          created_at?: string
          id?: string
          notes?: string | null
          owner_id: string
          transfer_date?: string
          transferred_by?: string | null
        }
        Update: {
          branch_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          owner_id?: string
          transfer_date?: string
          transferred_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transfers_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
