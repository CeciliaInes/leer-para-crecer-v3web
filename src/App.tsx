import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { bannerImages, galleryImages, localPosts } from './data'
import { fetchPost, fetchPosts, sanityEnabled, sanityImage, type Post } from './lib/sanity'

const navItems = [
  ['Inicio', '/'],
  ['Quiénes somos', '/quienes-somos'],
  ['Qué hacemos', '/que-hacemos'],
  ['Impacto', '/impacto'],
  ['Galería', '/galeria'],
  ['Historias', '/historias'],
]

function Arrow() { return <span aria-hidden="true">→</span> }
function Leaf({ className = '' }: { className?: string }) { return <span className={`leaf ${className}`} aria-hidden="true">✦</span> }

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="Leer para crecer, inicio">
          <img src="/logo.png" alt="Leer para crecer" />
        </Link>
        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <Link className="nav-cta mobile-cta" to="/colabora" onClick={() => setOpen(false)}>Quiero colaborar <Arrow /></Link>
        </nav>
        <Link className="nav-cta desktop-cta" to="/colabora">Quiero colaborar <Arrow /></Link>
        <button className="menu-button" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div>
        <img className="footer-logo" src="/logo.png" alt="Leer para crecer" />
        <p className="footer-quote">Donde nace un lector, crece una esperanza.</p>
      </div>
      <div><p className="footer-label">Explora</p>{navItems.map(([l,p]) => <Link key={p} to={p}>{l}</Link>)}<Link to="/colabora">Colabora</Link></div>
      <div><p className="footer-label">Conecta</p><p>Lima, Perú</p><p>Una biblioteca que crece con su comunidad.</p></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Leer para crecer</span><span>Libros · Comunidad · Oportunidades</span></div>
  </footer>
}

function Layout({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>
}

function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'light' : ''}`}>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {text && <p className="lead">{text}</p>}
  </div>
}

function PhotoBanner() {
  return <section className="photo-banner">
    <div className="photo-grid">
      {bannerImages.map((src, i) => <img key={src} src={src} alt={`Leer para crecer, fotografía ${i + 1}`} loading={i > 0 ? 'lazy' : 'eager'} />)}
    </div>
    <div className="photo-banner-overlay">
      <span className="pill">HISTORIAS QUE INSPIRAN</span>
      <h2>Aquí los libros<br /><em>cobran vida.</em></h2>
      <p>Espacios donde leer también significa encontrarse, imaginar y crecer juntos.</p>
      <Link className="button button-light" to="/galeria">Ver nuestra galería <Arrow /></Link>
    </div>
  </section>
}

function MissionStrip() {
  return <section className="mission-strip">
    <div className="container mission-grid">
      <div><p className="eyebrow">Nuestra misión</p><h2>Más que una biblioteca,<br /><em>un movimiento.</em></h2></div>
      <div><p>En la periferia de nuestra ciudad, el acceso a la lectura no debería ser un privilegio, sino un derecho.</p><p>Leer para crecer nace para derribar barreras y construir refugios de conocimiento, imaginación y comunidad.</p><Link className="text-link" to="/quienes-somos">Conoce nuestra historia <Arrow /></Link></div>
    </div>
  </section>
}

function WhatWeDo() {
  const cards = [
    ['01','Bibliotecas comunitarias','Recuperamos espacios para convertirlos en centros culturales vibrantes y cercanos.'],
    ['02','Fomento a la lectura','Creamos programas dinámicos que convierten la lectura en una experiencia activa.'],
    ['03','Tejido social','Hacemos de cada biblioteca un punto de encuentro para familias y comunidades.'],
  ]
  return <section className="what-we-do section">
    <div className="container"><SectionHeading eyebrow="Lo que hacemos" title="Abrimos puertas a nuevos mundos." text="Cada biblioteca es un lugar para leer, conversar, crear y sentirse parte." />
      <div className="service-grid">{cards.map(([n,t,d]) => <article className="service-card" key={n}><span className="number">{n}</span><div className="service-icon">{n === '01' ? '📚' : n === '02' ? '✨' : '🌱'}</div><h3>{t}</h3><p>{d}</p><span className="card-arrow"><Arrow /></span></article>)}</div>
    </div>
  </section>
}

function ImpactPreview() {
  return <section className="impact-preview">
    <div className="container impact-inner">
      <div><p className="eyebrow light-eyebrow">Nuestro impacto</p><h2>Pequeños espacios.<br /><em>Grandes futuros.</em></h2><p>Estamos construyendo una red de lectura donde antes había barreras.</p></div>
      <div className="stats">
        <div><strong>02</strong><span>Bibliotecas<br />inauguradas</span></div>
        <div><strong>02</strong><span>Publicaciones con<br />más de 40 niños</span></div>
        <div><strong>200</strong><span>Vidas impactadas<br />directamente</span></div>
      </div>
    </div>
  </section>
}

function GalleryPreview() {
  const picks = [galleryImages[3], galleryImages[12], galleryImages[48], galleryImages[64]]
  return <section className="gallery-preview section">
    <div className="container"><SectionHeading eyebrow="Nuestros momentos" title="Una biblioteca también se construye con sonrisas." text="Mira algunos de los encuentros que hacen crecer esta historia." />
      <div className="preview-mosaic">{picks.map((item, i) => <Link to="/galeria" className={`mosaic-item mosaic-${i + 1}`} key={item.id}><img src={item.src} alt={item.caption} loading="lazy" /><span>{item.caption}</span></Link>)}</div>
      <div className="center-button"><Link className="button button-outline" to="/galeria">Ver todas las fotos <Arrow /></Link></div>
    </div>
  </section>
}

function StoriesPreview() {
  const [posts, setPosts] = useState<Post[]>(localPosts)
  useEffect(() => { fetchPosts().then(data => { if (data.length) setPosts(data.slice(0,3)) }) }, [])
  return <section className="stories-preview section-soft">
    <div className="container"><div className="section-heading-row"><SectionHeading eyebrow="Historias" title="Lo que está pasando en nuestra comunidad." /><Link className="text-link" to="/historias">Ver todas <Arrow /></Link></div>
      <div className="post-grid">{posts.map(post => <PostCard post={post} key={post._id} />)}</div>
      {!sanityEnabled && <p className="cms-note">Vista de demostración: conecta Sanity para publicar estas historias desde el celular.</p>}
    </div>
  </section>
}

function PostCard({ post }: { post: Post }) {
  const image = typeof post.coverImage === 'string' ? post.coverImage : sanityImage(post.coverImage)
  return <Link to={`/historias/${post.slug.current}`} className="post-card">
    <div className="post-image">{image && <img src={image} alt="" loading="lazy" />}<span>{post.category || 'Historias'}</span></div>
    <div className="post-body"><time>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-PE', { day:'numeric', month:'long', year:'numeric' }) : 'Próximamente'}</time><h3>{post.title}</h3><p>{post.excerpt}</p><span className="text-link">Leer historia <Arrow /></span></div>
  </Link>
}

function Home() {
  return <>
    <section className="hero">
      <img className="hero-image" src="/gallery/13.webp" alt="Niños compartiendo una actividad de lectura" />
      <div className="hero-shade" />
      <div className="container hero-content">
        <span className="hero-kicker">SOMOS LEER PARA CRECER <Leaf /></span>
        <h1>Donde nace un lector,<br /><em>crece una esperanza.</em></h1>
        <p>Transformando realidades a través del poder de los libros. Creamos espacios de encuentro, imaginación y comunidad donde más se necesitan.</p>
        <div className="hero-actions"><Link className="button button-yellow" to="/colabora">Quiero colaborar <Arrow /></Link><Link className="button button-ghost" to="/quienes-somos">Conoce nuestra historia</Link></div>
      </div>
      <div className="hero-bottom"><span>📚 Libros</span><span>🌱 Comunidad</span><span>✨ Oportunidades</span></div>
    </section>
    <PhotoBanner />
    <MissionStrip />
    <WhatWeDo />
    <ImpactPreview />
    <GalleryPreview />
    <StoriesPreview />
    <CtaBand />
  </>
}

function CtaBand() {
  return <section className="cta-band"><div className="container cta-inner"><div><p className="eyebrow">Sé parte de esta historia</p><h2>Tu ayuda puede convertirse<br />en una nueva oportunidad.</h2></div><Link className="button button-yellow" to="/colabora">Quiero colaborar <Arrow /></Link></div></section>
}

function PageHero({ eyebrow, title, text, image = '/gallery/50.webp' }: { eyebrow:string; title:string; text:string; image?:string }) {
  return <section className="page-hero"><img src={image} alt="" /><div className="page-hero-shade" /><div className="container page-hero-content"><p className="eyebrow light-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div></section>
}

function About() {
  return <><PageHero eyebrow="Quiénes somos" title="Pasión por la cultura, compromiso con el futuro." text="Una visión compartida: que la lectura sea una herramienta real de transformación social." image="/gallery/46.webp" />
    <section className="section"><div className="container two-col"><div><SectionHeading eyebrow="Nuestra visión" title="La lectura como raíz para crecer." /></div><div className="rich-copy"><p>Leer para crecer es el resultado de una visión compartida: la convicción de que la lectura es una de las herramientas más poderosas para la transformación social.</p><p>El proyecto une sensibilidad literaria, gestión cultural y trabajo comunitario para construir espacios sostenibles donde los niños y jóvenes puedan encontrarse con los libros.</p><p>Las bibliotecas no son solo lugares donde se guardan libros. Son refugios de conocimiento, imaginación y encuentro.</p></div></div></section>
    <section className="leadership section-soft"><div className="container"><SectionHeading eyebrow="Nuestro liderazgo" title="Personas que ponen experiencia y vocación al servicio de la comunidad." /><div className="leader-grid"><Leader name="Enmanuel Grau" role="Escritor, educador y gestor cultural" image="/gallery/21.webp">Su trayectoria en las letras aporta profundidad académica y una visión humana para que cada biblioteca sea un verdadero refugio de conocimiento.</Leader><Leader name="Cristina Acosta" role="Administradora de empresas y gestora de proyectos" image="/gallery/51.webp">Aporta estructura estratégica y capacidad ejecutiva para que cada sede sea sostenible y genere un impacto real en el tiempo.</Leader></div></div></section>
  </>
}

function Leader({ name, role, image, children }: {name:string; role:string; image:string; children:React.ReactNode}) {
  return <article className="leader-card"><img src={image} alt={name} /><div><p className="eyebrow">{role}</p><h3>{name}</h3><p>{children}</p></div></article>
}

function WhatPage() {
  return <><PageHero eyebrow="Qué hacemos" title="Creamos lugares donde leer se vuelve una experiencia." text="Abrimos espacios, activamos la lectura y fortalecemos los vínculos que sostienen a una comunidad." image="/gallery/04.webp" />
    <WhatWeDo />
    <section className="section manifesto"><div className="container manifesto-inner"><div className="manifesto-mark">🌿</div><div><p className="eyebrow">Nuestro manifiesto</p><h2>Un libro puede ser una puerta. Una biblioteca puede ser el lugar donde esa puerta siempre esté abierta.</h2><p>Por eso trabajamos para que cada sede tenga libros, actividades, personas que acompañen y una comunidad que sienta el espacio como propio.</p></div></div></section>
  </>
}

function ImpactPage() {
  return <><PageHero eyebrow="Nuestro impacto" title="Cada número tiene una historia detrás." text="Medimos nuestro crecimiento en bibliotecas, publicaciones, encuentros y vidas que encuentran nuevas posibilidades." image="/gallery/33.webp" />
    <section className="impact-page section"><div className="container"><div className="big-stats"><div><strong>02</strong><h3>Bibliotecas inauguradas</h3><p>Espacios recuperados para acercar los libros a la comunidad.</p></div><div><strong>02</strong><h3>Publicaciones</h3><p>Experiencias construidas con más de 40 niños del sector.</p></div><div><strong>200</strong><h3>Vidas impactadas</h3><p>Niños, familias y personas que han participado directamente.</p></div></div></div></section>
    <section className="section-soft impact-story"><div className="container two-col"><img src="/gallery/50.webp" alt="Libros y comunidad" /><div><p className="eyebrow">El siguiente capítulo</p><h2>Queremos llegar a un nuevo rincón de la ciudad.</h2><p>El crecimiento de Leer para crecer depende de sumar libros, voluntades, aliados y recursos que permitan abrir nuevas oportunidades.</p><Link className="button button-green" to="/colabora">Ayudar a crecer <Arrow /></Link></div></div></section>
  </>
}

function Gallery() {
  const [filter, setFilter] = useState('Todos')
  const [selected, setSelected] = useState<number | null>(null)
  const categories = ['Todos','Biblioteca','Lectura','Comunidad','Actividades']
  const filtered = filter === 'Todos' ? galleryImages : galleryImages.filter(i => i.category === filter)
  useEffect(() => { document.body.style.overflow = selected ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [selected])
  return <><PageHero eyebrow="Galería" title="Los momentos que hacen crecer esta historia." text="Conoce nuestros espacios, encuentros y personas a través de las fotografías de la comunidad." image="/gallery/49.webp" />
    <section className="section gallery-page"><div className="container"><div className="filters">{categories.map(c => <button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="gallery-grid">{filtered.map(item => <button className="gallery-item" key={item.id} onClick={()=>setSelected(item.id)}><img src={item.src} alt={item.caption} loading="lazy" /><span>{item.caption}</span></button>)}</div></div></section>
    {selected && <Lightbox id={selected} onClose={()=>setSelected(null)} onChange={setSelected} />}
  </>
}

function Lightbox({ id, onClose, onChange }: { id:number; onClose:()=>void; onChange:(id:number)=>void }) {
  const index = galleryImages.findIndex(i=>i.id===id); const item=galleryImages[index]
  const prev=()=>onChange(galleryImages[(index-1+galleryImages.length)%galleryImages.length].id); const next=()=>onChange(galleryImages[(index+1)%galleryImages.length].id)
  return <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}><button className="lightbox-close" onClick={onClose}>×</button><button className="lightbox-arrow left" onClick={e=>{e.stopPropagation();prev()}}>‹</button><div className="lightbox-content" onClick={e=>e.stopPropagation()}><img src={item.src} alt={item.caption}/><p>{item.caption}</p></div><button className="lightbox-arrow right" onClick={e=>{e.stopPropagation();next()}}>›</button></div>
}

function Collaborate() {
  return <><PageHero eyebrow="Colabora" title="Haz crecer una biblioteca." text="Tu apoyo puede convertirse en un libro, una actividad, un espacio cuidado o una nueva oportunidad." image="/gallery/65.webp" />
    <section className="section donate-section"><div className="container"><SectionHeading eyebrow="Dos formas de ayudar" title="Elige cómo quieres ser parte." text="Cada aporte cuenta. También puedes combinar las dos formas de colaboración."/><div className="donate-grid"><DonateCard icon="📚" title="Dona libros" text="Un libro puede abrir una ventana a un mundo nuevo. Recibimos libros en buen estado y adecuados para niños y jóvenes." button="Quiero donar libros"/><DonateCard icon="💚" title="Dona dinero" text="Tu aporte ayuda a sostener actividades, materiales, mantenimiento de espacios y nuevas acciones de lectura." button="Quiero donar dinero"/></div><div className="donation-note"><span>💡</span><div><strong>¿Tienes otra forma de ayudar?</strong><p>También puedes ser voluntario, compartir nuestra labor o conectar a Leer para crecer con una organización aliada.</p></div><a className="text-link" href="mailto:hola@leerparacrecer.org">Escríbenos <Arrow /></a></div></div></section>
  </>
}
function DonateCard({icon,title,text,button}:{icon:string;title:string;text:string;button:string}) { return <article className="donate-card"><div className="donate-icon">{icon}</div><h3>{title}</h3><p>{text}</p><button className="button button-green" onClick={()=>alert('Aquí conectaremos el formulario/canal de donación de la fundación.')}>{button} <Arrow /></button></article> }

function Stories() {
  const [posts,setPosts]=useState<Post[]>(localPosts)
  useEffect(()=>{fetchPosts().then(data=>{if(data.length)setPosts(data)})},[])
  return <><PageHero eyebrow="Historias" title="Lo que pasa cuando una comunidad se encuentra con los libros." text="Un espacio para compartir noticias, aprendizajes, actividades y voces de quienes hacen crecer el proyecto." image="/gallery/67.webp"/><section className="section"><div className="container"><div className="stories-intro"><div><p className="eyebrow">Desde el celular</p><h2>Publicar una nueva historia será tan sencillo como enviar una foto.</h2></div><div><p>La web está preparada para conectarse con Sanity: desde su Studio podrán crear una historia, escribir el texto, subir una portada y publicar sin tocar GitHub ni Vercel.</p><span className="cms-badge">{sanityEnabled ? '● Sanity conectado' : '○ Sanity pendiente de conectar'}</span></div></div><div className="post-grid stories-grid">{posts.map(p=><PostCard post={p} key={p._id}/>)}</div></div></section></>
}

function StoryDetail() {
  const { slug = '' } = useParams(); const [post,setPost]=useState<Post | null>(null); const [loading,setLoading]=useState(true)
  useEffect(()=>{fetchPost(slug).then(data=>{setPost(data || localPosts.find(p=>p.slug.current===slug) || null);setLoading(false)})},[slug])
  if(loading) return <div className="loading">Cargando historia…</div>
  if(!post) return <div className="not-found"><h1>Historia no encontrada</h1><Link className="button button-green" to="/historias">Volver a historias</Link></div>
  const image=typeof post.coverImage==='string'?post.coverImage:sanityImage(post.coverImage)
  return <article className="story-detail"><div className="container story-detail-inner"><Link className="back-link" to="/historias">← Volver a historias</Link><p className="eyebrow">{post.category || 'Historias'}</p><h1>{post.title}</h1>{post.publishedAt&&<time>{new Date(post.publishedAt).toLocaleDateString('es-PE',{day:'numeric',month:'long',year:'numeric'})}</time>}{image&&<img className="story-cover" src={image} alt=""/>}<p className="story-excerpt">{post.excerpt}</p>{post.body ? <div className="portable-copy"><PortableText value={post.body as never} /></div> : <div className="portable-copy"><p>Esta es una historia de demostración. Cuando conectes Sanity, el contenido que escriban desde el Studio aparecerá aquí automáticamente.</p></div>}</div></article>
}

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/quienes-somos" element={<About />} />
    <Route path="/que-hacemos" element={<WhatPage />} />
    <Route path="/impacto" element={<ImpactPage />} />
    <Route path="/galeria" element={<Gallery />} />
    <Route path="/historias" element={<Stories />} />
    <Route path="/historias/:slug" element={<StoryDetail />} />
    <Route path="/colabora" element={<Collaborate />} />
    <Route path="*" element={<Home />} />
  </Routes></Layout>
}
