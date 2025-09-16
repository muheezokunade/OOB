import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  avatar?: string
  createdAt: string
  updatedAt: string
  isEmailVerified: boolean
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    language: 'en' | 'yo'
    currency: 'NGN' | 'USD'
  }
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  isDefault: boolean
  firstName: string
  lastName: string
  phone: string
  street: string
  city: string
  state: string
  country: string
  postalCode?: string
  additionalInfo?: string
}

interface AuthState {
  // User state
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Addresses
  addresses: Address[]
  
  // UI state
  showAuthModal: boolean
  authMode: 'login' | 'register' | 'forgot-password'
  
  // Error handling
  error: string | null
}

interface AuthActions {
  // Authentication
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  
  // User management
  updateProfile: (userData: Partial<User>) => Promise<void>
  uploadAvatar: (file: File) => Promise<void>
  verifyEmail: (token: string) => Promise<void>
  
  // Address management
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>
  deleteAddress: (id: string) => Promise<void>
  setDefaultAddress: (id: string) => Promise<void>
  
  // UI actions
  openAuthModal: (mode?: 'login' | 'register' | 'forgot-password') => void
  closeAuthModal: () => void
  setAuthMode: (mode: 'login' | 'register' | 'forgot-password') => void
  clearError: () => void
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

// Mock API functions (replace with actual API calls)
const mockApiCall = <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional failures
      if (Math.random() > 0.9) {
        reject(new Error('Network error occurred'))
        return
      }
      resolve(data)
    }, delay)
  })
}

const generateId = () => Math.random().toString(36).substr(2, 9)

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      addresses: [],
      showAuthModal: false,
      authMode: 'login',
      error: null,

      // Authentication actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        
        try {
          // Mock user data
          const userData: User = {
            id: generateId(),
            email,
            firstName: 'Demo',
            lastName: 'User',
            phone: '+234 812 345 6789',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isEmailVerified: true,
            preferences: {
              newsletter: true,
              smsNotifications: false,
              language: 'en',
              currency: 'NGN'
            }
          }
          
          await mockApiCall(userData)
          
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            showAuthModal: false,
            error: null
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          })
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null })
        
        try {
          const user: User = {
            id: generateId(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isEmailVerified: false,
            preferences: {
              newsletter: true,
              smsNotifications: false,
              language: 'en',
              currency: 'NGN'
            }
          }
          
          await mockApiCall(user)
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            showAuthModal: false,
            error: null
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed'
          })
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          addresses: [],
          error: null
        })
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null })
        
        try {
          await mockApiCall({ success: true })
          set({ isLoading: false })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Password reset failed'
          })
        }
      },

      resetPassword: async (token: string, password: string) => {
        set({ isLoading: true, error: null })
        
        try {
          await mockApiCall({ success: true })
          set({ isLoading: false })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Password reset failed'
          })
        }
      },

      // User management
      updateProfile: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null })
        
        try {
          const currentUser = get().user
          if (!currentUser) throw new Error('Not authenticated')
          
          const updatedUser = {
            ...currentUser,
            ...userData,
            updatedAt: new Date().toISOString()
          }
          
          await mockApiCall(updatedUser)
          
          set({
            user: updatedUser,
            isLoading: false
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Profile update failed'
          })
        }
      },

      uploadAvatar: async (file: File) => {
        set({ isLoading: true, error: null })
        
        try {
          // Mock file upload
          const avatarUrl = URL.createObjectURL(file)
          await mockApiCall({ avatarUrl })
          
          const currentUser = get().user
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                avatar: avatarUrl,
                updatedAt: new Date().toISOString()
              },
              isLoading: false
            })
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Avatar upload failed'
          })
        }
      },

      verifyEmail: async (token: string) => {
        set({ isLoading: true, error: null })
        
        try {
          await mockApiCall({ success: true })
          
          const currentUser = get().user
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                isEmailVerified: true,
                updatedAt: new Date().toISOString()
              },
              isLoading: false
            })
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Email verification failed'
          })
        }
      },

      // Address management
      addAddress: async (addressData: Omit<Address, 'id'>) => {
        set({ isLoading: true, error: null })
        
        try {
          const newAddress: Address = {
            ...addressData,
            id: generateId()
          }
          
          await mockApiCall(newAddress)
          
          const addresses = get().addresses
          set({
            addresses: [...addresses, newAddress],
            isLoading: false
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to add address'
          })
        }
      },

      updateAddress: async (id: string, addressData: Partial<Address>) => {
        set({ isLoading: true, error: null })
        
        try {
          await mockApiCall({ success: true })
          
          const addresses = get().addresses
          const updatedAddresses = addresses.map(addr =>
            addr.id === id ? { ...addr, ...addressData } : addr
          )
          
          set({
            addresses: updatedAddresses,
            isLoading: false
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to update address'
          })
        }
      },

      deleteAddress: async (id: string) => {
        set({ isLoading: true, error: null })
        
        try {
          await mockApiCall({ success: true })
          
          const addresses = get().addresses
          const updatedAddresses = addresses.filter(addr => addr.id !== id)
          
          set({
            addresses: updatedAddresses,
            isLoading: false
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to delete address'
          })
        }
      },

      setDefaultAddress: async (id: string) => {
        set({ isLoading: true, error: null })
        
        try {
          await mockApiCall({ success: true })
          
          const addresses = get().addresses
          const updatedAddresses = addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
          }))
          
          set({
            addresses: updatedAddresses,
            isLoading: false
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to set default address'
          })
        }
      },

      // UI actions
      openAuthModal: (mode = 'login') => {
        set({ showAuthModal: true, authMode: mode, error: null })
      },

      closeAuthModal: () => {
        set({ showAuthModal: false, error: null })
      },

      setAuthMode: (mode) => {
        set({ authMode: mode, error: null })
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        addresses: state.addresses
      })
    }
  )
)





