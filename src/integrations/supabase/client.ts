export const supabase: any = {
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: new Error('Supabase disabled') }),
        order: async () => ({ data: [], error: new Error('Supabase disabled') }),
        in: async () => ({ data: [], error: new Error('Supabase disabled') })
      }),
      order: async () => ({ data: [], error: new Error('Supabase disabled') })
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: new Error('Supabase disabled') })
      })
    }),
    update: () => ({
      eq: async () => ({ error: new Error('Supabase disabled') })
    }),
    delete: () => ({
      eq: async () => ({ error: new Error('Supabase disabled') })
    })
  }),
  rpc: async () => ({ error: new Error('Supabase disabled') }),
  storage: {
    from: () => ({
      upload: async () => ({ error: new Error('Supabase disabled') }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    })
  }
};
