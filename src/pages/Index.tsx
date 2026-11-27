import BannerSlider from "@/components/BannerSlider";
import PromoTicker from "@/components/PromoTicker";
import TrustRow from "@/components/TrustRow";
import ShopCatalog from "@/components/ShopCatalog";

const Index = () => (
  <main className="min-h-screen">
    <h1 className="sr-only">Baby-Boo Closet — modern kidswear and school uniforms in Ghana</h1>
    <BannerSlider />
    <PromoTicker />
    <TrustRow />
    <ShopCatalog
      title="Shop Our Favourites"
      subtitle="Fresh picks for school days, weekends and special occasions."
      headingLevel="h2"
      pageSize={10}
    />
  </main>
);

export default Index;
