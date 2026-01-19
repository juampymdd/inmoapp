"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, MapPin, Home, Key, ArrowRight, 
  Menu, X, Facebook, Instagram, Twitter, 
  Bed, Bath, Square, ChevronRight, Star,
  Shield, Clock, Award, Globe, Phone, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const properties = [
  {
    id: 1,
    title: "Palacio de los Patos",
    location: "Palermo Chico, Buenos Aires",
    price: "USD 3.200.000",
    beds: 4,
    baths: 5,
    area: "480 m²",
    tag: "Histórico",
    image: "/images/prop1.png"
  },
  {
    id: 2,
    title: "Torre Renoir Penthouse",
    location: "Puerto Madero, CABA",
    price: "USD 2.850.000",
    beds: 3,
    baths: 4,
    area: "350 m²",
    tag: "Skyline",
    image: "/images/prop2.png"
  },
  {
    id: 3,
    title: "Villa San Isidro Golf",
    location: "San Isidro, PBA",
    price: "USD 1.150.000",
    beds: 5,
    baths: 4,
    area: "620 m²",
    tag: "Exclusivo",
    image: "/images/prop3.png"
  },
  {
    id: 4,
    title: "Eco-Lodge Patagonia",
    location: "Villa La Angostura, Neuquén",
    price: "USD 890.000",
    beds: 3,
    baths: 2,
    area: "210 m²",
    tag: "Aventura",
    image: "/images/prop4.png"
  },
  {
    id: 5,
    title: "Chateau Libertador",
    location: "Belgrano, CABA",
    price: "USD 1.550.000",
    beds: 3,
    baths: 3,
    area: "240 m²",
    tag: "Classic",
    image: "/images/prop5.png"
  },
  {
    id: 6,
    title: "Mansión de las Lomas",
    location: "San Isidro, PBA",
    price: "USD 2.100.000",
    beds: 6,
    baths: 7,
    area: "850 m²",
    tag: "Premium",
    image: "/images/prop6.png"
  }
];

const stats = [
  { label: "Propiedades", value: "2,500+" },
  { label: "Clientes Satisfechos", value: "1,200+" },
  { label: "Años de Trayectoria", value: "25" },
  { label: "Premios Globales", value: "12" }
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Search Overlay / Navigation */}
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
          isScrolled ? "py-4 bg-white/90 backdrop-blur-xl border-b border-black/5" : "py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-black tracking-tighter uppercase transition-colors duration-500 ${isScrolled ? "text-black" : "text-white"}`}>
              Inmo<span className="text-[var(--color-secondary)]">App</span>
            </span>
          </Link>

          <div className={`hidden lg:flex items-center space-x-12 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-500 ${isScrolled ? "text-black/70" : "text-white/80"}`}>
            {[
              { name: "Venta", id: "propiedades" },
              { name: "Alquiler", id: "propiedades" },
              { name: "Emprendimientos", id: "emprendimientos" },
              { name: "Inversores", id: "inversores" },
              { name: "Contacto", id: "contacto" }
            ].map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                className="hover:text-[var(--color-secondary)] transition-colors relative group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-secondary)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button 
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[var(--color-secondary)] text-white px-10 py-4 hover:bg-black transition-all duration-500 shadow-xl shadow-gold-500/20 active:scale-95"
            >
              TASAR AHORA
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-black" : "text-white"}`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[200] bg-black text-white flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-10 h-10" /></button>
            </div>
            <div className="flex flex-col space-y-10 mt-20 text-4xl font-black uppercase tracking-tighter">
              {[
                { name: "Venta", id: "propiedades" },
                { name: "Alquiler", id: "propiedades" },
                { name: "Emprendimientos", id: "emprendimientos" },
                { name: "Inversores", id: "inversores" },
                { name: "Contacto", id: "contacto" }
              ].map(i => (
                <a key={i.name} href={`#${i.id}`} onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth' });
                }}>{i.name}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="/images/hero.png" 
            alt="Main Banner" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000";
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center text-white mt-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block text-[11px] font-black tracking-[0.4em] uppercase mb-6 bg-white/10 backdrop-blur-md px-6 py-2 border border-white/20">
              Liderazgo Inmobiliario en Argentina
            </span>
            <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[0.85] tracking-tighter uppercase">
              EL LUJO DE <br />
              VIVIR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-secondary)]">MEJOR</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-6xl mx-auto glass p-3 shadow-3xl flex flex-col lg:flex-row items-stretch border-none"
          >
            <div className="flex-1 flex items-center px-8 border-b lg:border-b-0 lg:border-r border-white/10 py-6 lg:py-0">
              <MapPin className="text-[var(--color-secondary)] mr-5 w-6 h-6 lg:opacity-60" />
              <div className="flex flex-col items-start w-full text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Ubicación</span>
                <input 
                  type="text" 
                  placeholder="Dónde buscas..." 
                  className="bg-transparent border-none outline-none w-full text-sm font-bold placeholder:text-white/30 text-white"
                />
              </div>
            </div>

            <div className="flex-1 flex items-center px-8 border-b lg:border-b-0 lg:border-r border-white/10 py-6 lg:py-0">
              <Home className="text-[var(--color-secondary)] mr-5 w-6 h-6 lg:opacity-60" />
              <div className="flex flex-col items-start w-full text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Tipo</span>
                <select className="bg-transparent border-none outline-none w-full text-sm font-bold text-white appearance-none cursor-pointer">
                  <option className="bg-black py-2">Todas las propiedades</option>
                  <option className="bg-black py-2">Casa</option>
                  <option className="bg-black py-2">Departamento</option>
                  <option className="bg-black py-2">Lote / Terreno</option>
                  <option className="bg-black py-2">Nave Industrial</option>
                </select>
              </div>
            </div>

            <div className="flex-1 flex items-center px-8 border-b lg:border-b-0 lg:border-r border-white/10 py-6 lg:py-0">
              <Key className="text-[var(--color-secondary)] mr-5 w-6 h-6 lg:opacity-60" />
              <div className="flex flex-col items-start w-full text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Operación</span>
                <select className="bg-transparent border-none outline-none w-full text-sm font-bold text-white appearance-none cursor-pointer">
                  <option className="bg-black py-2">Venta o Alquiler</option>
                  <option className="bg-black py-2">Venta</option>
                  <option className="bg-black py-2">Alquiler</option>
                  <option className="bg-black py-2">Temporario</option>
                </select>
              </div>
            </div>

            <button className="bg-white text-black px-16 py-6 lg:py-0 font-black tracking-[0.2em] uppercase hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-700 active:scale-95">
              EXPLORAR
            </button>
          </motion.div>
        </div>
      </section>

      {/* Brand Excellence Section */}
      <section className="py-24 container mx-auto px-6 overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-black mb-3 tracking-tighter text-black">{stat.value}</div>
              <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[var(--color-muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section id="propiedades" className="py-32 bg-[#fafafa]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="max-w-xl">
              <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[var(--color-secondary)] mb-6 block">Colección Privada</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">DESCUBRE <br /> TU PRÓXIMO <br /> DESTINO</h2>
            </div>
            <div className="mt-12 md:mt-0 flex gap-4">
              <button className="w-14 h-14 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500">
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <button className="w-14 h-14 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {properties.map((prop, idx) => (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx % 3 * 0.2 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1 }}
                    src={prop.image} 
                    alt={prop.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200";
                    }}
                  />
                  <div className="absolute top-8 left-8 z-10 bg-white text-black px-5 py-2 text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                    {prop.tag}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center translate-y-4 group-hover:translate-y-0 transform transition-transform">
                    <button className="bg-white text-black px-10 py-4 font-black tracking-widest text-[10px] uppercase hover:bg-[var(--color-secondary)] hover:text-white transition-colors">
                      VER PROPIEDAD
                    </button>
                  </div>
                </div>
                
                <div className="mt-10 px-2">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-2 uppercase group-hover:text-[var(--color-secondary)] transition-colors">{prop.title}</h3>
                      <p className="text-[var(--color-muted)] text-[10px] font-bold uppercase tracking-widest flex items-center">
                        <MapPin className="w-3 h-3 mr-2 opacity-50" /> {prop.location}
                      </p>
                    </div>
                    <div className="text-2xl font-black text-[var(--color-secondary)] tracking-tighter italic">NEW</div>
                  </div>
                  
                  <div className="text-2xl font-black tracking-tighter mb-8 border-b border-black/5 pb-8">
                    {prop.price}
                  </div>

                  <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-black">
                    <span className="flex items-center"><Bed className="w-4 h-4 mr-3 opacity-30" /> {prop.beds} Dorm</span>
                    <span className="flex items-center"><Bath className="w-4 h-4 mr-3 opacity-30" /> {prop.baths} Baños</span>
                    <span className="flex items-center"><Square className="w-4 h-4 mr-3 opacity-30" /> {prop.area}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-32 text-center">
            <button className="px-16 py-6 border-2 border-black font-black uppercase tracking-[0.4em] text-xs hover:bg-black hover:text-white transition-all duration-700">
              VER TODAS LAS PROPIEDADES
            </button>
          </div>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="py-32 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="grid grid-cols-2 gap-6 relative">
          <div className="space-y-6">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=800&fit=crop" className="w-full aspect-square object-cover shadow-2xl" alt="Lujo" />
            <div className="p-8 bg-black text-white">
              <Star className="w-8 h-8 text-[var(--color-secondary)] mb-6 fill-current" />
              <p className="text-sm font-bold uppercase tracking-widest leading-loose">"Encontramos no solo una casa, sino un refugio que refleja exactamente quiénes somos."</p>
              <div className="mt-8 text-[9px] font-black tracking-[0.2em] text-white/50">FAMILIA COSTANTINI</div>
            </div>
          </div>
          <div className="space-y-6 mt-16">
             <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop" className="w-full aspect-[3/4] object-cover shadow-2xl" alt="Lujo" />
             <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=800&fit=crop" className="w-full aspect-square object-cover shadow-2xl" alt="Lujo" />
          </div>
        </div>

        <div>
          <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[var(--color-secondary)] mb-8 block">Nuestra Promesa</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-12">DONDE EL <br /> SUEÑO <span className="italic">SE ENCUENTRA</span> <br /> CON LA REALIDAD.</h2>
          
          <div className="space-y-12 mb-16">
            {[
              { icon: Shield, title: "Seguridad Jurídica", desc: "Acompañamiento legal completo en cada paso de tu inversión." },
              { icon: Award, title: "Curaduría Premium", desc: "Solo seleccionamos las propiedades más exclusivas de la región." },
              { icon: Globe, title: "Red Internacional", desc: "Acceso a inversores destacados de todo el mundo." }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-8 max-w-lg">
                <div className="w-16 h-16 bg-[var(--color-secondary)]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-[var(--color-secondary)]" />
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-[var(--color-muted)] text-sm leading-loose uppercase tracking-tighter">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="flex items-center space-x-6 group">
            <span className="text-xs font-black uppercase tracking-[0.3em]">Conocer más sobre nosotros</span>
            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>

      {/* Emprendimientos Section */}
      <section id="emprendimientos" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[var(--color-secondary)] mb-8 block">Nuevos Desarrollos</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-12">EMPRENDIMIENTOS <br /> DE VANGUARDIA.</h2>
              <p className="text-[var(--color-muted)] text-sm leading-loose uppercase tracking-widest mb-12 max-w-lg">
                Desbloquea el acceso a los proyectos arquitectónicos más ambiciosos de Argentina. Desde torres de lujo en Puerto Madero hasta exclusivas comunidades privadas en zona norte.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-16">
                <div className="p-8 border border-black/5 hover:border-[var(--color-secondary)] transition-colors">
                  <div className="text-3xl font-black mb-2 tracking-tighter uppercase">Pre-Launch</div>
                  <div className="text-[9px] font-black tracking-widest text-[var(--color-secondary)] uppercase">Acceso Exclusivo</div>
                </div>
                <div className="p-8 border border-black/5 hover:border-[var(--color-secondary)] transition-colors">
                  <div className="text-3xl font-black mb-2 tracking-tighter uppercase">Financing</div>
                  <div className="text-[9px] font-black tracking-widest text-[var(--color-secondary)] uppercase">Planes a Medida</div>
                </div>
              </div>
              <button className="btn-luxury border border-black px-12 py-5 hover:bg-black hover:text-white transition-all">VER TODOS LOS PROYECTOS</button>
            </div>
            <div className="order-1 lg:order-2 relative">
               <div className="absolute -top-12 -left-12 w-48 h-48 bg-[var(--color-secondary)]/10 z-0" />
               <img 
                 src="/images/emprendimientos.png" 
                 className="w-full aspect-[4/5] object-cover shadow-3xl relative z-10" 
                 alt="Emprendimientos" 
                 onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200";
                }}
               />
            </div>
          </div>
        </div>
      </section>

      {/* Inversores Section */}
      <section id="inversores" className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <img src="/images/inversores.png" className="w-full h-full object-cover" alt="Inversores" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[var(--color-secondary)] mb-8 block">Wealth Management</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-12">MAXIMIZA TU <br /> PATRIMONIO.</h2>
            <p className="text-white/60 text-sm leading-loose uppercase tracking-widest mb-16 max-w-lg">
              Ofrecemos asesoramiento estratégico para inversores locales e internacionales buscando oportunidades de alto rendimiento en el mercado inmobiliario argentino.
            </p>
            <div className="space-y-8 mb-16">
              <div className="flex items-center space-x-6 border-l-2 border-[var(--color-secondary)] pl-8">
                <div>
                  <div className="text-2xl font-black uppercase tracking-tight">Real Estate Funds</div>
                  <div className="text-[10px] uppercase font-bold text-white/40 tracking-widest mt-1">Diversificación Estratégica</div>
                </div>
              </div>
              <div className="flex items-center space-x-6 border-l-2 border-[var(--color-secondary)] pl-8">
                <div>
                  <div className="text-2xl font-black uppercase tracking-tight">Commercial Assets</div>
                  <div className="text-[10px] uppercase font-bold text-white/40 tracking-widest mt-1">Rentabilidad Asegurada</div>
                </div>
              </div>
            </div>
            <button className="bg-white text-black px-12 py-5 font-black uppercase tracking-widest text-[10px] hover:bg-[var(--color-secondary)] hover:text-white transition-all">CONSULTAR ASESOR</button>
          </div>
        </div>
      </section>

      {/* Map Preview / Location Section */}
      <section className="h-[600px] relative mt-24">
        <div className="absolute inset-0 bg-gray-200">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-50" alt="Map View" />
        </div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
          <div className="max-w-xl glass p-12 backdrop-blur-2xl">
             <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-6">Explora el Mapa de Oportunidades</h2>
             <p className="text-white/70 text-sm uppercase tracking-widest leading-loose mb-10">Visualiza todas nuestras propiedades en tiempo real y encuentra la zona que mejor se adapta a tu estilo.</p>
             <button className="btn-luxury">ABRIR MAPA INTERACTIVO</button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="py-32 bg-black text-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-24 items-center">
           <div className="lg:w-1/2">
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-12">COMIENZA TU <br /> SIGUIENTE <br /> <span className="text-[var(--color-secondary)]">HISTORIA</span>.</h2>
             <div className="space-y-6 text-white/50 font-bold uppercase tracking-[0.2em] text-sm">
                <div className="flex items-center"><Mail className="w-5 h-5 mr-4" /> info@inmoapp.com.ar</div>
                <div className="flex items-center"><Phone className="w-5 h-5 mr-4" /> +54 11 4802-XXXX</div>
                <div className="flex items-center"><MapPin className="w-5 h-5 mr-4" /> Av. Alvear 1900, Recoleta, CABA</div>
             </div>
           </div>
           
           <div className="lg:w-1/2 w-full glass p-12">
             <div className="grid grid-cols-2 gap-8 mb-8">
               <div className="flex flex-col border-b border-white/20 pb-4">
                 <label className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 text-white/40">Nombre</label>
                 <input type="text" className="bg-transparent outline-none text-white text-sm" placeholder="Tu nombre..." />
               </div>
               <div className="flex flex-col border-b border-white/20 pb-4">
                 <label className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 text-white/40">Email</label>
                 <input type="email" className="bg-transparent outline-none text-white text-sm" placeholder="email@ejemplo.com" />
               </div>
             </div>
              <div className="flex flex-col border-b border-white/20 pb-4 mb-12">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 text-white/40">Motivo</label>
                <select className="bg-transparent outline-none text-white text-sm appearance-none cursor-pointer">
                  <option className="bg-black">Quiero Tasar</option>
                  <option className="bg-black">Quiero Comprar</option>
                  <option className="bg-black">Quiero Alquilar</option>
                  <option className="bg-black">Oportunidad de Inversión</option>
                </select>
              </div>
              <div className="flex flex-col border-b border-white/20 pb-4 mb-12">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 text-white/40">Mensaje</label>
                <textarea className="bg-transparent outline-none text-white text-sm resize-none h-24" placeholder="¿En qué podemos ayudarte?" />
              </div>
             <button className="w-full bg-[var(--color-secondary)] py-6 text-white font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all duration-700">ENVIAR CONSULTA</button>
           </div>
        </div>
      </section>

      {/* Footer Final */}
      <footer className="py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-black">
          <div>© 2026 INMOAPP ARGENTINA — EXCELENCIA INMOBILIARIA</div>
          <div className="mt-8 md:mt-0 flex space-x-12">
             <Link href="#" className="hover:text-[var(--color-secondary)]">INSTAGRAM</Link>
             <Link href="#" className="hover:text-[var(--color-secondary)]">LINKEDIN</Link>
             <Link href="#" className="hover:text-[var(--color-secondary)]">WHATSAPP</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
