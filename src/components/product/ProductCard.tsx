import { Link } from "@tanstack/react-router";
import { ArrowRight, Medal, Star, Trophy } from "lucide-react";
import { AppIcon, type AppIconName } from "@/components/common/AppIcon";
import { DemoImageFrame } from "@/components/common/DemoImageFrame";
import { FavoriteButton } from "@/components/common/FavoriteButton";
import { ScoreBreakdown } from "@/components/common/ScoreBreakdown";
import { SimilarityScore } from "@/components/common/SimilarityScore";
import { getCategory } from "@/services/productService";
import type { AlternativeProduct } from "@/types";

interface Props {
  product: AlternativeProduct;
  rank: number;
  icon: AppIconName;
  index?: number;
}

export function ProductCard({ product, rank, icon, index = 0 }: Props) {
  const category = getCategory(product.categoryId);
  const isTop = rank === 1;

  return (
    <article
      className="animate-rise overflow-hidden rounded-4xl border-2 border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {isTop ? (
        <p className="bg-primary px-5 py-2 text-center font-display text-xs font-extrabold uppercase tracking-wide text-primary-foreground">
          <Star aria-hidden="true" className="mr-1 inline size-4 fill-current" /> La alternativa más parecida al original
        </p>
      ) : null}

      <div className="grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
        <div className="flex gap-3 sm:w-44 sm:flex-col">
          <DemoImageFrame image={product.packageImage} icon={icon} className="flex-1" />
          <DemoImageFrame
            image={product.openProductImage}
            icon="utensils"
            tone="blush"
            className="flex-1"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-full bg-cream text-base"
                >
                   {rank <= 3 ? <Medal aria-hidden="true" className="size-4" /> : rank}
                </span>
                <span className="sr-only">{`Puesto ${rank}. `}</span>
                {product.brand}
              </p>
              <h3 className="mt-1 text-2xl">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category ? <span className="inline-flex items-center gap-1.5"><AppIcon aria-hidden="true" name={category.icon} className="size-4" />{category.name}</span> : "Producto"}
              </p>
            </div>
            <div className="text-center">
              <SimilarityScore value={product.overallSimilarity} size="sm" />
              <p className="mt-1 font-display text-[11px] font-extrabold uppercase tracking-wide">
                 <Trophy aria-hidden="true" className="mr-1 inline size-3.5" /> parecido
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm">{product.description}</p>

          <div className="mt-4">
            <ScoreBreakdown
              scores={[
                { icon: "taste", label: "Sabor", value: product.tasteScore },
                { icon: "texture", label: "Textura", value: product.textureScore },
                { icon: "cookie", label: "Parecido al original", value: product.similarityScore },
                { icon: "milk", label: "Crema / relleno", value: product.fillingScore },
              ]}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/producto/$slug"
              params={{ slug: product.slug }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-bold text-background transition-transform hover:scale-[1.02]"
            >
              Ver ficha completa
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <FavoriteButton
              alternativeId={product.id}
              originalId={product.originalProductId}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
