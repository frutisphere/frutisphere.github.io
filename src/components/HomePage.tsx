import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLevelTwoRecords, taxonomyById } from '../data/taxonomy';
import { getAssetUrl } from '../lib/assets';
import { Header } from './Header';
import { SiteFooter } from './SiteFooter';

const destinationOrder = ['frutiger-aero', 'vectordelia', 'more'];
const destinationArtwork: Record<string, string> = {
  'frutiger-aero': '/assets/level-2/frutiger-aero.png',
  vectordelia: '/assets/level-2/vectordelia.png',
  more: '/assets/level-2/more.png',
};
const destinations = getLevelTwoRecords().sort(
  (a, b) => destinationOrder.indexOf(a.id) - destinationOrder.indexOf(b.id),
);
const featuredEntries = ['frutiger-eco', 'dark-aero', 'cyber-glacier'].flatMap((id) => {
  const record = taxonomyById.get(id);
  return record ? [record] : [];
});

export function HomePage() {
  return (
    <div className="app-shell home-shell">
      <div className="aero-ribbon aero-ribbon-one" aria-hidden="true" />
      <div className="aero-ribbon aero-ribbon-two" aria-hidden="true" />
      <Header />
      <main className="home-page">
        <section className="portal-hero" aria-labelledby="home-heading">
          <div className="portal-hero-orbit" aria-hidden="true">
            <span />
          </div>
          <div className="home-logo-stage">
            <img
              className="home-logo-image"
              src={getAssetUrl('/assets/branding/frutisphere-logo.png')}
              alt="Frutisphere"
            />
          </div>
          <div className="home-hero-copy">
            <p className="eyebrow">Interactive visual atlas</p>
            <h1 id="home-heading">A visual atlas of the Frutiger ecosystem</h1>
            <p className="home-lead">
              Explore the connected visual world around Frutiger Aero through artwork,
              documented relationships, and an evolving community taxonomy.
            </p>
            <Link className="primary-action" to="/explore">
              Open the Atlas
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="home-band atlas-gateway" aria-labelledby="gateway-heading">
          <header className="home-section-heading">
            <div>
              <p className="eyebrow">Three visual regions</p>
              <h2 id="gateway-heading">Enter the atlas</h2>
            </div>
            <p>Begin with a family or browse the wider collection.</p>
          </header>
          <div className="destination-grid">
            {destinations.map((destination) => (
              <Link
                className="destination-link"
                key={destination.id}
                to={`/section/${destination.slug}`}
                aria-label={`Visit ${destination.name} atlas region`}
              >
                <img
                  src={getAssetUrl(destinationArtwork[destination.id] ?? destination.tileImage.src)}
                  alt={`${destination.name} tile artwork`}
                  draggable="false"
                />
                <span className="destination-label">
                  <strong>{destination.name}</strong>
                  <small>{destination.kind === 'Family' ? 'Aesthetic family' : 'More categories'}</small>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-band about-atlas" aria-labelledby="purpose-heading">
          <div className="about-atlas-copy">
            <p className="eyebrow">What is Frutisphere?</p>
            <h2 id="purpose-heading">A visual and documentation atlas</h2>
            <p>
              Frutisphere maps families, categories, subcategories, aliases, and relationships
              across the Frutiger ecosystem. It brings historical visual language and newer
              community classifications into one browsable reference without flattening their
              differences.
            </p>
          </div>
          <dl className="atlas-principles">
            <div>
              <dt>Explore visually</dt>
              <dd>Move from broad families into focused aesthetic pages.</dd>
            </div>
            <div>
              <dt>Follow relationships</dt>
              <dd>Trace aliases, crossovers, parentage, and related classifications.</dd>
            </div>
            <div>
              <dt>Document carefully</dt>
              <dd>Keep historical and community-origin material clearly distinguished.</dd>
            </div>
          </dl>
        </section>

        <section className="home-band featured-atlas" aria-labelledby="featured-heading">
          <header className="home-section-heading">
            <div>
              <p className="eyebrow">Featured in the atlas</p>
              <h2 id="featured-heading">Selected Frutiger Aero entries</h2>
            </div>
            <Link className="section-link" to="/section/frutiger-aero">
              View all 18
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </header>
          <div className="featured-strip">
            {featuredEntries.map((entry) => (
              <Link className="featured-entry" key={entry.id} to={`/aesthetic/${entry.slug}`}>
                <img src={getAssetUrl(entry.tileImage.src)} alt={entry.tileImage.alt} draggable="false" />
                <span>
                  <strong>{entry.name}</strong>
                  <small>{entry.status} &middot; {entry.origin}</small>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="community-horizon" aria-labelledby="community-heading">
          <div>
            <p className="eyebrow">On the horizon</p>
            <h2 id="community-heading">A future community around the atlas</h2>
          </div>
          <p>
            Planned community tools may eventually support accounts, submissions, galleries,
            and discussion. These systems are not active in the current release.
          </p>
          <span className="future-status">Planned for a later phase</span>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
