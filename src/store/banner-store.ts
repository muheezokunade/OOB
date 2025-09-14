import { create } from 'zustand'

interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  linkText?: string
  type: string
  category?: string
  priority: number
  isActive: boolean
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

interface BannerState {
  banners: Banner[]
  loading: boolean
  error: string | null
  fetchBanners: (type?: string, category?: string) => Promise<void>
  createBanner: (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateBanner: (id: string, banner: Partial<Banner>) => Promise<void>
  deleteBanner: (id: string) => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useBannerStore = create<BannerState>((set, get) => ({
  banners: [],
  loading: false,
  error: null,

  fetchBanners: async (type?: string, category?: string) => {
    set({ loading: true, error: null })
    try {
      const params = new URLSearchParams()
      if (type) params.append('type', type)
      if (category) params.append('category', category)
      params.append('active', 'true')

      const response = await fetch(`/api/banners?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch banners')
      }

      const banners = await response.json()
      set({ banners, loading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false })
    }
  },

  createBanner: async (bannerData) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        throw new Error('Not authenticated')
      }
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bannerData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create banner')
      }

      const newBanner = await response.json()
      set(state => ({ 
        banners: [...state.banners, newBanner], 
        loading: false 
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false })
    }
  },

  updateBanner: async (id, bannerData) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        throw new Error('Not authenticated')
      }
      const response = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bannerData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update banner')
      }

      const updatedBanner = await response.json()
      set(state => ({
        banners: state.banners.map(banner => 
          banner.id === id ? updatedBanner : banner
        ),
        loading: false
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false })
    }
  },

  deleteBanner: async (id) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        throw new Error('Not authenticated')
      }
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete banner')
      }

      set(state => ({
        banners: state.banners.filter(banner => banner.id !== id),
        loading: false
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false })
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}))


