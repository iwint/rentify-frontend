type authRoutes = 'auth/register' | 'auth/sign-in'
type userRoutes<ID extends string> = 'user' | `user/favorite/${ID}`
type listingsRoutes = 'listings'

export type Routes = authRoutes | listingsRoutes | userRoutes<string>