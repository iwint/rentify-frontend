type authRoutes = 'auth/register' | 'auth/sign-in'
type userRoutes<ID extends string> = 'user' | `user/favorite/${ID}`
type listingsRoutes<ID extends string> = 'listings' | `listings/${ID}`
type reservationsRoutes = 'reservation'

export type Routes = authRoutes | listingsRoutes<string> | userRoutes<string> | reservationsRoutes