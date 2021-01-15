export interface Launch {
  id: string
  name: string
  imageUrl: string
  information: string
  success: boolean
  links: links
  date_utc: Date
}

interface links {
  patch: {
    small: string
    large: string
  }
}
