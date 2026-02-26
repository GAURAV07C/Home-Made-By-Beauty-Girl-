export interface HomeCardProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  category?: string;
  price?: string;
  imageSrc: string;
  imageAlt: string;
  buyHref: string;
  detailsHref: string;
  isStaticSoap?: boolean;
  isComingSoon?: boolean;
}
