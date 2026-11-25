import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Test sırasında açılan tüm kutu, harita, kart ve sayaçları ilk açılışta sıfırla
const FRESH_RESET_FLAG = 'bekir_gizem_fresh_release_v2'
try {
  if (!window.localStorage.getItem(FRESH_RESET_FLAG)) {
    ;[
      'bekir_gizem_opened_gifts_v1',
      'bekir_gizem_discovery_map_v1',
      'bekir_gizem_redeemed_coupons_v1',
      'bekir_gizem_timeline_likes_v1',
      'bekir_gizem_hug_count_v1',
      'bekir_gizem_17_reasons_open_v1',
      'bekir_gizem_wish_jar_v1',
      'bekir_gizem_banner_photos_v1',
    ].forEach((k) => window.localStorage.removeItem(k))
    window.localStorage.setItem(FRESH_RESET_FLAG, '1')
  }
} catch {
  // ignore storage errors in private mode
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
