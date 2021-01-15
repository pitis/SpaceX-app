export interface Launch {
  id: string
  name: string
  imageUrl: string
  date_utc: Date
  success: string
  upcoming: boolean
  links: links
}

interface links {
  patch: {
    small: string
  }
}
