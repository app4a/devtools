import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Google Analytics tracking ID - replace with your actual GA4 measurement ID
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-B8Z54KPNPX';

// Google Tag Manager ID - replace with your actual GTM ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

// Log page views to Google Analytics
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Log specific events to Google Analytics
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Hook to track page views
export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

// Google Analytics Script Component
export const GoogleAnalytics = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null; // Don't load analytics in development
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_location: window.location.href,
              page_title: document.title,
              send_page_view: true,
              // Enhanced ecommerce and user engagement
              custom_map: {
                'custom_parameter_1': 'tool_used',
                'custom_parameter_2': 'user_action'
              },
              // Privacy settings
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });

            // Custom events for developer tools
            window.trackToolUsage = function(toolName, action) {
              gtag('event', action, {
                event_category: 'Tool Usage',
                event_label: toolName,
                custom_parameter_1: toolName,
                custom_parameter_2: action
              });
            };

            window.trackPerformance = function(toolName, duration) {
              gtag('event', 'tool_performance', {
                event_category: 'Performance',
                event_label: toolName,
                value: duration,
                custom_parameter_1: toolName
              });
            };
          `,
        }}
      />
    </>
  );
};

// Google Tag Manager Script Component
export const GoogleTagManager = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
};

// NoScript fallback for GTM
export const GoogleTagManagerNoScript = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                  height="0" width="0" style="display:none;visibility:hidden">
          </iframe>
        `,
      }}
    />
  );
};

// Custom hook for tracking tool usage
export const useToolTracking = (toolName) => {
  const trackUsage = (action) => {
    if (typeof window !== 'undefined' && window.trackToolUsage) {
      window.trackToolUsage(toolName, action);
    }
  };

  const trackPerformance = (duration) => {
    if (typeof window !== 'undefined' && window.trackPerformance) {
      window.trackPerformance(toolName, duration);
    }
  };

  return { trackUsage, trackPerformance };
};

export default GoogleAnalytics;
