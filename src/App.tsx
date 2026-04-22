/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  Paintbrush, 
  Droplets, 
  Search, 
  ShieldCheck, 
  Wrench, 
  Factory, 
  Hammer, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  HardHat,
  Construction,
  Truck,
  Box,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  icon: any;
  description: string;
  useCase: string;
  customerType: string;
  products: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  priceRange: string;
  isSpecialty?: boolean;
}

interface GalleryImage {
  id: string;
  url: string;
  category: 'Vehicles' | 'Motorcycles' | 'Classics' | 'Products' | 'Store';
  span: string;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 'paint-supply',
    title: 'Precision Paint Supply',
    icon: Droplets,
    description: 'Professional grade automotive paint systems. We mix and match thousands of OEM and custom formulas using leading industrial coatings.',
    useCase: 'From collision repair to full custom resprays.',
    customerType: 'Body shops, custom builders, and DIY enthusiasts.',
    products: ['Performance Basecoat Series', 'High-Solid Clearcoat', 'Single-Stage Coatings']
  },
  {
    id: 'custom-finishes',
    title: 'Custom Finishes',
    icon: Sparkles,
    description: 'Elevate your project with specialty pearls, flakes, candies, and chameleon tech. We provide the material for your artistic vision.',
    useCase: 'Show cars, motorcycles, and high-end automotive art.',
    customerType: 'Custom painters and restoration artists.',
    products: ['Spectra-Flake Additives', 'Deep-Tone Candy Concentrates', 'Ghost-Pearl Pigments']
  },
  {
    id: 'prep-materials',
    title: 'Prep & Repair',
    icon: Wrench,
    description: 'The foundation of a great finish. We stock premium abrasives, fillers, primers, and masking solutions.',
    useCase: 'Rust repair, surface leveling, and strict masking protocols.',
    customerType: 'Prep technicians and restoration specialists.',
    products: ['Precision Masking Tape', 'Multi-Grit Abrasive Packs', 'High-Build Epoxy Primers']
  },
  {
    id: 'shop-supplies',
    title: 'Shop Accessories',
    icon: Box,
    description: 'All the essentials to keep your shop running. Spray guns, mixing cups, safety gear, and detailing supplies.',
    useCase: 'Daily shop operations and final project detailing.',
    customerType: 'Professional shop owners and serious hobbyists.',
    products: ['HVLP Detail Spray Guns', 'Graduated Mixing Cups', 'Respirators & Protective Gear']
  }
];

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Elite-Tech Base', category: 'Paint Systems', description: 'Advanced coverage basecoat with rapid-dry technology.', priceRange: '$$', isSpecialty: true },
  { id: 'p2', name: 'Mirror-Finish Clear', category: 'Clearcoats', description: 'Ultra-durable high-gloss clearcoat with UV protection.', priceRange: '$$', isSpecialty: true },
  { id: 'p3', name: 'Sanded-Smooth Primer', category: 'Primers', description: 'Exceptional build and easy sanding for a level base.', priceRange: '$' },
  { id: 'p4', name: 'Pro-Mask Tape', category: 'Sundries', description: 'Precision edge masking tape for sharp two-tones.', priceRange: '$' },
  { id: 'p5', name: 'Gold-Cut Abrasives', category: 'Abrasives', description: 'Long-lasting abrasive discs for ultimate surface prep.', priceRange: '$' },
  { id: 'p6', name: 'Candy-Tone Red', category: 'Paint Systems', description: 'Deep, vibrant candy concentrate for custom builds.', priceRange: '$$$', isSpecialty: true },
  { id: 'p7', name: 'Quick-Fill Body Putty', category: 'Fillers', description: 'Lightweight body filler with superior adhesion.', priceRange: '$' },
  { id: 'p8', name: 'Technical Tack Cloth', category: 'Sundries', description: 'Zero-residue tack cloths for final dust removal.', priceRange: '$' },
  { id: 'p9', name: 'Ceramic-Shield Gloss', category: 'Detailing', description: 'Final protection coating for a durable showroom shine.', priceRange: '$$', isSpecialty: true },
];

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070", category: 'Motorcycles', span: "col-span-2 row-span-2" },
  { id: 'g2', url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070", category: 'Vehicles', span: "col-span-1 row-span-1" },
  { id: 'g3', url: "https://images.unsplash.com/photo-1635350736475-c8cc13eca0a2?q=80&w=2070", category: 'Products', span: "col-span-1 row-span-1" },
  { id: 'g4', url: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1974", category: 'Classics', span: "col-span-2 row-span-1" },
  { id: 'g5', url: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974", category: 'Store', span: "col-span-1 row-span-1" },
  { id: 'g6', url: "https://images.unsplash.com/photo-1502744691474-9521b1b50c76?q=80&w=2070", category: 'Vehicles', span: "col-span-1 row-span-1" },
  { id: 'g7', url: "https://images.unsplash.com/photo-1594976612318-96109a200925?q=80&w=2070", category: 'Motorcycles', span: "col-span-1 row-span-1" },
  { id: 'g8', url: "https://images.unsplash.com/photo-1598501479156-5088686e08c6?q=80&w=2070", category: 'Classics', span: "col-span-1 row-span-1" },
];

const FAQS = [
  { question: "Do you offer custom color matching?", answer: "Yes, it's our specialty. We use advanced digital color scanning tools to match your existing paint or create a completely custom formula for your project." },
  { question: "Can I buy paint for a small DIY touch-up?", answer: "Absolutely. We supply everything from small touch-up jars to full gallons for resprays. No project is too small." },
  { question: "What brands of clearcoat do you recommend?", answer: "We stock several professional clearcoats. Our team will recommend the specific clearcoat based on your desired depth of gloss and durability requirements." },
  { question: "Do you have the correct sandpapers for restoration?", answer: "Yes, we carry a full range of abrasives from heavy-grit stripping discs to ultra-fine finishing papers for wet sanding." }
];

export default function App() {
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [activeTab, setActiveTab] = useState('All');
  const [activeGalleryTab, setActiveGalleryTab] = useState<'All' | 'Vehicles' | 'Motorcycles' | 'Classics' | 'Products' | 'Store'>('All');
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState({ surface: '', need: '', size: '', support: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formService, setFormService] = useState('');
  const [formDetails, setFormDetails] = useState('');
  const [isWizardVisible, setIsWizardVisible] = useState(true);

  const quoteRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  // Sync form with selected service
  useEffect(() => {
    if (selectedService) {
      setFormService(selectedService.title);
    }
  }, [selectedService]);

  const scrollToQuote = () => {
    quoteRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (wizardStep >= 4) {
      const summary = `Project Details:\n- Surface: ${wizardData.surface}\n- Requirement: ${wizardData.need}\n- Scale: ${wizardData.size}\n- Support: ${wizardData.support}`;
      setFormDetails(summary);
      detailsRef.current?.focus();
    }
  };

  const filteredProducts = activeTab === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  const productCategories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredGallery = activeGalleryTab === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeGalleryTab);

  const galleryCategories: ('All' | 'Vehicles' | 'Motorcycles' | 'Classics' | 'Products' | 'Store')[] = ['All', 'Vehicles', 'Motorcycles', 'Classics', 'Products', 'Store'];

  const handleWizardChoice = (key: string, value: string) => {
    setWizardData(prev => ({ ...prev, [key]: value }));
    if (wizardStep < 4) setWizardStep(prev => prev + 1);
  };

  const resetWizard = () => {
    setWizardStep(0);
    setWizardData({ surface: '', need: '', size: '', support: '' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-brand-accent selection:text-white workshop-bg">
      {/* 1. Top Contact Bar */}
      <div className="bg-[#111827] text-white py-2.5 px-6 hidden sm:flex border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex gap-8">
            <span className="flex items-center gap-2 text-white/60"><MapPin size={12} className="text-brand-accent" /> 515 N Circle Dr // Colorado Springs, CO</span>
            <a href="tel:+17196362635" className="flex items-center gap-2 hover:text-brand-accent transition-colors">
              <Phone size={12} className="text-brand-accent" /> (719) 636-2635
            </a>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-white/40 border-r border-white/10 pr-8">
              <Clock size={12} />
              <span>Mon-Fri: 8am - 5:30pm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
              <span className="font-black text-brand-accent">STATUS: OPEN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-border">
        <nav className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 bg-brand-primary flex items-center justify-center border-2 border-brand-accent transition-transform group-hover:scale-105">
              <Construction className="text-white" size={24} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-logo font-black tracking-tighter uppercase text-brand-primary italic -skew-x-6">Dales</span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent -mt-1">Automotive Paint Equipment & Supplies</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.2em]">
            {['Services', 'Products', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-brand-primary/60 hover:text-brand-accent transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-accent transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToQuote}
              className="hidden lg:block px-6 py-3 bg-brand-accent text-white font-bold uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-lg"
            >
              Project Estimator
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-brand-primary border border-brand-border h-10 w-10 flex items-center justify-center">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-brand-surface border-b border-brand-border p-8 flex flex-col gap-6 md:hidden shadow-2xl z-[100]"
            >
              {['Services', 'Products', 'Quote Request', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="font-black uppercase tracking-widest text-xs text-brand-primary/60 hover:text-brand-accent py-2 border-b border-brand-border/50"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => { setIsMenuOpen(false); scrollToQuote(); }}
                className="w-full py-4 bg-brand-accent text-white font-black uppercase tracking-widest text-[10px] brutalist-button"
              >
                Dispatch Estimator
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Who We Serve Section */}
        <section className="py-24 bg-white px-6 border-b border-brand-border">
           <div className="max-w-7xl mx-auto">
              <div className="mb-16 text-center">
                 <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-brand-primary tracking-tighter mb-4">Who We Serve</h2>
                 <p className="text-brand-primary/40 font-bold uppercase tracking-widest text-[10px]">Built for the automotive professional & enthusiast</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                 {[
                   { label: "Body Shops", icon: Factory },
                   { label: "Custom Builders", icon: Paintbrush },
                   { label: "Restorers", icon: Hammer },
                   { id: "enthusiasts", label: "Enthusiasts", icon: Sparkles },
                   { label: "DIY Painters", icon: HardHat }
                 ].map((item, idx) => (
                   <div key={idx} className="bg-brand-muted p-8 border border-brand-border flex flex-col items-center text-center group hover:border-brand-accent transition-all shadow-sm">
                      <div className="w-14 h-14 bg-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors">
                         <item.icon size={24} className="text-white" />
                      </div>
                      <span className="font-display font-black uppercase text-sm tracking-widest text-brand-primary">{item.label}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Store Updates Hub */}
        <section id="updates" className="py-20 bg-brand-muted px-6 border-b border-brand-border">
           <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                 <div className="inline-flex items-center gap-2 py-1 px-3 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-6 font-bold uppercase tracking-[0.2em] text-[10px]">
                    <Construction size={12} />
                    <span>Shop Status</span>
                 </div>
                 <h2 className="text-4xl font-display font-black uppercase text-brand-primary mb-6">Local Hub Updates</h2>
                 <p className="text-brand-primary/60 font-medium max-w-sm">Live updates on inventory and access conditions for our Colorado Springs location.</p>
              </div>
              
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                 {[
                   { date: "APR 22", title: "N Circle Dr Construction", desc: "Access remains open via the south entrance during road work. Follow directional signage.", type: "alert" },
                   { date: "APR 15", title: "New Inventory Arrival", desc: "Fresh batch of OEM color matching basecoats and pro-series clearcoats now in stock.", type: "update" },
                 ].map((update, idx) => (
                   <div key={idx} className="bg-white p-8 border border-brand-border hover:border-brand-accent transition-all shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">{update.date}</span>
                         {update.type === 'alert' && <div className="w-2 h-2 bg-brand-accent rounded-full animate-ping" />}
                      </div>
                      <h3 className="text-xl font-display font-black uppercase text-brand-primary mb-4 leading-tight">{update.title}</h3>
                      <p className="text-brand-primary/60 text-sm font-medium leading-relaxed">{update.desc}</p>
                      <div className="mt-8 pt-6 border-t border-brand-border flex items-center justify-between group cursor-pointer">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-brand-primary/40 group-hover:text-brand-primary transition-colors">Details</span>
                         <ArrowRight size={12} className="text-brand-accent group-hover:translate-x-1 transition-transform" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 3. Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 px-6 graphite-base max-w-[1600px] mx-auto border-x border-brand-border shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 py-2 px-4 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-8">
                <Wrench size={14} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Custom Shop Excellence // Since 1990</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] uppercase mb-10 text-white tracking-tighter">
                Master the <br /> 
                <span className="text-brand-accent">Finish.</span>
              </h1>
              <p className="text-lg text-white/70 mb-12 max-w-xl leading-relaxed font-medium border-l-4 border-brand-accent pl-8">
                Premium automotive paint supplies for collision shops, custom builders, and restoration enthusiasts. We provide the material and expertise for winning finishes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-brand-accent text-white font-bold uppercase tracking-widest text-[11px] hover:brightness-110 transition-all flex items-center gap-3"
                >
                  Explore Inventory
                  <ArrowRight size={16} />
                </button>
                <a 
                  href="tel:+17196362635"
                  className="px-8 py-4 bg-white/5 text-white border border-white/20 font-bold uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  <Phone size={14} />
                  Call Expert Line
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
               <div className="relative z-10">
                  <div className="h-[550px] border-4 border-white/10 overflow-hidden shadow-2xl relative">
                     <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2070" className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700" alt="Custom automotive painting" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-accent border-4 border-[#111827] flex items-center justify-center p-8 text-white shadow-xl">
                     <div className="text-center">
                        <div className="text-4xl font-display font-black leading-none">36+</div>
                        <div className="text-[8px] font-bold uppercase tracking-widest mt-2 whitespace-nowrap">Years of Expertise</div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </section>

        {/* 4. Interactive Service Selector */}
        <section id="services" className="py-32 bg-white px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4 uppercase text-brand-primary">Technical Units</h2>
              <p className="text-brand-primary/40 font-bold tracking-widest text-[11px] uppercase border-b border-brand-border pb-4 max-w-sm">
                Select a division to view technical specifications.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Cards Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-6 border transition-all text-left flex items-center gap-6 group ${
                      selectedService.id === service.id 
                        ? 'bg-brand-accent border-brand-accent text-white shadow-xl' 
                        : 'bg-brand-muted border-brand-border text-brand-primary group-hover:border-brand-accent'
                    }`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center transition-colors ${
                      selectedService.id === service.id ? 'bg-white text-brand-accent' : 'bg-brand-primary text-white'
                    }`}>
                      <service.icon size={24} />
                    </div>
                    <div>
                      <div className="font-black uppercase tracking-tighter text-lg leading-none">{service.title}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">Division: 09</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Dynamic Content Panel */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-brand-muted border border-brand-border p-10 md:p-16 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 -rotate-45 translate-x-16 -translate-y-16" />
                    
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-brand-primary text-white flex items-center justify-center p-4">
                           <selectedService.icon size={40} />
                        </div>
                        <h3 className="text-4xl md:text-6xl font-display font-black uppercase leading-none text-brand-primary">{selectedService.title}</h3>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-10">
                        <div>
                          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-accent mb-4 border-l-4 border-brand-accent pl-3">Material Scope</h4>
                          <p className="text-brand-primary/80 font-medium leading-relaxed text-lg italic">
                            "{selectedService.description}"
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-accent mb-4 border-l-4 border-brand-accent pl-3">Core Deployment</h4>
                          <p className="text-brand-primary font-black uppercase tracking-tight text-xl">
                            {selectedService.useCase}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-8 border border-brand-border shadow-sm flex flex-col justify-between">
                        <div>
                          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary/40 mb-8 border-b border-brand-border pb-4">Authorized Products</h4>
                          <ul className="space-y-5">
                            {selectedService.products.map((product, idx) => (
                              <li key={idx} className="flex items-center gap-4 group">
                                <Box size={16} className="text-brand-accent shrink-0" />
                                <span className="font-bold uppercase tracking-tighter group-hover:text-brand-accent transition-colors text-brand-primary">{product}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {selectedService.id === 'matching' && (
                          <div className="mt-10 pt-10 border-t border-brand-border">
                             <div className="text-[9px] font-black uppercase text-brand-accent/50 mb-4 tracking-[0.2em]">Spectral Calibration Status</div>
                             <div className="flex items-end gap-1.5 h-10">
                                {[40, 70, 45, 90, 65, 30, 85, 50].map((h, i) => (
                                  <motion.div 
                                    key={i} 
                                    className="flex-1 bg-brand-accent/10 border-t-2 border-brand-accent"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.1, repeatType: 'reverse' }}
                                  />
                                ))}
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive “What Do You Need?” Wizard */}
        <AnimatePresence>
          {isWizardVisible && (
            <motion.section 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="lg:fixed lg:right-10 lg:bottom-10 lg:w-96 lg:z-40 hidden lg:block"
            >
               <div className="bg-white p-6 border border-brand-accent lg:shadow-2xl relative shadow-xl">
                  <button 
                    onClick={() => setIsWizardVisible(false)}
                    className="absolute top-4 right-4 text-brand-primary/40 hover:text-brand-accent transition-colors"
                    title="Close"
                  >
                    <X size={18} />
                  </button>
                  <div className="flex items-center gap-3 mb-6">
                     <Truck className="text-brand-accent animate-pulse" size={20} />
                     <h3 className="font-display font-black uppercase text-brand-primary tracking-widest text-sm">Project Estimator</h3>
                  </div>
                  
                  <div className="bg-brand-muted p-6 border border-brand-border">
                  <div className="mb-6 h-1 w-full bg-white relative">
                    <motion.div className="absolute top-0 left-0 h-full bg-brand-accent" animate={{ width: `${(wizardStep / 4) * 100}%` }} />
                  </div>

                  <AnimatePresence mode="wait">
                    {wizardStep < 4 ? (
                      <motion.div key="step" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                         <div className="flex justify-between items-center mb-4">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-brand-primary/40">Section {wizardStep + 1} // Precision Filter</p>
                            {wizardStep > 0 && (
                              <button 
                                onClick={() => setWizardStep(prev => prev - 1)}
                                className="text-[9px] font-bold uppercase tracking-widest text-brand-accent hover:underline flex items-center gap-1"
                              >
                                <ArrowLeft size={10} /> Back
                              </button>
                            )}
                         </div>
                         <h4 className="text-sm font-black uppercase text-center mb-6 text-brand-primary h-10 flex items-center justify-center">
                            {wizardStep === 0 && "Target Surface?"}
                            {wizardStep === 1 && "Technical Requirement?"}
                            {wizardStep === 2 && "Primary Usage?"}
                            {wizardStep === 3 && "Supply Protocol?"}
                         </h4>
                         <div className="grid grid-cols-2 gap-2">
                            {(wizardStep === 0 ? ['Auto Body', 'Chassis', 'Wheels', 'Industrial', 'Custom', 'Other'] :
                              wizardStep === 1 ? ['Color Match', 'Durability', 'Gloss', 'Prep'] :
                              wizardStep === 2 ? ['Touch-up', 'Panel', 'Full Respray'] :
                              ['Local Pickup', 'Shop Delivery', 'On-Site Assist']).map(item => (
                              <button key={item} onClick={() => handleWizardChoice(['surface','need','size','support'][wizardStep], item)} className="p-3 bg-brand-muted border border-brand-border text-[9px] font-bold uppercase tracking-widest text-brand-primary hover:border-brand-accent hover:text-brand-accent transition-all">
                                {item}
                              </button>
                            ))}
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                         <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                            <CheckCircle2 size={24} />
                         </div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/40 mb-2">Estimate Ready</p>
                         <div className="text-[10px] font-bold text-brand-primary uppercase bg-white p-4 mb-6 border border-brand-border space-y-1 text-left">
                            <div className="flex justify-between border-b border-brand-muted pb-1">
                               <span className="text-brand-primary/40">Surface:</span>
                               <span>{wizardData.surface}</span>
                            </div>
                            <div className="flex justify-between border-b border-brand-muted pb-1">
                               <span className="text-brand-primary/40">Need:</span>
                               <span>{wizardData.need}</span>
                            </div>
                            <div className="flex justify-between border-b border-brand-muted pb-1">
                               <span className="text-brand-primary/40">Usage:</span>
                               <span>{wizardData.size}</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-brand-primary/40">Logistics:</span>
                               <span>{wizardData.support}</span>
                            </div>
                         </div>
                         
                         <div className="flex flex-col gap-2">
                           <button onClick={scrollToQuote} className="w-full py-4 bg-brand-accent text-white font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-md">Complete Quote Request</button>
                           <button onClick={resetWizard} className="w-full py-3 text-brand-primary/40 hover:text-brand-accent font-bold uppercase tracking-widest text-[9px] transition-colors">Start Over</button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
            </div>
          </motion.section>
          )}
        </AnimatePresence>

        {/* Re-open Wizard Toggle */}
        <AnimatePresence>
          {!isWizardVisible && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsWizardVisible(true)}
              className="fixed right-10 bottom-10 z-40 w-16 h-16 bg-brand-accent text-white flex items-center justify-center border border-brand-border hover:scale-110 transition-transform shadow-2xl"
              title="Resume Dispatcher"
            >
              <Truck size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* 6. Product Category Section */}
        <section id="products" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20 border-l-8 border-brand-accent pl-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-brand-primary mb-4 tracking-tighter">Gear Inventory</h2>
                <p className="text-brand-primary/40 font-medium">Professional grade supplies for every stage of the finish.</p>
              </div>
                  <div className="flex flex-wrap gap-3">
                {productCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-6 py-3 border-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeTab === cat 
                        ? 'bg-brand-accent border-brand-accent text-white shadow-lg scale-105' 
                        : 'bg-white border-brand-border text-brand-primary/40 hover:border-brand-accent hover:text-brand-accent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    className="bg-brand-muted p-10 border border-brand-border hover:border-brand-accent transition-all group relative overflow-hidden shadow-sm"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white -rotate-45 translate-x-8 -translate-y-8" />
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                         {product.category}
                      </div>
                      {product.isSpecialty && (
                        <span className="text-[8px] font-black bg-brand-accent text-white px-2 py-0.5 uppercase tracking-tighter">Specialty</span>
                      )}
                    </div>
                    <h3 className="text-2xl font-display font-black uppercase mb-4 text-brand-primary group-hover:text-brand-accent transition-colors">{product.name}</h3>
                    <p className="text-brand-primary/40 font-medium text-sm mb-10 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-border">
                       <span className="font-mono text-xs text-brand-industrial font-bold uppercase tracking-wider">Tier: {product.priceRange}</span>
                       <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-primary/60 group-hover:text-brand-accent transition-colors">
                          Technical Specs <ArrowRight size={14} />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 7. Photo Gallery */}
        <section id="gallery" className="py-32 bg-white px-6 border-t border-brand-border">
           <div className="max-w-7xl mx-auto">
              <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-12 border-l-8 border-brand-accent pl-8">
                 <div>
                    <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-brand-primary">Project Showcase</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mt-4">Inspiration // Craft // Results</p>
                 </div>
                 <div className="flex flex-wrap gap-2 justify-end">
                    {galleryCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveGalleryTab(cat)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          activeGalleryTab === cat
                            ? 'bg-brand-accent text-white border-brand-accent'
                            : 'bg-white text-brand-primary/40 border-brand-border hover:border-brand-accent hover:text-brand-accent'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <AnimatePresence mode="popLayout">
                    {filteredGallery.map((img) => (
                      <motion.div 
                        key={img.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`${img.span} relative group overflow-hidden border border-brand-border aspect-square shadow-sm hover:shadow-xl transition-shadow duration-500`}
                      >
                        <img 
                          src={`${img.url}&auto=format&fit=crop`} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                          alt="Paint finish result" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                           <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
                             <Search size={20} />
                           </div>
                           <span className="text-white text-[10px] font-bold uppercase tracking-widest">{img.category}</span>
                        </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>
        </section>

        {/* Expert Help / In-Store Experience */}
        <section className="py-32 graphite-base px-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-5" />
           <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-white tracking-tighter mb-8">Expert <br /><span className="text-brand-accent">Guidance.</span></h2>
                    <p className="text-xl text-white/70 mb-12 font-medium leading-relaxed">
                       Don't guess on your restoration. Our on-site experts help you choose the right materials, mix the perfect color, and follow the correct prep protocols for a professional result.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                       <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                          <h4 className="font-bold text-brand-accent uppercase tracking-widest text-[10px] mb-3">Material Audits</h4>
                          <p className="text-white/50 text-xs font-medium">Bring your parts in for a full assessment of required coatings and prep steps.</p>
                       </div>
                       <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                          <h4 className="font-bold text-brand-accent uppercase tracking-widest text-[10px] mb-3">Spectral Scanning</h4>
                          <p className="text-white/50 text-xs font-medium">Digital spectrophotometry for perfect color matching of aged or custom paints.</p>
                       </div>
                    </div>
                 </div>
                 <div className="relative">
                    <div className="aspect-video bg-black border-4 border-white/5 overflow-hidden group">
                       <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="In-store expert assistance" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                             <Wrench size={32} />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
        {/* Featured Brands / Product Types Section */}
        <section className="py-24 bg-white px-6 border-b border-brand-border">
           <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                 {/* Generic placeholders for trusted brands */}
                 <div className="text-2xl font-display font-black uppercase text-brand-primary tracking-tighter">ProCoat</div>
                 <div className="text-2xl font-display font-black uppercase text-brand-primary tracking-tighter">UltraFinish</div>
                 <div className="text-2xl font-display font-black uppercase text-brand-primary tracking-tighter">EliteCoatings</div>
                 <div className="text-2xl font-display font-black uppercase text-brand-primary tracking-tighter">RapidFinish</div>
                 <div className="text-2xl font-display font-black uppercase text-brand-primary tracking-tighter">MasterPoly</div>
              </div>
           </div>
        </section>

        {/* 8. Quote Request Form */}
        <section id="quote-request" className="py-32 px-6 bg-brand-muted border-y border-brand-border scroll-mt-20">
           <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16" ref={quoteRef}>
              <div className="bg-brand-accent p-12 md:p-16 border border-brand-border relative overflow-hidden flex flex-col justify-between shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
                 <div>
                    <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-white mb-8 border-b border-white/20 pb-8">Project <br /> Request</h2>
                    <p className="text-white/80 text-lg font-medium leading-relaxed mb-12 border-l-4 border-brand-primary pl-6">
                       Response within 12 business hours. 
                       <br />Technical estimates // Logistics support.
                    </p>
                    
                    <div className="space-y-6 text-white">
                       {[
                         "No-Obligation Material Audits",
                         "Professional Trade Discounts",
                         "Custom Color Formula Design"
                       ].map(text => (
                         <div key={text} className="flex items-center gap-4">
                            <CheckCircle2 size={18} className="text-brand-primary" />
                            <span className="font-bold uppercase tracking-widest text-[10px] text-white">{text}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-4 md:p-8">
                 <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 md:col-span-1">
                       <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-brand-primary/40">Full Name</label>
                       <input type="text" placeholder="John Doe" className="w-full bg-white border border-brand-border focus:border-brand-accent p-4 text-brand-primary outline-none transition-all font-medium" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                       <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-brand-primary/40">Contact Line</label>
                       <input type="tel" placeholder="(XXX) XXX-XXXX" className="w-full bg-white border border-brand-border focus:border-brand-accent p-4 text-brand-primary outline-none transition-all font-medium" />
                    </div>
                    <div className="col-span-2">
                       <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-brand-primary/40">Service Type</label>
                       <select 
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full bg-white border border-brand-border focus:border-brand-accent p-4 text-brand-primary outline-none transition-all font-bold uppercase cursor-pointer"
                       >
                          {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                       </select>
                    </div>
                    <div className="col-span-2">
                       <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-brand-primary/40">Project Details</label>
                       <textarea 
                        ref={detailsRef}
                        rows={6} 
                        value={formDetails}
                        onChange={(e) => setFormDetails(e.target.value)}
                        placeholder="Describe your vehicle color, part type, or paint requirement..." 
                        className="w-full bg-white border border-brand-border focus:border-brand-accent p-4 text-brand-primary outline-none transition-all font-medium resize-none shadow-sm" 
                       />
                    </div>
                    <div className="col-span-2 pt-4">
                       <button className="w-full py-5 bg-brand-primary text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-brand-accent transition-all shadow-lg active:scale-95">
                          Send Inquiry
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </section>

        {/* 10. Intelligence (FAQ) */}
        <section className="py-32 bg-white px-6 border-y border-brand-border">
           <div className="max-w-4xl mx-auto">
              <div className="mb-20 text-center">
                 <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-brand-primary mb-4">Shop Intelligence</h2>
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Common Technical Support</p>
              </div>
              <div className="space-y-4">
                 {FAQS.map((faq, idx) => (
                    <FAQItem key={idx} question={faq.question} answer={faq.answer} darkMode={false} />
                 ))}
              </div>
           </div>
        </section>

        {/* 11. Final CTA Banner */}
        <section className="py-32 bg-white px-6">
           <div className="max-w-7xl mx-auto p-12 md:p-24 bg-brand-accent flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -skew-x-12 translate-x-32" />
              <div className="relative z-10 text-center lg:text-left">
                 <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter uppercase mb-6 leading-none shadow-sm">Secure Your <br /><span className="text-black">Finish Now.</span></h2>
                 <p className="text-white/80 font-bold uppercase tracking-[0.3em] text-[10px]">Professional grade automotive solutions since 1990.</p>
              </div>
              <button 
                onClick={scrollToQuote}
                className="relative z-10 px-12 py-6 bg-white text-brand-accent font-bold text-sm uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-xl"
              >
                 Request Project Quote
              </button>
           </div>
        </section>
      </main>

      {/* 11. Footer */}
      <footer className="bg-brand-primary text-white pt-24 pb-12 px-6 border-t border-brand-accent">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-brand-accent flex items-center justify-center">
                     <Construction className="text-white" size={20} />
                  </div>
                  <span className="text-2xl font-logo font-black tracking-tighter uppercase text-white italic -skew-x-6">Dales</span>
               </div>
               <p className="text-white/40 font-medium leading-relaxed mb-8">
                  Expert automotive paint supplies and precision color matching since 1990. Supporting the Colorado Springs automotive community.
               </p>
               <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all text-white/40 hover:text-white" title="Facebook">
                     <Facebook size={18} />
                  </a>
                  <a href="https://instagram.com" target="_blank" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all text-white/40 hover:text-white" title="Instagram">
                     <Instagram size={18} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all text-white/40 hover:text-white" title="LinkedIn">
                     <Linkedin size={18} />
                  </a>
                  <a href="https://maps.google.com/?q=515+N+Circle+Dr+Colorado+Springs+CO+80909" target="_blank" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all text-white/40 hover:text-white" title="View Map">
                     <MapPin size={18} />
                  </a>
               </div>
            </div>

            <div>
               <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-brand-accent">Quick Links</h4>
               <ul className="space-y-4 font-bold uppercase tracking-[0.1em] text-[11px] text-white/40">
                  <li><a href="#services" className="hover:text-white transition-colors">Technical Units</a></li>
                  <li><a href="#products" className="hover:text-white transition-colors">Inventory Hub</a></li>
                  <li><a href="#gallery" className="hover:text-white transition-colors">Project Gallery</a></li>
                  <li><a href="#quote-request" className="hover:text-white transition-colors">Place Order</a></li>
               </ul>
            </div>

            <div id="contact-info">
               <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-brand-accent">Direct Contact</h4>
               <div className="space-y-6 text-white/40 font-bold uppercase tracking-[0.1em] text-[11px]">
                  <div className="flex items-start gap-4">
                     <MapPin size={18} className="text-brand-accent" />
                     <span>515 N Circle Dr<br />Colorado Springs, CO 80909</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Phone size={18} className="text-brand-accent" />
                     <span>(719) 636-2635</span>
                  </div>
               </div>
            </div>

            <div>
               <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-brand-accent">Shop Hours</h4>
               <div className="space-y-4 text-white/40 font-bold uppercase tracking-[0.1em] text-[11px]">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                     <span>Mon-Fri</span>
                     <span className="text-white">08:00 - 17:30</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2 text-brand-accent">
                     <span>Sat-Sun</span>
                     <span>CLOSED</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">&copy; 2026 Dales Auto Paint // Colorado Springs</span>
            <div className="flex gap-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
               <a href="#" className="hover:text-white">Privacy</a>
               <a href="#" className="hover:text-white">Terms</a>
               <a href="#" className="hover:text-white">TDS Search</a>
            </div>
         </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-brand-primary border-t border-brand-accent grid grid-cols-2 z-50">
        <a href="tel:+17196362635" className="flex items-center justify-center gap-3 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:bg-white/5 transition-colors">
          <Phone size={14} /> Call Shop
        </a>
        <a href="https://maps.google.com/?q=515+N+Circle+Dr+Colorado+Springs+CO+80909" target="_blank" className="flex items-center justify-center gap-3 py-5 text-[10px] font-bold uppercase tracking-widest text-white bg-brand-accent hover:brightness-110 transition-colors">
          <MapPin size={14} /> Directions
        </a>
      </div>
    </div>
  );
}

interface FAQProps {
  key?: number | string;
  question: string;
  answer: string;
  darkMode?: boolean;
}

function FAQItem({ question, answer, darkMode }: FAQProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`border transition-all ${
      darkMode 
        ? 'bg-[#111827] border-white/10 hover:border-brand-accent shadow-2xl' 
        : 'bg-white border-brand-border hover:border-brand-accent shadow-sm'
    }`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 text-left flex justify-between items-center group"
      >
        <span className={`text-lg md:text-xl font-bold uppercase tracking-tight leading-tight transition-colors ${
          darkMode ? 'text-white' : 'text-brand-primary'
        } group-hover:text-brand-accent`}>{question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
           isOpen 
            ? 'bg-brand-accent border-brand-accent text-white rotate-180' 
            : darkMode ? 'bg-black border-white/10 text-white/40' : 'bg-brand-muted border-brand-border text-brand-primary/40'
        }`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className={`p-8 pt-0 font-medium leading-relaxed border-t ${
              darkMode ? 'text-white/40 border-white/5' : 'text-brand-primary/60 border-brand-border'
            }`}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
