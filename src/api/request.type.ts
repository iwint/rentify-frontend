type authRoutes = 'auth/register' | 'auth/sign-in'
type userRoutes<ID extends string> = 'user' | `user/favorite/${ID}` | 'user/favourites' | 'user/properties'
type listingsRoutes<ID extends string> = 'listings' | `listings/${ID}`
type reservationsRoutes<ID extends string> = 'reservations' | `reservations/${ID}/${ID}` | `reservations/${ID}`

export type Endpoints = authRoutes | listingsRoutes<string> | userRoutes<string> | reservationsRoutes<string>