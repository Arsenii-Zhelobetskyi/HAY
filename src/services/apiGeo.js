import { geoApi } from '@/utils/constants'
export async function getLocation() {
  try {
    const response = await fetch(`${geoApi}check?api_key=${import.meta.env.VITE_GEO_API_KEY}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching location:', error)
    throw new Error(error)
  }
}
