import { AccessibilityPanel } from "@/components/a11y/accessibility-panel";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPublicLayout } from "@/lib/public-content";

export default async function SiteLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return children;

  const [dict, layout] = await Promise.all([getDictionary(lang), getPublicLayout(lang)]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        {dict.common.skipToContent}
      </a>
      <SiteHeader lang={lang} dict={dict} navItems={layout.navItems} settings={layout.settings} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter
        lang={lang}
        dict={dict}
        footerGroups={layout.footerGroups}
        settings={layout.settings}
      />
      <AccessibilityPanel labels={dict.a11y} />
    </>
  );
}
