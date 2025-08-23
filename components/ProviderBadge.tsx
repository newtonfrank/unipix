import { Provider } from '@/lib/types'
import clsx from 'clsx'

export default function ProviderBadge({ provider }: { provider: Provider }) {
  const label = provider.charAt(0).toUpperCase() + provider.slice(1)
  const bg = {
    unsplash: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    pexels: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    pixabay: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30'
  }[provider]

  return (
    <span className={clsx('text-xs px-2 py-1 rounded-full border', bg)}>
      {label}
    </span>
  )
}
