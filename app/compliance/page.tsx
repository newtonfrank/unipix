import Link from 'next/link'

export default function CompliancePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Compliance & Attribution</h1>
      <p>
        Unixpix displays images from Unsplash, Pexels, and Pixabay via their official APIs. Images are hotlinked from the providers’ CDNs and are not hosted on this site. Downloads are completed on the provider websites.
      </p>
      <h2>Attribution</h2>
      <ul>
        <li><strong>Unsplash:</strong> We attribute the photographer and Unsplash, and append UTM parameters to Unsplash profile and photo links.</li>
        <li><strong>Pexels:</strong> We show a prominent link to Pexels and credit the photographer with a link to the Pexels photo page when available.</li>
        <li><strong>Pixabay:</strong> We indicate that results come from Pixabay and link to the item page.</li>
      </ul>
      <h2>Downloads</h2>
      <p>
        For Unsplash items, clicking “Go to original” triggers the official download tracking endpoint and then redirects you to Unsplash. For Pexels and Pixabay, the button links to the canonical asset page or official download URL.
      </p>
      <h2>Terms / Licenses</h2>
      <ul>
        <li><a href="https://unsplash.com/documentation" target="_blank">Unsplash API Documentation</a></li>
        <li><a href="https://help.pexels.com" target="_blank">Pexels Help Center & API</a></li>
        <li><a href="https://pixabay.com/api/docs/" target="_blank">Pixabay API Docs</a></li>
      </ul>
      <p>
        If you are a content owner and have concerns, please reach out to the respective provider or contact us.
      </p>
    </div>
  )
}
