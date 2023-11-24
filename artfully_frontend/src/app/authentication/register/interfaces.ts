export interface User {
    id?: number
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    password?: string
    role?: string;
  }
  
  export interface AuthState {
    state: boolean
    userid: string
    username: string
    role: string
  }
  