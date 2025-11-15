import { Provider } from '@/lib/types'
import clsx from 'clsx'

export default function ProviderBadge({ provider }: { provider: Provider }) {
  const label = provider.charAt(0).toUpperCase() + provider.slice(1)
  const bg = {
    unsplash: 'bg-emerald-500/20 light:text-emerald-700 border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20',
    pexels: 'bg-sky-500/20 light:text-sky-700 border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200 dark:border-sky-500/20',
    pixabay: 'bg-fuchsia-500/20 light:text-fuchsia-700 border-fuchsia-500/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-200 dark:border-fuchsia-500/20'
  }[provider]

  return (
    <span className={clsx('text-xs px-2 py-1 rounded-full border', bg)}>
      {label}
    </span>
  )
}
