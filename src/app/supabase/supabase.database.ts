import {InferSelectModel} from "drizzle-orm";
import {customers, files, folders, prices, products, subscriptions, users, workspaces} from "~/app/migrations/schema";

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            files: {
                Row: {
                    banner: string
                    created_at: string | null
                    data: string
                    folder_id: string | null
                    icon_id: string
                    id: string
                    in_trash: string
                    title: string
                    workspace_id: string | null
                }
                Insert: {
                    banner: string
                    created_at?: string | null
                    data: string
                    folder_id?: string | null
                    icon_id: string
                    id?: string
                    in_trash: string
                    title: string
                    workspace_id?: string | null
                }
                Update: {
                    banner?: string
                    created_at?: string | null
                    data?: string
                    folder_id?: string | null
                    icon_id?: string
                    id?: string
                    in_trash?: string
                    title?: string
                    workspace_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "files_folder_id_folders_id_fk"
                        columns: ["folder_id"]
                        isOneToOne: false
                        referencedRelation: "folders"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "files_workspace_id_workspaces_id_fk"
                        columns: ["workspace_id"]
                        isOneToOne: false
                        referencedRelation: "workspaces"
                        referencedColumns: ["id"]
                    },
                ]
            }
            folders: {
                Row: {
                    banner: string
                    created_at: string | null
                    data: string
                    icon_id: string
                    id: string
                    in_trash: string
                    title: string
                    workspace_id: string | null
                }
                Insert: {
                    banner: string
                    created_at?: string | null
                    data: string
                    icon_id: string
                    id?: string
                    in_trash: string
                    title: string
                    workspace_id?: string | null
                }
                Update: {
                    banner?: string
                    created_at?: string | null
                    data?: string
                    icon_id?: string
                    id?: string
                    in_trash?: string
                    title?: string
                    workspace_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "folders_workspace_id_workspaces_id_fk"
                        columns: ["workspace_id"]
                        isOneToOne: false
                        referencedRelation: "workspaces"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    avatar_url: string | null
                    billing_address: Json | null
                    email: string | null
                    full_name: string | null
                    id: string
                    payment_method: Json | null
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    billing_address?: Json | null
                    email?: string | null
                    full_name?: string | null
                    id: string
                    payment_method?: Json | null
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    billing_address?: Json | null
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    payment_method?: Json | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            workspaces: {
                Row: {
                    banner: string
                    created_at: string | null
                    data: string
                    icon_id: string
                    id: string
                    in_trash: string
                    logo: string
                    title: string
                    workspace_owner: string
                }
                Insert: {
                    banner: string
                    created_at?: string | null
                    data: string
                    icon_id: string
                    id?: string
                    in_trash: string
                    logo: string
                    title: string
                    workspace_owner: string
                }
                Update: {
                    banner?: string
                    created_at?: string | null
                    data?: string
                    icon_id?: string
                    id?: string
                    in_trash?: string
                    logo?: string
                    title?: string
                    workspace_owner?: string
                }
                Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
            | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
            Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
        ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
                Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsert<
    PublicTableNameOrOptions extends
            | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Insert: infer I
        }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
                Insert: infer I
            }
            ? I
            : never
        : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
            | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Update: infer U
        }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
                Update: infer U
            }
            ? U
            : never
        : never

export type Enums<
    PublicEnumNameOrOptions extends
            | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
        ? PublicSchema["Enums"][PublicEnumNameOrOptions]
        : never

type Workspace = InferSelectModel<typeof workspaces>;
type Folder = InferSelectModel<typeof folders>;
type File = InferSelectModel<typeof files>;
type User = InferSelectModel<typeof users>;
type Product = InferSelectModel<typeof products>;
type Price = InferSelectModel<typeof prices> & {products?: Product};
type Customers = InferSelectModel<typeof customers>;
type Subscription = InferSelectModel<typeof subscriptions> & {prices: Price};
type ProductWithPrice = Product & {
    prices?: Price[];
};

export type {
    Workspace,
    Folder,
    File,
    User,
    Product,
    Price,
    Customers,
    Subscription,
    ProductWithPrice
}
