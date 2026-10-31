import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Camera,
  Flower2,
  Heart,
  Menu,
  MessageCircle,
  Scissors,
  Sparkles,
  X,
} from 'lucide-react';

const whatsapp =
  'https://wa.me/917774003798?text=Hi%20Pradnya!%20I%20would%20love%20to%20order%20a%20handmade%20crochet%20piece.';
const instagram = 'https://www.instagram.com/sarved_crochet._';

type Product = {
  name: string;
  note: string;
  image: string;
  category: string;
};

const products: Product[] = [
  { name: 'Evil Eye', note: 'A tiny charm for good vibes', image: '/products/keychain-eye.jpg', category: 'Keychains' },
  { name: 'Sunny Daisy', note: 'A little flower to carry', image: '/products/keychain-flower.jpg', category: 'Keychains' },
  { name: 'Dreamy Tortoise', note: 'Slow steps, big dreams', image: '/products/keychain-tortoise.jpg', category: 'Keychains' },
  { name: 'Little Hero', note: 'For the hero in your heart', image: '/products/keychain-spider.jpg', category: 'Keychains' },
  { name: 'Pastel Pop', note: 'Small size, big smiles', image: '/products/keychain-ball.jpg', category: 'Keychains' },
  { name: 'Cuddly Kitty', note: 'Soft, sweet and pocket-sized', image: '/products/keychain-kitty.jpg', category: 'Keychains' },
  { name: 'Short Gajra', note: 'Everyday jasmine charm', image: '/products/gajra-short.jpg', category: 'Gajra' },
  { name: 'Long Gajra', note: 'Graceful festive blooms', image: '/products/gajra-long.jpg', category: 'Gajra' },
  { name: 'Gajra Scrunchie', note: 'A soft halo of flowers', image: '/products/gajra-scrunchie.jpg', category: 'Gajra' },
  { name: 'Sunflower Clips', note: 'A sunny pair for your hair', image: '/products/clip-sunflower.jpg', category: 'Hair' },
  { name: 'Lavender Clips', note: 'Dreamy lilac petals', image: '/products/clip-lavender.jpg', category: 'Hair' },
  { name: 'Daisy Clips', note: 'Fresh-picked, forever', image: '/products/clip-daisy.jpg', category: 'Hair' },
  { name: 'Red Bloom Clips', note: 'A bright little flourish', image: '/products/clip-red.jpg', category: 'Hair' },
  { name: 'Classic Thalposh', note: 'Warmth for your table', image: '/products/thalposh-classic.jpg', category: 'Home' },
  { name: 'Floral Coasters', note: 'Tiny gardens for your cup', image: '/products/coasters-floral.jpg', category: 'Home' },
  { name: 'Pink Petal Thalposh', note: 'A playful table bloom', image: '/products/thalposh-pink.jpg', category: 'Home' },
  { name: 'Leaf Thalposh', note: 'A handmade botanical accent', image: '/products/thalposh-leaf.jpg', category: 'Home' },
  { name: 'Pastel Bouquet', note: 'Flowers that stay forever', image: '/products/bouquet-pastel.jpg', category: 'Gifts' },
  { name: 'Crochet Purse', note: 'Small bag, big happiness', image: '/products/crochet-purse.jpg', category: 'Gifts' },
  { name: 'Bottle Holder', note: 'Carry a little handmade joy', image: '/products/bottle-holder.jpg', category: 'Gifts' },
];

const navItems = [
  ['Home', 'home'],
  ['Our Story', 'story'],
  ['Collections', 'collections'],
  ['Gallery', 'gallery'],
  ['Custom Orders', 'custom'],
  ['Contact', 'contact'],
];

function Logo() {
  return (
    <div className="brand-lockup">
      <span className="logo-mark" aria-hidden="true">
        <Heart size={18} fill="currentColor" />
      </span>
      <span>
        <b>SARVED</b>
        <small>CROCHET</small>
      </span>
    </div>
  );
}

function OrderLink({ children = 'DM to Order', className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <a className={`button button-primary ${className}`} href={whatsapp} target="_blank" rel="noreferrer">
      {children}
      <ArrowRight size={17} />
    </a>
  );
}

function Doodle({ className = '' }: { className?: string }) {
  return (
    <span className={`doodle-flower ${className}`} aria-hidden="true">
      <Flower2 />
    </span>
  );
}

function ProductCard({ product, tilt = '' }: { product: Product; tilt?: string }) {
  return (
    <motion.article className={`product-card ${tilt}`} whileHover={{ y: -8, rotate: 0 }} transition={{ duration: 0.25 }}>
      <div className="product-photo">
        <img src={product.image} alt={`${product.name} handmade crochet product`} />
        <span className="handmade-tag">handmade</span>
      </div>
      <div className="product-copy">
        <div>
          <h3>{product.name}</h3>
          <p>{product.note}</p>
        </div>
        <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`Order ${product.name}`}>
          DM <ArrowRight size={14} />
        </a>
      </div>
    </motion.article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<Product | null>(null);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const galleryItems = products.filter((product) => filter === 'All' || product.category === filter).slice(0, 12);

  return (
    <main>
      <header className="site-header">
        <a className="logo-link" href="#home" aria-label="Sarved Crochet home">
          <Logo />
        </a>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <OrderLink>Order Now</OrderLink>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-wash wash-one" />
        <div className="hero-wash wash-two" />
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15} /> Small stitches, big happiness</span>
          <h1>Little Loops,<br /><em>Endless Love.</em></h1>
          <p>Handcrafted happiness, one stitch at a time.</p>
          <div className="hero-actions">
            <OrderLink>Let&apos;s Create Something Beautiful</OrderLink>
            <a className="button button-quiet" href="#collections">Explore Our Collection</a>
          </div>
          <div className="maker-signature">
            <span>Made by</span>
            <strong>Pradnya Patil</strong>
            <Heart size={15} fill="currentColor" />
          </div>
        </div>

        <div className="hero-collage" aria-label="A selection of handmade crochet pieces">
          <motion.figure className="hero-card hero-card-main" initial={{ opacity: 0, y: 24, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ duration: 0.8 }}>
            <img src="/products/bouquet-pastel.jpg" alt="Pastel handmade crochet flower bouquet" />
          </motion.figure>
          <motion.figure className="hero-card hero-card-top" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <img src="/products/keychain-tortoise.jpg" alt="Crochet tortoise keychain" />
          </motion.figure>
          <motion.figure className="hero-card hero-card-bottom" animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <img src="/products/gajra-scrunchie.jpg" alt="Crochet gajra scrunchie" />
          </motion.figure>
          <span className="tape tape-one" />
          <span className="hero-note note-one">Made with love ♡</span>
          <span className="hero-note note-two">a little handmade magic</span>
          <Doodle className="flower-one" />
          <Doodle className="flower-two" />
          <Sparkles className="hero-sparkle" />
        </div>
      </section>

      <section className="marquee" aria-label="Brand qualities">
        <div>
          <span>Premium milk yarn</span><Flower2 />
          <span>Crocheted by hand</span><Heart />
          <span>Made to be yours</span><Sparkles />
          <span>Thoughtful gifting</span><Flower2 />
        </div>
      </section>

      <section className="story section-shell" id="story">
        <div className="story-images">
          <figure className="story-main-photo">
            <img src="/products/hairtie-daisy.jpg" alt="Handmade daisy crochet hair tie" />
            <figcaption>Every detail, made slowly.</figcaption>
          </figure>
          <figure className="story-small-photo">
            <img src="/products/crochet-purse.jpg" alt="Handmade floral crochet purse" />
          </figure>
          <span className="stitched-heart"><Heart fill="currentColor" /></span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">Our little story</span>
          <h2>A Little Story Behind <em>Every Stitch</em></h2>
          <p className="story-lead">What began with a hook, a bundle of soft yarn and a patient pair of hands grew into Sarved Crochet—a tiny world of keepsakes made by Pradnya Patil.</p>
          <div className="story-points">
            <div><span>01</span><p><b>Made slowly</b> with patience, creativity and individual attention.</p></div>
            <div><span>02</span><p><b>Softly crafted</b> in premium milk yarn, chosen for comfort and colour.</p></div>
            <div><span>03</span><p><b>Made meaningful</b> through thoughtful gifts and personal details.</p></div>
          </div>
          <p className="hand-note">“A little love lives in every loop.”</p>
        </div>
      </section>

      <section className="collections" id="collections">
        <div className="section-heading">
          <span className="eyebrow">Made for little joys</span>
          <h2>Explore Our <em>Collections</em></h2>
          <p>Sweet keepsakes, forever flowers and home accents—each one made by hand and full of personality.</p>
        </div>

        <div className="collection-chapter keychain-chapter">
          <div className="chapter-intro">
            <span className="chapter-number">01</span>
            <h3>Tiny Treasures</h3>
            <p>Cheerful crochet keychains made to bring a tiny smile wherever you go.</p>
            <a href={whatsapp} target="_blank" rel="noreferrer">Meet the little characters <ArrowRight size={16} /></a>
          </div>
          <div className="card-scroller">
            {products.slice(0, 6).map((product, index) => <ProductCard key={product.name} product={product} tilt={index % 2 ? 'tilt-right' : 'tilt-left'} />)}
          </div>
        </div>

        <div className="collection-chapter gajra-chapter">
          <div className="chapter-intro light">
            <span className="chapter-number">02</span>
            <h3>Forever Gajra</h3>
            <p>Traditional jasmine charm, reimagined in soft yarn for festive days and everyday beauty.</p>
          </div>
          <div className="gajra-layout">
            {products.slice(6, 9).map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
          <span className="chapter-note">flowers that never fade</span>
        </div>

        <div className="collection-chapter hair-chapter">
          <div className="hair-feature">
            <img src="/products/hairtie-sunflower.jpg" alt="Sunflower crochet hair tie" />
            <span>new little bloom</span>
          </div>
          <div className="chapter-intro">
            <span className="chapter-number">03</span>
            <h3>Wear a Little Garden</h3>
            <p>Floral clips and hair ties for soft, playful styling—available in colours made just for you.</p>
            <div className="mini-product-row">
              {products.slice(9, 13).map((product) => (
                <button key={product.name} onClick={() => setLightbox(product)}>
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="collection-chapter home-chapter">
          <div className="chapter-intro">
            <span className="chapter-number">04</span>
            <h3>Home, Softly Styled</h3>
            <p>Textural thalposh and coasters that turn a table into a warm little ritual.</p>
            <OrderLink>Customise a set</OrderLink>
          </div>
          <div className="home-mosaic">
            <figure className="mosaic-large"><img src="/products/thalposh-classic.jpg" alt="Classic crochet thalposh" /><figcaption>Classic Thalposh</figcaption></figure>
            <figure><img src="/products/coasters-floral.jpg" alt="Crochet flower coasters" /><figcaption>Floral Coasters</figcaption></figure>
            <figure><img src="/products/thalposh-leaf.jpg" alt="Leaf crochet thalposh" /><figcaption>Leaf Thalposh</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="magic">
        <div className="section-heading">
          <span className="eyebrow">The Sarved difference</span>
          <h2>Not Factory Made. <em>Heart Made.</em></h2>
        </div>
        <div className="magic-grid section-shell">
          {[
            [Scissors, 'Soft Milk Yarn', 'Beautiful texture, gentle touch and colours that stay joyful.'],
            [Heart, 'Handmade With Care', 'Every loop receives the attention only two hands can give.'],
            [Sparkles, 'Made To Be Yours', 'Choose your colours, flowers and sweet personal details.'],
          ].map(([Icon, title, text], index) => {
            const MagicIcon = Icon as typeof Heart;
            return (
              <motion.article key={String(title)} whileHover={{ y: -7 }} className={`magic-card magic-${index + 1}`}>
                <span className="magic-icon"><MagicIcon /></span>
                <span className="magic-number">0{index + 1}</span>
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
                <Doodle />
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="gallery section-shell" id="gallery">
        <div className="gallery-heading">
          <div>
            <span className="eyebrow">From our crochet journal</span>
            <h2>A Gallery of <em>Little Joys</em></h2>
          </div>
          <div className="filters" aria-label="Filter gallery">
            {['All', 'Keychains', 'Gajra', 'Hair', 'Home', 'Gifts'].map((item) => (
              <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>
            ))}
          </div>
        </div>
        <motion.div layout className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {galleryItems.map((product, index) => (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                className={`gallery-item gallery-item-${(index % 5) + 1}`}
                key={product.name}
                onClick={() => setLightbox(product)}
              >
                <img src={product.image} alt={product.name} />
                <span><b>{product.name}</b><small>{product.category}</small></span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="custom section-shell" id="custom">
        <div className="custom-visual">
          <img src="/products/bouquet-pastel.jpg" alt="Custom pastel crochet bouquet" />
          <span className="custom-sticker">made for<br /><b>you</b> ♡</span>
          <Doodle />
        </div>
        <div className="custom-copy">
          <span className="eyebrow">Custom orders are open</span>
          <h2>Dream It.<br /><em>We&apos;ll Crochet It.</em></h2>
          <p>Have a colour, flower or design in mind? Let&apos;s create something special together.</p>
          <ul>
            <li><Flower2 /> Custom colour combinations</li>
            <li><Heart /> Personalized designs</li>
            <li><Sparkles /> Gifting requests</li>
            <li><Scissors /> Matching product sets</li>
          </ul>
          <OrderLink>Chat about your idea</OrderLink>
        </div>
      </section>

      <section className="contact" id="contact">
        <Doodle className="contact-flower-one" />
        <Doodle className="contact-flower-two" />
        <div className="contact-inner">
          <span className="eyebrow">Come say hello</span>
          <h2>Let&apos;s Make Something <em>Beautiful</em></h2>
          <p>Tell Pradnya what you&apos;re dreaming of and she&apos;ll help bring it to life, one lovely loop at a time.</p>
          <div className="contact-details">
            <div><small>Maker</small><strong>Pradnya Patil</strong></div>
            <div><small>WhatsApp</small><strong>+91 77740 03798</strong></div>
            <div><small>Instagram</small><strong>@sarved_crochet._</strong></div>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Chat on WhatsApp</a>
            <a className="button button-outline" href={instagram} target="_blank" rel="noreferrer"><Camera /> Explore Instagram</a>
          </div>
        </div>
      </section>

      <footer>
        <Logo />
        <p>Handmade with love, one loop at a time.</p>
        <div className="footer-links">
          {navItems.slice(0, 5).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <div className="footer-social">
          <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera /></a>
          <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a>
        </div>
        <small>© {new Date().getFullYear()} Sarved Crochet. Made by hand in India.</small>
      </footer>

      <a className="floating-chat" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle />
        <span>Let&apos;s chat</span>
      </a>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-card" initial={{ y: 24, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.95 }} onClick={(event) => event.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X /></button>
              <img src={lightbox.image} alt={lightbox.name} />
              <div>
                <span className="eyebrow">{lightbox.category}</span>
                <h3>{lightbox.name}</h3>
                <p>{lightbox.note}. Lovingly handmade and available in custom colours.</p>
                <OrderLink>Ask about this piece</OrderLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
