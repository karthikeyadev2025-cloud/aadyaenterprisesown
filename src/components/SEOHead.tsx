import { useEffect } from 'react';
import { SEO_CONFIG } from '../config/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

export default function SEOHead({
  title = SEO_CONFIG.defaultTitle,
  description = SEO_CONFIG.defaultDescription,
  keywords = SEO_CONFIG.keywords,
  canonical = SEO_CONFIG.siteUrl,
  ogImage = '/og-image.jpg',
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));

    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', SEO_CONFIG.openGraph.type, 'property');
    updateMetaTag('og:url', canonical, 'property');
    updateMetaTag('og:image', `${SEO_CONFIG.siteUrl}${ogImage}`, 'property');
    updateMetaTag('og:locale', SEO_CONFIG.openGraph.locale, 'property');
    updateMetaTag('og:site_name', SEO_CONFIG.siteName, 'property');

    updateMetaTag('twitter:card', SEO_CONFIG.twitter.card);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${SEO_CONFIG.siteUrl}${ogImage}`);

    updateMetaTag('geo.region', 'IN-AP');
    updateMetaTag('geo.placename', 'Guntur');
    updateMetaTag('geo.position', `${SEO_CONFIG.business.geo.latitude};${SEO_CONFIG.business.geo.longitude}`);
    updateMetaTag('ICBM', `${SEO_CONFIG.business.geo.latitude}, ${SEO_CONFIG.business.geo.longitude}`);

    updateMetaTag('author', SEO_CONFIG.business.owner);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('bingbot', 'index, follow');

    updateLinkTag('canonical', canonical);

    const structuredData = generateStructuredData();
    updateStructuredData(structuredData);
  }, [title, description, keywords, canonical, ogImage]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function updateStructuredData(data: any) {
  let script = document.querySelector('script[type="application/ld+json"]');

  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

function generateStructuredData() {
  const { business } = SEO_CONFIG;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SEO_CONFIG.siteUrl}/#organization`,
        name: business.name,
        alternateName: business.owner,
        url: SEO_CONFIG.siteUrl,
        logo: `${SEO_CONFIG.siteUrl}/logo.png`,
        description: business.description,
        telephone: business.telephone,
        email: business.email,
        priceRange: business.priceRange,
        address: {
          '@type': 'PostalAddress',
          streetAddress: business.address.streetAddress,
          addressLocality: business.address.addressLocality,
          addressRegion: business.address.addressRegion,
          postalCode: business.address.postalCode,
          addressCountry: business.address.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        },
        areaServed: [
          ...SEO_CONFIG.localAreas.map(area => ({
            '@type': 'City',
            name: area,
            containedInPlace: {
              '@type': 'State',
              name: 'Andhra Pradesh',
              containedInPlace: {
                '@type': 'Country',
                name: 'India',
              },
            },
          })),
          {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: business.areaServed.geoMidpoint.latitude,
              longitude: business.areaServed.geoMidpoint.longitude,
            },
            geoRadius: business.areaServed.geoRadius,
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Solar & CCTV Services',
          itemListElement: business.services.map((service, index) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service,
              serviceType: service,
            },
            position: index + 1,
          })),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '150',
          bestRating: '5',
          worstRating: '1',
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': `${SEO_CONFIG.siteUrl}/#website`,
        url: SEO_CONFIG.siteUrl,
        name: SEO_CONFIG.siteName,
        description: SEO_CONFIG.defaultDescription,
        publisher: {
          '@id': `${SEO_CONFIG.siteUrl}/#organization`,
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SEO_CONFIG.siteUrl}/?s={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
      {
        '@type': 'Person',
        '@id': `${SEO_CONFIG.siteUrl}/#person`,
        name: business.owner,
        jobTitle: 'Managing Director',
        worksFor: {
          '@id': `${SEO_CONFIG.siteUrl}/#organization`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SEO_CONFIG.siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SEO_CONFIG.siteUrl,
          },
        ],
      },
    ],
  };
}
