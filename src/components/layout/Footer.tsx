import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Sparkle, Squiggle } from "@/components/brand/Doodles";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const columns = [
  {
    title: "Descubre",
    links: [
      { to: "/", label: "Buscar un antojo" },
      { to: "/como-funciona", label: "Cómo funciona" },
      { to: "/mis-antojos", label: "Mis antojos" },
      { to: "/como-funciona", label: "Nuestro método" },
    ],
  },
  {
    title: "Como la Original",
    links: [
      { to: "/sobre-nosotros", label: "Quiénes somos" },
      { to: "/contacto", label: "Contacto" },
      { to: "/contacto", label: "Sugerir un producto" },
    ],
  },
  {
    title: "Información",
    links: [
      { to: "/aviso-legal", label: "Aviso legal" },
      { to: "/privacidad", label: "Política de privacidad" },
      { to: "/cookies", label: "Política de cookies" },
      { to: "/terminos", label: "Condiciones de uso" },
      { to: "/aviso-legal", label: "Uso de IA" },
      { to: "/aviso-legal", label: "Transparencia / afiliación" },
    ],
  },
] as const;

const legalLinks = [
  { to: "/privacidad", label: "Privacidad" },
  { to: "/cookies", label: "Cookies" },
  { to: "/aviso-legal", label: "Aviso legal" },
] as const;

function FooterLinks({ links }: { links: (typeof columns)[number]["links"] }) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.to}
            className="inline-flex py-0.5 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SocialIcons() {
  return (
    <div aria-label="Redes sociales" className="flex items-center justify-center gap-2 lg:justify-start">
      {[Instagram, Facebook, Youtube].map((Icon, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-full border border-border/80 text-muted-foreground"
        >
          <Icon className="size-4" strokeWidth={1.8} />
        </span>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border/60 bg-cream">
      <div aria-hidden="true" className="absolute -left-12 top-28 h-24 w-28 rotate-12 rounded-[55%_45%_62%_38%] bg-beige/55" />
      <div aria-hidden="true" className="absolute right-[7%] top-12 hidden text-primary/35 lg:block">
        <Sparkle className="size-7" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pb-8 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(280px,0.9fr)_minmax(560px,1.5fr)] lg:gap-20 xl:gap-28">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Logo />
            <p className="mt-6 font-display text-2xl font-extrabold sm:text-[1.7rem]">
              Tu antojo, comparado.
            </p>
            <p className="mt-3 max-w-sm text-[15px] leading-6 text-muted-foreground">
              Encuentra alternativas que se parecen a lo que buscas y descubre por qué.
            </p>
            <Button asChild className="mt-7 h-11 rounded-full px-5 font-bold shadow-none">
              <Link to="/">
                Buscar un antojo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Squiggle aria-hidden="true" className="mt-7 h-3.5 w-24 text-primary/55" />
          </div>

          <div className="hidden grid-cols-3 gap-8 lg:grid">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-foreground">
                  {col.title}
                </h2>
                <FooterLinks links={col.links} />
              </nav>
            ))}
          </div>

          <Accordion type="single" collapsible className="w-full border-t border-border/70 lg:hidden">
            {columns.map((col) => (
              <AccordionItem key={col.title} value={col.title} className="border-border/70">
                <AccordionTrigger className="py-5 text-xs font-extrabold uppercase tracking-[0.12em] hover:no-underline">
                  {col.title}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <FooterLinks links={col.links} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-14 border-t border-border/70 pt-7 lg:mt-16">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <SocialIcons />
            <nav aria-label="Enlaces legales del pie">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground lg:text-left">
            © 2026 Como la Original. Todos los derechos reservados. Como la Original no vende productos: comparamos alternativas y te enviamos a la tienda.
          </p>
        </div>
      </div>
    </footer>
  );
}
