export interface Launch {
  id: string
  name: string
  imageUrl: string
  information: string
  details: string
  success: boolean
  links: links
}

interface links {
  patch: {
    small: string
    large: string
  }
}
